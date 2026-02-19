import { useEffect, useMemo, useRef, useState } from "react";
import { programaJueves, programaViernes } from "../data/programa";
import pdf from "../assets/PROGRAMA-ACM.pdf";

function getSlotVariant(text = "") {
  const normalized = String(text).toLowerCase();

  if (normalized.includes("coffee")) return "break";
  if (normalized.includes("almuerzo")) return "meal";
  if (normalized.includes("acto inaugural")) return "plenary";

  return "session";
}

function AgendaCard({ hora, contenido, compact = false }) {
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

  return (
    <div className={`min-w-0 rounded-xl ${paddingClasses} ${variantClasses}`}>
      <div
        className={`${timeTextClasses} font-semibold opacity-90 whitespace-nowrap`}
      >
        {hora}
      </div>
      <div
        className={`${contentTextClasses} font-semibold leading-snug break-words`}
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

function AgendaTable({ titulo, fecha, columnas, filas, alwaysShowNowLine }) {
  const [nowLineTop, setNowLineTop] = useState(null);
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
    <article className="space-y-3">
      <div className="rounded-4xl border-2 border-wave p-4">
        <h3 className="text-2xl font-semibold text-ink">{titulo}</h3>
      </div>

      {/* Mobile: 3 columnas (Sala A/B/C) en la misma fila */}
      <div className="md:hidden space-y-2">
        <div className="grid grid-cols-3 gap-2 px-1">
          {columnas.slice(0, 3).map((col) => (
            <div
              key={col}
              className="min-w-0 text-[10px] leading-tight font-semibold text-deep-blue break-words"
            >
              {col}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {filas.map((fila) => (
            <div
              key={fila.hora}
              className="rounded-2xl border border-wave bg-white p-2"
            >
              <div className="grid grid-cols-3 gap-2">
                <AgendaCard hora={fila.hora} contenido={fila.salaA} compact />
                <AgendaCard hora={fila.hora} contenido={fila.salaB} compact />
                <AgendaCard hora={fila.hora} contenido={fila.salaC} compact />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop/Tablet: tabla tipo PDF */}
      <div
        ref={desktopWrapperRef}
        className="hidden md:block relative overflow-x-auto rounded-2xl border border-wave bg-white"
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
              {columnas.map((col) => (
                <th
                  key={col}
                  scope="col"
                  className="border-b border-wave px-4 py-3 text-left text-sm font-semibold text-deep-blue "
                >
                  {col}
                </th>
              ))}
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
                  <AgendaCard hora={fila.hora} contenido={fila.salaA} />
                </td>
                <td className="border-b border-wave px-4 py-3">
                  <AgendaCard hora={fila.hora} contenido={fila.salaB} />
                </td>
                <td className="border-b border-wave px-4 py-3">
                  <AgendaCard hora={fila.hora} contenido={fila.salaC} />
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
      <div className="space-y-6">
        <h2 className="text-3xl text-deep-blue flex justify-center font-semibold">
          Programa
        </h2>

        <div>
          <p className="text-black  text-center font-bold text-xl">
            El programa de las Jornadas de Cirugía Otoño 2026 se desarrollará en
            tres salas en simultáneo (Hotel Sheraton, Mendoza).
          </p>
          <div className=" bg-wave rounded-3xl p-5 my-4 ">
            <p>
              <span className="font-bold">Duración:</span> 2 días (jueves y
              viernes) <br />
              <span className="font-bold">Horario:</span> 08:00 - 19:00 <br />
              <span className="font-bold">Aulas simultáneas:</span> 3 <br />
              <span className="font-bold">Aulas 1 y 2:</span>Especialidades
              quirúrgicas (HPB, Coloproctología, Pared Abdominal,
              <br />
              <span></span>Tórax, Oncología, Mama, Equidad) + espacios para
              Asociación de Residentes.
              <br />
              <span className="font-bold">Aula 3:</span>Presentación de Trabajos
              Científicos. Curso Intra-jornadas de PSQ a partir de las 13:00{" "}
              <br />
              <span className="font-bold"> Break:</span> Café AM 15min ·
              Almuerzo 13:00–14:00 · Café PM 15min. <br />
              <span className="font-bold"> Acto inaugural:</span> jueves al
              cierre de la jornada (plenario). <br />
              <br />
              <span className="font-bold">
                CURSO PSQ: Pre-Congreso (Instructores) Intra-Jornadas
                (Básico-Avanzado)
              </span>
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <AgendaTable {...programaJueves} alwaysShowNowLine />
          <AgendaTable {...programaViernes} alwaysShowNowLine />
        </div>

        <div className="p-5 text-center bg-wave rounded-3xl space-y-4 ">
          <h2 className="font-bold text-2xl text-center  text-deep-blue ">
            ACLARACIÓN
          </h2>
          <p className="text-black">
            <span className="font-bold">Moderación: </span>2 moderadores por
            bloque (A/B); 1 coordinador por bloque en C. <br />
            <span className="font-bold">Tiempo por charla (A/B):</span> 20′ +
            10′ discusiones.
            <br />
            <span className="font-bold">Trabajos (C):</span> comunicaciones por
            bloque (15′) a partir de las 13:00 curso Intra-jornadas PSQ. <br />
            <span className="font-bold">
              PRE-JORNADAS PSQ- INSTRUCTORES miércoles 6 de abril.
            </span>
            CURSO Lugar a confirmar.
          </p>
        </div>

        <div className="flex justify-center ">
          <a href={pdf} download>
            <button className="flex space-x-1 bg-chocolate rounded-3xl px-6 py-3 text-white font-semibold mx-2 hover:bg-lagoon-dark transition">
              <div className="">
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
              </div>

              <h2 className=""> Ver Programa</h2>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Agenda;
