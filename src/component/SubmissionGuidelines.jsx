import pdf from "../assets/REGLAMENTO-ACM.pdf";
import { documentUpdates } from "../data/documentUpdates";

function SubmissionGuidelines() {
  const scientificWorkMailto = `mailto:jornadasmza2026.trabajos@gmail.com?subject=${encodeURIComponent(
    "Trabajo científico"
  )}`;

  return (
    <section id="trabajos" className="scroll-mt-36">
      <div className="mx-auto grid max-w-5xl gap-10">
        <header className="grid gap-4 text-center">
          <h2 className="text-base font-semibold tracking-wide text-deep-blue md:text-lg">
            Trabajos Científicos
          </h2>
          <p className="mx-auto max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-balance text-lagoon md:text-4xl">
            Normativas Presentación Trabajos Científicos.
            <span className="mt-2 block text-xl font-medium md:text-2xl">
              Jornadas de otoño de Cirugía 2026
            </span>
          </p>
        </header>

        <article className="mx-auto grid max-w-4xl gap-6 text-left md:gap-8">
          <p className="text-xl font-semibold leading-8 text-ink text-pretty md:text-2xl md:leading-9">
            La fecha límite para presentar los trabajos científicos es el 5 de
            abril de 2026.
          </p>
          <p className="text-lg leading-8 text-chocolate text-pretty md:text-xl md:leading-9">
            Valoramos enormemente el esfuerzo dedicado a cada presentación.
            Hemos recibido una gran cantidad de trabajos y agradecemos
            sinceramente a quienes participaron de esta convocatoria.
          </p>
          <p className="text-lg leading-8 text-chocolate text-pretty md:text-xl md:leading-9">
            Nos encontraremos en las Jornadas para seguir fortaleciendo los
            vínculos académicos que reflejan ese compromiso compartido con la
            salud.
          </p>
        </article>

        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-start">
            <div className="grid justify-items-center gap-2">
              <a
                href={pdf}
                download
                className="flex items-center gap-1 rounded-3xl bg-chocolate px-6 py-3 font-semibold text-white transition hover:bg-lagoon-dark"
              >
                <div>
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
                <h2>Reglamento</h2>
              </a>
              <span className="text-xs font-medium tracking-wide text-chocolate/70">
                {documentUpdates.reglamento}
              </span>
            </div>
            <a
              href={scientificWorkMailto}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 rounded-3xl bg-chocolate px-6 py-3 font-semibold text-white transition hover:bg-lagoon-dark"
            >
              <div>
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
                    d="M12 16.5V9.75m0 0-3 3m3-3 3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                  />
                </svg>
              </div>
              <h2>Enviar trabajo científico</h2>
            </a>
          </div>
          <p className="max-w-3xl text-center text-base leading-7 text-chocolate text-pretty md:text-lg md:leading-8">
            Si tu correo no se abre automáticamente, enviá tu trabajo a{" "}
            <a
              href={scientificWorkMailto}
              className="font-semibold text-deep-blue underline underline-offset-4"
            >
              jornadasmza2026.trabajos@gmail.com
            </a>{" "}
            con el asunto &quot;Trabajo científico&quot;.
          </p>
        </div>
      </div>
    </section>
  );
}

export default SubmissionGuidelines;
