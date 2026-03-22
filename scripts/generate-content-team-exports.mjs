import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import scheduleEvents from "../schedule_events.json" with { type: "json" };
import peopleData from "../src/data/people.json" with { type: "json" };
import {
  getMainTalks,
  isBreakLikeEvent,
} from "../src/component/dynamicSchedule/eventContent.js";
import { buildScheduleByTime } from "../src/component/dynamicSchedule/scheduleByTime.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDirectory = path.resolve(__dirname, "../content-team");
const scheduleOutputPath = path.join(outputDirectory, "raw-schedule-grid.pdf");
const legacyScheduleHtmlOutputPath = path.join(
  outputDirectory,
  "raw-schedule-grid.html",
);
const speakersOutputPath = path.join(outputDirectory, "raw-speakers-list.txt");

const PAGE = {
  width: 841.89,
  height: 595.28,
  marginX: 24,
  marginTop: 24,
  marginBottom: 24,
};

const TABLE = {
  headerHeight: 32,
  timeWidth: 76,
  minRowHeight: 46,
  cellPaddingX: 10,
  cellPaddingY: 8,
};

const PDF_COLORS = {
  white: rgbFromHex("#ffffff"),
  text: rgbFromHex("#0f172a"),
  muted: rgbFromHex("#475569"),
  border: rgbFromHex("#cbd5e1"),
  headerBackground: rgbFromHex("#e2e8f0"),
  timeBackground: rgbFromHex("#f8fafc"),
  breakBackground: rgbFromHex("#fef3c7"),
};

const peopleById = new Map(Object.entries(peopleData));

function rgbFromHex(hex) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return [
    ((value >> 16) & 0xff) / 255,
    ((value >> 8) & 0xff) / 255,
    (value & 0xff) / 255,
  ];
}

function normalizeText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function sanitizePdfText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .replace(/[–—]/g, "-")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, "...")
    .replace(/•/g, "-")
    .replace(/\u00a0/g, " ")
    .replace(/[^\x09\x0a\x0d\x20-\xff]/g, "")
    .trim();
}

function escapePdfText(value) {
  return sanitizePdfText(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function formatRoomDisplayName(roomName) {
  return String(roomName)
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getRankingScore(person) {
  return (
    (person.image ? 4 : 0) +
    (person.job_title ? 2 : 0) +
    (person.institution ? 1 : 0)
  );
}

function compareSubmittedAt(leftSubmittedAt, rightSubmittedAt) {
  if (!leftSubmittedAt && !rightSubmittedAt) return 0;
  if (!leftSubmittedAt) return 1;
  if (!rightSubmittedAt) return -1;

  const leftTime = Date.parse(leftSubmittedAt);
  const rightTime = Date.parse(rightSubmittedAt);

  if (Number.isNaN(leftTime) && Number.isNaN(rightTime)) return 0;
  if (Number.isNaN(leftTime)) return 1;
  if (Number.isNaN(rightTime)) return -1;

  return leftTime - rightTime;
}

function getSortedPeople() {
  return Object.entries(peopleData)
    .map(([id, person]) => ({
      id,
      ...person,
      ranking_score: getRankingScore(person),
    }))
    .sort((leftPerson, rightPerson) => {
      if (rightPerson.ranking_score !== leftPerson.ranking_score) {
        return rightPerson.ranking_score - leftPerson.ranking_score;
      }

      const submittedAtComparison = compareSubmittedAt(
        leftPerson.submitted_at,
        rightPerson.submitted_at,
      );
      if (submittedAtComparison !== 0) return submittedAtComparison;

      return leftPerson.name.localeCompare(rightPerson.name, "es");
    });
}

function resolvePersonReference(reference) {
  if (!reference) return null;

  if (reference.person_id) {
    return normalizeText(
      peopleById.get(reference.person_id)?.name ?? reference.person_id,
    );
  }

  if (reference.label) return normalizeText(reference.label);
  if (typeof reference === "string") return normalizeText(reference);
  if ("speaker_name" in reference) return normalizeText(reference.speaker_name);
  if ("name" in reference) return normalizeText(reference.name);

  return null;
}

function resolveReferenceList(references) {
  return references.map(resolvePersonReference).filter(Boolean);
}

function getLightningTalkSpeakerReferences(lightningTalk) {
  if (Array.isArray(lightningTalk?.speakers) && lightningTalk.speakers.length > 0) {
    return resolveReferenceList(lightningTalk.speakers);
  }

  if (
    lightningTalk?.person_id ||
    lightningTalk?.label ||
    lightningTalk?.speaker_name ||
    lightningTalk?.name
  ) {
    return resolveReferenceList([lightningTalk]);
  }

  return [];
}

function estimateTextWidth(text, size) {
  return Array.from(sanitizePdfText(text)).reduce((total, character) => {
    if ("ilI1.,:;|!'".includes(character)) return total + size * 0.28;
    if ("MW@%&Q".includes(character)) return total + size * 0.88;
    if (character === " ") return total + size * 0.3;
    if ("-_/()[]{}".includes(character)) return total + size * 0.34;
    if (/[A-ZÁÉÍÓÚÑÜ]/.test(character)) return total + size * 0.62;
    return total + size * 0.5;
  }, 0);
}

function breakLongWord(word, maxWidth, size) {
  const pieces = [];
  let current = "";

  for (const character of Array.from(word)) {
    const candidate = current + character;
    if (current && estimateTextWidth(candidate, size) > maxWidth) {
      pieces.push(current);
      current = character;
      continue;
    }

    current = candidate;
  }

  if (current) pieces.push(current);

  return pieces;
}

function wrapText(text, maxWidth, size) {
  const normalized = sanitizePdfText(text);
  if (!normalized) return [];

  const paragraphs = normalized.split(/\n+/);
  const lines = [];

  paragraphs.forEach((paragraph, paragraphIndex) => {
    const words = paragraph.split(/\s+/).filter(Boolean);
    let currentLine = "";

    words.forEach((word) => {
      const fragments =
        estimateTextWidth(word, size) <= maxWidth
          ? [word]
          : breakLongWord(word, maxWidth, size);

      fragments.forEach((fragment) => {
        const candidate = currentLine ? `${currentLine} ${fragment}` : fragment;

        if (currentLine && estimateTextWidth(candidate, size) > maxWidth) {
          lines.push(currentLine);
          currentLine = fragment;
          return;
        }

        currentLine = candidate;
      });
    });

    if (currentLine) lines.push(currentLine);
    if (!currentLine && paragraphIndex !== paragraphs.length - 1) {
      lines.push("");
    }
  });

  return lines;
}

function lineHeight(size) {
  return Number((size * 1.3).toFixed(2));
}

function buildWrappedLines({
  text,
  size,
  font,
  color,
  gapBefore = 0,
  maxWidth,
}) {
  const lines = wrapText(text, maxWidth, size);
  if (lines.length === 0) return [];

  return lines.map((line, index) => ({
    text: line,
    size,
    font,
    color,
    gapBefore: index === 0 ? gapBefore : 0,
  }));
}

function buildCellLayout(event, width, merged = false) {
  const contentWidth = width - TABLE.cellPaddingX * 2;

  if (!event) {
    return {
      height: TABLE.minRowHeight,
      isBreak: false,
      lines: [],
    };
  }

  const lines = [];

  if (isBreakLikeEvent(event)) {
    lines.push(
      ...buildWrappedLines({
        text: event.activity,
        size: merged ? 10.8 : 9.6,
        font: "F2",
        color: PDF_COLORS.text,
        maxWidth: contentWidth,
      }),
    );
  } else {
    const mainTalks = getMainTalks(event);

    lines.push(
      ...buildWrappedLines({
        text: event.activity,
        size: 8.8,
        font: "F2",
        color: PDF_COLORS.text,
        maxWidth: contentWidth,
      }),
    );

    mainTalks.forEach((mainTalk, mainTalkIndex) => {
      const initialSectionGap = mainTalkIndex === 0 ? 4 : 6;
      let hasRenderedSection = false;

      function pushSection(sectionLinesBuilder) {
        const sectionGap = hasRenderedSection ? 4 : initialSectionGap;
        const sectionLines = sectionLinesBuilder(sectionGap);
        if (sectionLines.length === 0) return;

        lines.push(...sectionLines);
        hasRenderedSection = true;
      }

      pushSection((gapBefore) =>
        mainTalk.title
          ? buildWrappedLines({
              text: mainTalk.title,
              size: 8.1,
              font: "F1",
              color: PDF_COLORS.text,
              maxWidth: contentWidth,
              gapBefore,
            })
          : [],
      );

      const speakers = resolveReferenceList(mainTalk.speakers);
      pushSection((gapBefore) => {
        if (speakers.length === 0) return [];

        return [
          ...buildWrappedLines({
            text: "Disertantes",
            size: 7.2,
            font: "F2",
            color: PDF_COLORS.muted,
            maxWidth: contentWidth,
            gapBefore,
          }),
          ...speakers.flatMap((speaker, speakerIndex) =>
            buildWrappedLines({
              text: `- ${speaker}`,
              size: 7,
              font: "F1",
              color: PDF_COLORS.text,
              maxWidth: contentWidth,
              gapBefore: speakerIndex === 0 ? 2 : 1,
            }),
          ),
        ];
      });

      const lightningTalks = Array.isArray(mainTalk.lightning_talks)
        ? mainTalk.lightning_talks
        : [];
      pushSection((gapBefore) => {
        if (lightningTalks.length === 0) return [];

        return [
          ...buildWrappedLines({
            text: "Presentaciones",
            size: 7.2,
            font: "F2",
            color: PDF_COLORS.muted,
            maxWidth: contentWidth,
            gapBefore,
          }),
          ...lightningTalks.flatMap((lightningTalk, index) => {
            const speakerReferences =
              getLightningTalkSpeakerReferences(lightningTalk);
            const speakerSuffix =
              speakerReferences.length > 0
                ? ` - ${speakerReferences.join(", ")}`
                : "";

            return buildWrappedLines({
              text: `- ${lightningTalk.title}${speakerSuffix}`,
              size: 7,
              font: "F1",
              color: PDF_COLORS.text,
              maxWidth: contentWidth,
              gapBefore: index === 0 ? 2 : 1,
            });
          }),
        ];
      });

      const moderators = resolveReferenceList(
        Array.isArray(mainTalk.moderators) ? mainTalk.moderators : [],
      );
      pushSection((gapBefore) => {
        if (moderators.length === 0) return [];

        return [
          ...buildWrappedLines({
            text: "Moderadores",
            size: 7.2,
            font: "F2",
            color: PDF_COLORS.muted,
            maxWidth: contentWidth,
            gapBefore,
          }),
          ...moderators.flatMap((moderator, index) =>
            buildWrappedLines({
              text: `- ${moderator}`,
              size: 7,
              font: "F1",
              color: PDF_COLORS.text,
              maxWidth: contentWidth,
              gapBefore: index === 0 ? 2 : 1,
            }),
          ),
        ];
      });

      const commentators = resolveReferenceList(
        Array.isArray(mainTalk.commentators) ? mainTalk.commentators : [],
      );
      pushSection((gapBefore) => {
        if (commentators.length === 0) return [];

        return [
          ...buildWrappedLines({
            text: "Comentadores",
            size: 7.2,
            font: "F2",
            color: PDF_COLORS.muted,
            maxWidth: contentWidth,
            gapBefore,
          }),
          ...commentators.flatMap((commentator, index) =>
            buildWrappedLines({
              text: `- ${commentator}`,
              size: 7,
              font: "F1",
              color: PDF_COLORS.text,
              maxWidth: contentWidth,
              gapBefore: index === 0 ? 2 : 1,
            }),
          ),
        ];
      });

      pushSection((gapBefore) => {
        const secretaries = resolveReferenceList(
          Array.isArray(mainTalk.secretaries) ? mainTalk.secretaries : [],
        );
        if (secretaries.length === 0) return [];

        return [
          ...buildWrappedLines({
            text: "Secretarios",
            size: 7.2,
            font: "F2",
            color: PDF_COLORS.muted,
            maxWidth: contentWidth,
            gapBefore,
          }),
          ...secretaries.flatMap((secretary, index) =>
            buildWrappedLines({
              text: `- ${secretary}`,
              size: 7,
              font: "F1",
              color: PDF_COLORS.text,
              maxWidth: contentWidth,
              gapBefore: index === 0 ? 2 : 1,
            }),
          ),
        ];
      });
    });
  }

  const contentHeight = lines.reduce(
    (total, line) => total + line.gapBefore + lineHeight(line.size),
    0,
  );

  return {
    height: Math.max(TABLE.minRowHeight, TABLE.cellPaddingY * 2 + contentHeight),
    isBreak: isBreakLikeEvent(event),
    lines,
  };
}

function formatPdfNumber(value) {
  return value.toFixed(2).replace(/\.00$/, "");
}

function colorCommand(color, mode) {
  return `${color.map(formatPdfNumber).join(" ")} ${mode}\n`;
}

function toPdfTop(top, height) {
  return PAGE.height - top - height;
}

function pushFilledRect(commands, x, top, width, height, color) {
  commands.push(colorCommand(color, "rg"));
  commands.push(
    `${formatPdfNumber(x)} ${formatPdfNumber(toPdfTop(top, height))} ${formatPdfNumber(width)} ${formatPdfNumber(height)} re f\n`,
  );
}

function pushStrokedRect(commands, x, top, width, height, color, lineWidth = 1) {
  commands.push(`${formatPdfNumber(lineWidth)} w\n`);
  commands.push(colorCommand(color, "RG"));
  commands.push(
    `${formatPdfNumber(x)} ${formatPdfNumber(toPdfTop(top, height))} ${formatPdfNumber(width)} ${formatPdfNumber(height)} re S\n`,
  );
}

function pushText(commands, text, x, top, options = {}) {
  const { size = 10, font = "F1", color = PDF_COLORS.text } = options;
  const escaped = escapePdfText(text);
  if (!escaped) return;

  commands.push(colorCommand(color, "rg"));
  commands.push(
    `BT /${font} ${formatPdfNumber(size)} Tf 1 0 0 1 ${formatPdfNumber(x)} ${formatPdfNumber(PAGE.height - top - size)} Tm (${escaped}) Tj ET\n`,
  );
}

function drawHeaderCell(commands, text, x, top, width, height) {
  pushFilledRect(commands, x, top, width, height, PDF_COLORS.headerBackground);
  pushStrokedRect(commands, x, top, width, height, PDF_COLORS.border, 0.8);
  pushText(commands, text, x + 10, top + 10, {
    size: 9,
    font: "F2",
    color: PDF_COLORS.text,
  });
}

function drawTimeCell(commands, x, top, width, height, startTime, endTime) {
  pushFilledRect(commands, x, top, width, height, PDF_COLORS.timeBackground);
  pushStrokedRect(commands, x, top, width, height, PDF_COLORS.border, 0.8);

  pushText(commands, startTime, x + 10, top + 10, {
    size: 9,
    font: "F2",
    color: PDF_COLORS.text,
  });

  if (endTime) {
    pushText(commands, endTime, x + 10, top + 24, {
      size: 7.2,
      font: "F1",
      color: PDF_COLORS.muted,
    });
  }
}

function drawEventCell(commands, x, top, width, height, layout) {
  const background = layout.isBreak ? PDF_COLORS.breakBackground : PDF_COLORS.white;
  pushFilledRect(commands, x, top, width, height, background);
  pushStrokedRect(commands, x, top, width, height, PDF_COLORS.border, 0.8);

  if (layout.lines.length === 0) return;

  const totalHeight = layout.lines.reduce(
    (total, line) => total + line.gapBefore + lineHeight(line.size),
    0,
  );

  let cursorTop = layout.isBreak
    ? top + Math.max(TABLE.cellPaddingY, (height - totalHeight) / 2)
    : top + TABLE.cellPaddingY;

  layout.lines.forEach((line) => {
    cursorTop += line.gapBefore;
    pushText(commands, line.text, x + TABLE.cellPaddingX, cursorTop, {
      size: line.size,
      font: line.font,
      color: line.color,
    });
    cursorTop += lineHeight(line.size);
  });
}

function startSchedulePage(dayLabel, roomNames, pageIndex) {
  const commands = [];
  const contentWidth = PAGE.width - PAGE.marginX * 2;
  const roomWidth = (contentWidth - TABLE.timeWidth) / roomNames.length;
  const dayTitle =
    pageIndex === 0
      ? sanitizePdfText(dayLabel)
      : `${sanitizePdfText(dayLabel)} (continuacion)`;

  pushFilledRect(commands, 0, 0, PAGE.width, PAGE.height, PDF_COLORS.white);

  pushText(commands, dayTitle, PAGE.marginX, PAGE.marginTop, {
    size: 12,
    font: "F2",
    color: PDF_COLORS.text,
  });

  const headerTop = PAGE.marginTop + 28;
  drawHeaderCell(
    commands,
    "Hora",
    PAGE.marginX,
    headerTop,
    TABLE.timeWidth,
    TABLE.headerHeight,
  );

  roomNames.forEach((roomName, index) => {
    drawHeaderCell(
      commands,
      formatRoomDisplayName(roomName),
      PAGE.marginX + TABLE.timeWidth + index * roomWidth,
      headerTop,
      roomWidth,
      TABLE.headerHeight,
    );
  });

  return {
    commands,
    roomWidth,
    cursorTop: headerTop + TABLE.headerHeight,
    bottomLimit: PAGE.height - PAGE.marginBottom,
  };
}

function addPageFooter(page, pageNumber, pageCount) {
  const label = `Pagina ${pageNumber} de ${pageCount}`;
  const labelWidth = estimateTextWidth(label, 7);
  pushText(
    page.commands,
    label,
    PAGE.width - PAGE.marginX - labelWidth,
    PAGE.height - PAGE.marginBottom + 6,
    {
      size: 7,
      font: "F1",
      color: PDF_COLORS.muted,
    },
  );
}

function buildSchedulePages() {
  const pages = [];

  scheduleEvents.forEach((dayEntry) => {
    const { roomNames, timeRows } = buildScheduleByTime(dayEntry);
    let pageIndex = 0;
    let page = startSchedulePage(dayEntry.day, roomNames, pageIndex);

    timeRows.forEach((timeRow) => {
      const cellLayouts = timeRow.isMergedBreak
        ? [
            buildCellLayout(
              roomNames
                .map((roomName) => timeRow.roomEventsByRoom[roomName])
                .find(Boolean),
              page.roomWidth * roomNames.length,
              true,
            ),
          ]
        : roomNames.map((roomName) =>
            buildCellLayout(timeRow.roomEventsByRoom[roomName], page.roomWidth),
          );

      const rowHeight = Math.max(
        TABLE.minRowHeight,
        ...cellLayouts.map((layout) => layout.height),
      );

      if (page.cursorTop + rowHeight > page.bottomLimit) {
        pages.push(page);
        pageIndex += 1;
        page = startSchedulePage(dayEntry.day, roomNames, pageIndex);
      }

      drawTimeCell(
        page.commands,
        PAGE.marginX,
        page.cursorTop,
        TABLE.timeWidth,
        rowHeight,
        timeRow.start_time,
        timeRow.end_time,
      );

      const scheduleX = PAGE.marginX + TABLE.timeWidth;

      if (timeRow.isMergedBreak) {
        drawEventCell(
          page.commands,
          scheduleX,
          page.cursorTop,
          page.roomWidth * roomNames.length,
          rowHeight,
          cellLayouts[0],
        );
      } else {
        cellLayouts.forEach((layout, index) => {
          drawEventCell(
            page.commands,
            scheduleX + index * page.roomWidth,
            page.cursorTop,
            page.roomWidth,
            rowHeight,
            layout,
          );
        });
      }

      page.cursorTop += rowHeight;
    });

    pages.push(page);
  });

  pages.forEach((page, index) => addPageFooter(page, index + 1, pages.length));

  return pages;
}

function buildPdfDocument(pages) {
  const objects = [null];

  function addObject(content) {
    objects.push(
      Buffer.isBuffer(content) ? content : Buffer.from(content, "latin1"),
    );
    return objects.length - 1;
  }

  const fontRegularId = addObject(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  );
  const fontBoldId = addObject(
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  );
  const pagesRootId = addObject("");

  const contentIds = pages.map((page) => {
    const stream = Buffer.from(page.commands.join(""), "latin1");
    return addObject(
      Buffer.concat([
        Buffer.from(`<< /Length ${stream.length} >>\nstream\n`, "latin1"),
        stream,
        Buffer.from("\nendstream", "latin1"),
      ]),
    );
  });

  const pageIds = pages.map((page, index) =>
    addObject(
      `<< /Type /Page /Parent ${pagesRootId} 0 R /MediaBox [0 0 ${formatPdfNumber(PAGE.width)} ${formatPdfNumber(PAGE.height)}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentIds[index]} 0 R >>`,
    ),
  );

  objects[pagesRootId] = Buffer.from(
    `<< /Type /Pages /Kids [${pageIds.map((pageId) => `${pageId} 0 R`).join(" ")}] /Count ${pageIds.length} >>`,
    "latin1",
  );

  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesRootId} 0 R >>`);

  const chunks = [Buffer.from("%PDF-1.4\n%\xE2\xE3\xCF\xD3\n", "binary")];
  const offsets = [0];
  let currentOffset = chunks[0].length;

  for (let index = 1; index < objects.length; index += 1) {
    offsets[index] = currentOffset;

    const prefix = Buffer.from(`${index} 0 obj\n`, "latin1");
    const suffix = Buffer.from("\nendobj\n", "latin1");
    const objectBuffer = Buffer.concat([prefix, objects[index], suffix]);
    chunks.push(objectBuffer);
    currentOffset += objectBuffer.length;
  }

  const xrefOffset = currentOffset;
  const xrefLines = [`xref\n0 ${objects.length}\n`, "0000000000 65535 f \n"];

  for (let index = 1; index < objects.length; index += 1) {
    xrefLines.push(`${String(offsets[index]).padStart(10, "0")} 00000 n \n`);
  }

  chunks.push(Buffer.from(xrefLines.join(""), "latin1"));
  chunks.push(
    Buffer.from(
      `trailer\n<< /Size ${objects.length} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`,
      "latin1",
    ),
  );

  return Buffer.concat(chunks);
}

function renderSpeakersList() {
  return `${getSortedPeople()
    .map((person) =>
      [person.name, person.job_title, person.institution]
        .map(normalizeText)
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n")}\n`;
}

async function main() {
  const pages = buildSchedulePages();
  const pdfDocument = buildPdfDocument(pages);

  await fs.mkdir(outputDirectory, { recursive: true });
  await fs.writeFile(scheduleOutputPath, pdfDocument);
  await fs.writeFile(speakersOutputPath, renderSpeakersList(), "utf8");
  await fs.rm(legacyScheduleHtmlOutputPath, { force: true });

  console.log(`Generated ${scheduleOutputPath}`);
  console.log(`Generated ${speakersOutputPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
