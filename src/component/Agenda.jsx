import { programaJueves, programaViernes } from "../data/programa";
import pdf from "../assets/PROGRAMA-ACM.pdf";

function AgendaTable({ titulo, columnas, filas }) {
  return (
    <article className="space-y-3">
      <div className="rounded-4xl border-2 border-wave p-4">
        <h3 className="text-2xl font-semibold text-ink">{titulo}</h3>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-wave bg-white">
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
            {filas.map((fila) => (
              <tr key={fila.hora} className="odd:bg-white even:bg-cloud/40">
                <td className="border-b border-wave px-4 py-3 text-sm font-medium text-ink whitespace-nowrap">
                  {fila.hora}
                </td>
                <td className="border-b border-wave px-4 py-3 text-sm text-ink">
                  {fila.salaA}
                </td>
                <td className="border-b border-wave px-4 py-3 text-sm text-ink">
                  {fila.salaB}
                </td>
                <td className="border-b border-wave px-4 py-3 text-sm text-ink">
                  {fila.salaC}
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
              <span className="font-bold">Duracion:</span> 2 días (jueves y
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
          <AgendaTable {...programaJueves} />
          <AgendaTable {...programaViernes} />
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
            <button className="flex space-x-5 bg-chocolate rounded-3xl px-6 py-3 text-white font-semibold mx-2 hover:bg-lagoon-dark transition">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
              </div>

              <h2 className=""> Descargar Programa</h2>
            </button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default Agenda;
