import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import PriceTier from "./PriceTier";

const registrationPrices = [
  { label: "Socios (AAC-ACM)", price: 100000 },
  { label: "No Socios", price: 120000 },
  { label: "Extranjeros", price: 120000 },
  { label: "Residentes", price: 60000 },
  { label: "Socios AAMRCG", price: 45000 },
  { label: "Instrumentadores/as", price: 70000 },
  { label: "AADI", price: 50000 },
  { label: "Estudiantes", price: 30000 },
];

const registrationFormUrl = "https://form.piprestaciones.ar/event/cirugia";
const certificateMailTo =
  "mailto:secretaria.acmza@gmail.com?subject=Certificado%20de%20categor%C3%ADa%20-%20Jornadas%20de%20Cirug%C3%ADa&body=Hola%2C%20adjunto%20mi%20certificado%20para%20acreditar%20mi%20categor%C3%ADa%20de%20inscripci%C3%B3n.";

function RegistrationCost() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="inscripciones" className="scroll-mt-36 py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 py-6 text-center sm:py-10">
          <h2 className="text-3xl font-bold leading-tight text-deep-blue md:text-4xl">
            Asegurá tu lugar en el evento médico más esperado del año
          </h2>
          <p className="text-lg text-slate-600 md:text-xl">
            Seleccioná la categoría que mejor se adapte a tu perfil profesional
            <br />
            Precios expresados en Pesos{" "}
            <span className="whitespace-nowrap">Argentinos (ARS)</span>
          </p>
        </div>

        <article className="mx-auto flex flex-col gap-6 rounded-2xl bg-chocolate p-4">
          <h3 className="px-5 pt-5 text-center text-3xl font-bold text-white">
            Costos
          </h3>
          <div className="grid grid-cols-1 gap-4 px-3 md:grid-cols-2 lg:grid-cols-3">
            {registrationPrices.map(({ label, price }) => (
              <PriceTier key={label} label={label} price={price} />
            ))}
          </div>
          <div className="flex justify-center px-4 pb-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-ink px-5 py-3 text-base font-semibold text-white transition hover:bg-lagoon-dark"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 text-gold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                />
              </svg>
              <span>Inscribirme</span>
            </button>
          </div>
        </article>
      </section>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-ink/70" aria-hidden="true" />
        <div className="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="flex w-full max-w-xl flex-col gap-5 rounded-[2rem] bg-white p-4 shadow-2xl sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2">
                  <span className="inline-flex w-fit rounded-full bg-cloud px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-lagoon">
                    Antes de completar el formulario
                  </span>
                  <DialogTitle className="text-2xl font-bold text-deep-blue sm:text-3xl">
                    Acreditación de categoría
                  </DialogTitle>
                </div>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                  aria-label="Cerrar información de inscripción"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col gap-4 rounded-3xl bg-cloud px-5 py-6 text-left">
                <div className="flex flex-col gap-3 rounded-3xl bg-white px-4 py-4 shadow-sm">
                  <p className="text-base leading-relaxed text-slate-700 sm:text-lg">
                    Para conservar el arancel correspondiente a tu categoría de
                    participante, no te olvides de enviar el certificado que lo
                    acredite a{" "}
                    <span className="font-semibold text-deep-blue">
                      secretaria.acmza@gmail.com
                    </span>
                    .
                  </p>
                  <p className="text-sm leading-relaxed text-slate-500">
                    Ejemplos: certificado de alumno regular, constancia de
                    residencia, credencial societaria u otra documentación
                    equivalente.
                  </p>
                </div>

                <div className="rounded-3xl border border-dashed border-lagoon/40 bg-white px-4 py-4">
                  <p className="text-sm leading-relaxed text-slate-600">
                    Podés enviar el certificado antes o después de completar el
                    formulario, pero hacelo el mismo día para evitar demoras en
                    la validación.
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href={certificateMailTo}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-deep-blue px-5 py-3 text-center font-semibold text-white transition hover:opacity-90"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 7.5v9A2.25 2.25 0 0 1 19.5 18.75h-15A2.25 2.25 0 0 1 2.25 16.5v-9m19.5 0A2.25 2.25 0 0 0 19.5 5.25h-15A2.25 2.25 0 0 0 2.25 7.5m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 9.659A2.25 2.25 0 0 1 2.25 7.743V7.5"
                      />
                    </svg>
                    <span>Enviar certificado</span>
                  </a>
                  <a
                    href={registrationFormUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-ocean-blue px-5 py-3 text-center font-semibold text-white transition hover:opacity-90"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-4.5-4.5H21m0 0v7.5M21 6 10.5 16.5"
                      />
                    </svg>
                    <span>Ir al formulario de inscripción</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-white"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default RegistrationCost;
