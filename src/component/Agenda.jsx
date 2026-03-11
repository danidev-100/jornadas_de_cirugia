import { useEffect, useMemo, useRef, useState } from "react";
import { programaJueves, programaViernes } from "../data/programa";
import pdf from "../assets/PROGRAMA-ACM.pdf";
import DynamicSchedule from "./dynamicSchedule/DynamicSchedule";

const SHOW_SCHEDULE_V1 = import.meta.env.DEV;

function getSlotVariant(text = "") {
  const normalized = String(text).toLowerCase();

  if (normalized.includes("coffee")) return "break";
  if (normalized.includes("almuerzo")) return "meal";
  if (normalized.includes("acto inaugural")) return "plenary";

  return "session";
}

function AgendaCard({ hora, contenido, compact = false, highlight = false }) {
  const variant = getSlotVariant(contenido);

  const variantClasses =
    variant === "break"
      ? "bg-gold/70 text-ink"
      : variant === "meal"
        ? "bg-gold text-ink"
        : variant === "plenary"
          ? "bg-deep-blue text-white"
          : "bg-wave text-ink";

  const paddingClasses = compact ? "px-2 py-2" : "px-3 py-2";
  const timeTextClasses = compact ? "text-[10px]" : "text-xs";
  const contentTextClasses = compact ? "text-[11px]" : "text-sm";
  const highlightClasses = highlight ? "animate-pulse" : "";

  return (
    <div
      className={`min-w-0 h-full rounded-xl ${paddingClasses} ${variantClasses} ${highlightClasses} flex flex-col gap-1`}
    >
      <div
        className={`${timeTextClasses} font-semibold opacity-90 whitespace-nowrap`}
      >
        {hora}
      </div>
      <div
        className={`${contentTextClasses} flex-1 font-semibold leading-snug break-words`}
      >
        {contenido}
      </div>
    </div>
  );
}

function toLocalISODateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseHHMMToMinutes(value) {
  const match = String(value)
    .trim()
    .match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
}

function parseHoraRange(hora) {
  const normalized = String(hora).replace(/–/g, "-").replace(/\s/g, "");
  const [start, end] = normalized.split("-");
  const startMin = parseHHMMToMinutes(start);
  const endMin = parseHHMMToMinutes(end);
  if (startMin == null || endMin == null) return null;
  return { startMin, endMin };
}

function getDemoTimeMinutes() {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);
  const demoTime = params.get("demoTime");
  if (!demoTime) return null;
  return parseHHMMToMinutes(demoTime);
}

function AgendaTable({ titulo, fecha, filas, alwaysShowNowLine }) {
  const [nowLineTop, setNowLineTop] = useState(null);
  const [activeRowIndex, setActiveRowIndex] = useState(null);
  const rowRefs = useRef([]);
  const desktopWrapperRef = useRef(null);

  const shouldShowNowLine = useMemo(() => {
    if (alwaysShowNowLine) return true;
    if (!fecha) return false;
    const today = toLocalISODateString(new Date());
    return today === fecha;
  }, [alwaysShowNowLine, fecha]);

  useEffect(() => {
    if (!shouldShowNowLine) {
      setNowLineTop(null);
      setActiveRowIndex(null);
      return;
    }

    const compute = () => {
      const wrapper = desktopWrapperRef.current;
      if (!wrapper) return;

      const demoMinutes = getDemoTimeMinutes();
      const now = new Date();
      const nowMinutes =
        demoMinutes != null
          ? demoMinutes
          : now.getHours() * 60 + now.getMinutes();

      let activeIndex = -1;
      let proportion = 0;

      let firstValid = null;
      let lastValid = null;

      for (let i = 0; i < filas.length; i += 1) {
        const range = parseHoraRange(filas[i]?.hora);
        if (!range) continue;

        if (!firstValid) firstValid = { index: i, ...range };
        lastValid = { index: i, ...range };

        if (nowMinutes >= range.startMin && nowMinutes <= range.endMin) {
          activeIndex = i;
          const duration = Math.max(1, range.endMin - range.startMin);
          proportion = (nowMinutes - range.startMin) / duration;
          break;
        }
      }

      setActiveRowIndex(activeIndex !== -1 ? activeIndex : null);

      const wrapperRect = wrapper.getBoundingClientRect();

      if (activeIndex !== -1) {
        const rowEl = rowRefs.current[activeIndex];
        if (!rowEl) {
          setNowLineTop(null);
          return;
        }

        const rowRect = rowEl.getBoundingClientRect();
        const rowHeight = rowRect.height;
        const topWithinWrapper =
          rowRect.top - wrapperRect.top + rowHeight * proportion;

        setNowLineTop(topWithinWrapper);
        return;
      }

      // Fuera de horario: ancla al inicio o al final del cronograma
      if (!firstValid || !lastValid) {
        setNowLineTop(null);
        return;
      }

      if (nowMinutes < firstValid.startMin) {
        const firstRow = rowRefs.current[firstValid.index];
        if (!firstRow) {
          setNowLineTop(null);
          return;
        }
        const firstRect = firstRow.getBoundingClientRect();
        setNowLineTop(firstRect.top - wrapperRect.top);
        return;
      }

      if (nowMinutes > lastValid.endMin) {
        const lastRow = rowRefs.current[lastValid.index];
        if (!lastRow) {
          setNowLineTop(null);
          return;
        }
        const lastRect = lastRow.getBoundingClientRect();
        setNowLineTop(lastRect.bottom - wrapperRect.top);
        return;
      }

      setNowLineTop(null);
    };

    compute();
    const intervalId = window.setInterval(compute, 60_000);
    window.addEventListener("resize", compute);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener("resize", compute);
    };
  }, [filas, shouldShowNowLine]);

  return (
    <article className="flex flex-col gap-3">
      <div className="rounded-4xl border-2 border-wave p-4">
        <h3 className="text-2xl font-semibold text-ink">{titulo}</h3>
      </div>

      {/* Mobile: 3 columnas (Sala A/B/C) en la misma fila */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="grid grid-cols-3 gap-2 px-1">
          <div className="min-w-0 text-[10px] leading-tight font-semibold text-deep-blue break-words">
            Sala A
          </div>
          <div className="min-w-0 text-[10px] leading-tight font-semibold text-deep-blue break-words">
            Sala B
          </div>
          <div className="min-w-0 text-[10px] leading-tight font-semibold text-deep-blue break-words">
            Sala C (<span className="whitespace-nowrap">Trabajos científicos</span>)
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {filas.map((fila, index) => (
            <div
              key={fila.hora}
              className="rounded-2xl border border-wave bg-white p-2"
            >
              <div className="grid grid-cols-3 gap-2">
                <AgendaCard
                  hora={fila.hora}
                  contenido={fila.salaA}
                  compact
                  highlight={activeRowIndex === index}
                />
                <AgendaCard
                  hora={fila.hora}
                  contenido={fila.salaB}
                  compact
                  highlight={activeRowIndex === index}
                />
                <AgendaCard
                  hora={fila.hora}
                  contenido={fila.salaC}
                  compact
                  highlight={activeRowIndex === index}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop/Tablet: tabla tipo PDF */}
      <div
        ref={desktopWrapperRef}
        className="relative hidden overflow-x-auto rounded-2xl border border-wave bg-white md:block"
      >
        {shouldShowNowLine && nowLineTop != null ? (
          <div
            className="pointer-events-none absolute left-0 right-0 h-0.5 bg-chocolate"
            style={{ top: nowLineTop }}
          />
        ) : null}
        <table className="min-w-[780px] w-full border-collapse">
          <thead className="bg-cloud">
            <tr>
              <th
                scope="col"
                className="border-b border-wave px-4 py-3 text-left text-sm font-semibold text-deep-blue"
              >
                Sala A
              </th>
              <th
                scope="col"
                className="border-b border-wave px-4 py-3 text-left text-sm font-semibold text-deep-blue"
              >
                Sala B
              </th>
              <th
                scope="col"
                className="border-b border-wave px-4 py-3 text-left text-sm font-semibold text-deep-blue"
              >
                Sala C (<span className="whitespace-nowrap">Trabajos científicos</span>)
              </th>
            </tr>
          </thead>
          <tbody>
            {filas.map((fila, index) => (
              <tr
                key={fila.hora}
                ref={(el) => {
                  rowRefs.current[index] = el;
                }}
                className="odd:bg-white even:bg-cloud/40"
              >
                <td className="border-b border-wave px-4 py-3">
                  <AgendaCard
                    hora={fila.hora}
                    contenido={fila.salaA}
                    highlight={activeRowIndex === index}
                  />
                </td>
                <td className="border-b border-wave px-4 py-3">
                  <AgendaCard
                    hora={fila.hora}
                    contenido={fila.salaB}
                    highlight={activeRowIndex === index}
                  />
                </td>
                <td className="border-b border-wave px-4 py-3">
                  <AgendaCard
                    hora={fila.hora}
                    contenido={fila.salaC}
                    highlight={activeRowIndex === index}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </article>
  );
}

function Agenda() {
  return (
    <section id="programa" className="py-7 scroll-mt-36">
      <div className="flex flex-col gap-6">
        <h2 className="text-center text-3xl font-semibold text-deep-blue">
          Programa
        </h2>

        <div className="flex flex-col gap-4">
          <p className="text-center text-xl font-bold text-black">
            El programa de las Jornadas de Cirugía Otoño 2026 se desarrollará en
            tres salas en simultáneo (Hotel Sheraton, Mendoza).
          </p>
          <div className="rounded-3xl bg-wave p-5">
            <div className="flex flex-col gap-1 text-black">
              <p>
                <span className="font-bold">Duración:</span> 2 días (jueves y
                viernes)
              </p>
              <p>
                <span className="font-bold">Horario:</span> 08:00 - 19:00
              </p>
              <p>
                <span className="font-bold">Aulas simultáneas:</span> 3
              </p>
              <p>
                <span className="font-bold">Aulas 1 y 2:</span> Especialidades
                quirúrgicas (HPB, Coloproctología, Pared Abdominal, Tórax,
                Oncología, Mama, Equidad) + espacios para Asociación de
                Residentes.
              </p>
              <p>
                <span className="font-bold">Aula 3:</span> Presentación de
                Trabajos Científicos. Curso Intra-jornadas de PSQ a partir de
                las 13:00.
              </p>
              <p>
                <span className="font-bold">Break:</span> Café AM 15min ·
                Almuerzo 13:00-14:00 · Café PM 15min.
              </p>
              <p>
                <span className="font-bold">Acto inaugural:</span> jueves al
                cierre de la jornada (plenario).
              </p>
              <p className="font-bold">
                CURSO PSQ: Pre-Congreso (Instructores) Intra-Jornadas
                (Básico-Avanzado)
              </p>
            </div>
          </div>
        </div>

        <DynamicSchedule />

        {SHOW_SCHEDULE_V1 && (
          <div className="flex flex-col gap-8">
            <AgendaTable {...programaJueves} alwaysShowNowLine />
            <AgendaTable {...programaViernes} alwaysShowNowLine />
          </div>
        )}

        <div className="flex justify-center">
          <a
            href={pdf}
            download
            className="inline-flex items-center gap-1 rounded-3xl bg-chocolate px-6 py-3 font-semibold text-white transition hover:bg-lagoon-dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
            <span>Ver Programa</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Agenda;
