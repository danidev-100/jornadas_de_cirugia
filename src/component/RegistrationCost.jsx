import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import courses from "../data/courses";
import PriceTier, { formatPrice } from "./PriceTier";

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

function formatCourseSeats(seats, remainingSeats = null) {
  if (seats === null) {
    return "A confirmar";
  }

  if (remainingSeats === null) {
    return String(seats);
  }

  return `${seats} (Quedan ${remainingSeats})`;
}

function formatCourseField(value) {
  if (value === null || value === "") {
    return "A confirmar";
  }

  return value;
}

function formatRequirements(requirements) {
  if (!requirements || requirements.length === 0) {
    return null;
  }

  return `${requirements.join(". ")}.`;
}

function renderCourseTitle(title, titleLines) {
  if (!titleLines || titleLines.length === 0) {
    return title;
  }

  return (
    <span className="flex flex-wrap gap-x-2 gap-y-1">
      {titleLines.map((line) => (
        <span key={line} className="whitespace-nowrap">
          {line}
        </span>
      ))}
    </span>
  );
}

function RegistrationCost() {
  const [activeModal, setActiveModal] = useState(null);
  const activeCourse =
    activeModal?.kind === "course"
      ? courses.find((course) => course.id === activeModal.courseId) ?? null
      : null;

  return (
    <>
      <section id="inscripciones" className="scroll-mt-36 py-6">
        <div className="mx-auto grid max-w-5xl gap-10 py-6 sm:py-10">
          <header className="grid gap-4 text-center">
            <h2 className="text-base font-semibold tracking-wide text-deep-blue md:text-lg">
              Inscripciones
            </h2>
            <div className="grid gap-3">
              <p className="mx-auto max-w-4xl text-3xl font-semibold leading-tight tracking-tight text-balance text-deep-blue md:text-5xl">
                Elegí tu categoría y completá tu inscripción
              </p>
              <p className="mx-auto max-w-3xl text-lg leading-8 text-chocolate text-pretty md:text-xl md:leading-9">
                Consultá los aranceles 2026 y seleccioná la categoría que
                corresponda a tu perfil profesional. Todos los valores están
                expresados en pesos argentinos (ARS).
              </p>
            </div>
          </header>

          <article className="mx-auto grid max-w-4xl gap-6 md:gap-8">
            <div className="grid gap-4 text-left">
              <div className="grid gap-2">
                <p className="text-sm font-semibold uppercase tracking-widest text-deep-blue/60">
                  Aranceles 2026
                </p>
                <p className="text-base leading-7 text-chocolate md:text-lg md:leading-8">
                  Si tu categoría requiere acreditación, te indicaremos los
                  pasos antes de completar el formulario.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModal({ kind: "category" })}
                  className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-chocolate px-6 py-3 text-base font-semibold text-white transition hover:bg-deep-blue"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5"
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
            </div>

            <div className="overflow-hidden rounded-3xl border border-chocolate/10 bg-chocolate/10">
              <ul className="grid grid-cols-2 gap-px">
                {registrationPrices.map(({ label, price }) => (
                  <PriceTier key={label} label={label} price={price} />
                ))}
              </ul>
            </div>

            <p className="max-w-3xl text-sm leading-7 text-chocolate text-pretty md:text-base md:leading-8">
              Las categorías con arancel diferencial pueden requerir certificado
              respaldatorio. Vas a poder enviarlo antes o después de completar
              la inscripción.{" "}
              <button
                type="button"
                onClick={() => setActiveModal({ kind: "category" })}
                className="cursor-pointer font-semibold text-deep-blue underline underline-offset-4"
              >
                Ver acreditación de categoría
              </button>
              .
            </p>

            <section id="cursos" className="grid gap-6 border-t border-chocolate/10 pt-6 md:gap-8 md:pt-8">
              <div className="grid gap-2 text-left">
                <p className="text-sm font-semibold uppercase tracking-widest text-deep-blue/60">
                  Cursos 2026
                </p>
                <p className="max-w-3xl text-base leading-7 text-chocolate md:text-lg md:leading-8">
                  Consultá instructores, cupos y el detalle de cada curso para
                  revisar categorías y aranceles antes de la inscripción.
                </p>
              </div>

              <div className="hidden md:block">
                <div className="overflow-hidden rounded-3xl border border-chocolate/10 bg-white shadow-sm shadow-chocolate/5">
                  <table className="min-w-full border-collapse text-left">
                    <thead className="bg-chocolate/5">
                      <tr>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                          Nombre
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                          Instructores
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                          Cupos
                        </th>
                        <th className="px-6 py-4 text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-chocolate/10">
                      {courses.map(
                        ({
                          id,
                          remainingSeats,
                          seats,
                          tableInstructors,
                          title,
                          titleLines,
                        }) => (
                        <tr key={id} className="align-top">
                          <td className="px-6 py-5">
                            <p className="text-lg font-semibold leading-7 text-deep-blue">
                              {renderCourseTitle(title, titleLines)}
                            </p>
                          </td>
                          <td className="px-6 py-5">
                            <p className="text-base leading-7 text-chocolate">
                              {tableInstructors}
                            </p>
                          </td>
                          <td className="px-6 py-5">
                            <p className="whitespace-nowrap text-base font-semibold leading-7 text-deep-blue">
                              {formatCourseSeats(seats, remainingSeats)}
                            </p>
                          </td>
                          <td className="px-6 py-5">
                            <button
                              type="button"
                              onClick={() =>
                                setActiveModal({ kind: "course", courseId: id })
                              }
                              className="inline-flex whitespace-nowrap rounded-full bg-ocean-blue px-5 py-3 text-center font-semibold text-white transition hover:opacity-90"
                            >
                              Ver detalles
                            </button>
                          </td>
                        </tr>
                        ),
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <ul className="grid gap-4 md:hidden">
                {courses.map(
                  ({
                    id,
                    remainingSeats,
                    seats,
                    tableInstructors,
                    title,
                    titleLines,
                  }) => (
                  <li
                    key={id}
                    className="grid gap-4 rounded-3xl border border-chocolate/10 bg-white p-5 shadow-sm shadow-chocolate/5"
                  >
                    <dl className="grid gap-4">
                      <div className="grid gap-1">
                        <dt className="text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                          Nombre
                        </dt>
                        <dd className="text-lg font-semibold leading-7 text-deep-blue">
                          {renderCourseTitle(title, titleLines)}
                        </dd>
                      </div>

                      <div className="grid gap-1">
                        <dt className="text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                          Instructores
                        </dt>
                        <dd className="text-base leading-7 text-chocolate">
                          {tableInstructors}
                        </dd>
                      </div>

                      <div className="grid gap-1">
                        <dt className="text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                          Cupos
                        </dt>
                        <dd className="text-base font-semibold leading-7 text-deep-blue">
                          {formatCourseSeats(seats, remainingSeats)}
                        </dd>
                      </div>

                      <div className="grid gap-1">
                        <dt className="text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                        </dt>
                        <dd>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveModal({ kind: "course", courseId: id })
                            }
                            className="inline-flex w-full items-center justify-center rounded-full bg-ocean-blue px-5 py-3 text-center font-semibold text-white transition hover:opacity-90"
                          >
                            Ver detalles
                          </button>
                        </dd>
                      </div>
                    </dl>
                  </li>
                  ),
                )}
              </ul>
            </section>
          </article>
        </div>
      </section>

      <Dialog
        open={activeModal?.kind === "category"}
        onClose={() => setActiveModal(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-ink/70" aria-hidden="true" />
        <div className="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="flex w-full max-w-xl flex-col gap-6 rounded-4xl bg-white p-5 shadow-2xl sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="grid gap-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-lagoon">
                    Antes de completar el formulario
                  </span>
                  <DialogTitle className="text-2xl font-semibold text-deep-blue sm:text-3xl">
                    Acreditación de categoría
                  </DialogTitle>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
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

              <div className="grid gap-5 text-left">
                <p className="text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                  Para conservar el arancel correspondiente a tu categoría de
                  participante, enviá el certificado que lo acredite a{" "}
                  <span className="font-semibold text-deep-blue">
                    secretaria.acmza@gmail.com
                  </span>
                  .
                </p>

                <div className="grid gap-2 border-t border-slate-200 pt-4">
                  <p className="text-sm leading-6 text-slate-500">
                    Ejemplos: certificado de alumno regular, constancia de
                    residencia, credencial societaria u otra documentación
                    equivalente.
                  </p>
                  <p className="text-sm leading-6 text-slate-500">
                    Podés enviar el certificado antes o después de completar el
                    formulario, pero hacelo el mismo día para evitar demoras en
                    la validación.
                  </p>
                </div>

                <div className="grid gap-3 pt-2">
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
                    onClick={() => setActiveModal(null)}
                    className="inline-flex w-full cursor-pointer items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <Dialog
        open={activeCourse !== null}
        onClose={() => setActiveModal(null)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-ink/70" aria-hidden="true" />
        <div className="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel className="flex w-full max-w-3xl flex-col gap-6 rounded-4xl bg-white p-5 shadow-2xl sm:p-6">
              {activeCourse ? (
                <>
                  <div className="flex items-start justify-between gap-4">
                    <div className="grid min-w-0 gap-2">
                      <span className="text-xs font-semibold uppercase tracking-widest text-lagoon">
                        Detalle del curso
                      </span>
                      <DialogTitle className="text-2xl font-semibold leading-tight text-deep-blue sm:text-3xl">
                        {renderCourseTitle(
                          activeCourse.title,
                          activeCourse.titleLines,
                        )}
                      </DialogTitle>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                      aria-label={`Cerrar detalle de ${activeCourse.title}`}
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

                  <div className="grid gap-6 text-left">
                    <p className="text-base leading-7 text-slate-700 sm:text-lg sm:leading-8">
                      {activeCourse.summary}
                    </p>

                    {activeCourse.programHref ? (
                      <div className="grid justify-items-end gap-2">
                        <a
                          href={activeCourse.programHref}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-ocean-blue transition hover:opacity-80"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.7"
                            className="size-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 14.25v2.625A2.625 2.625 0 0 1 16.875 19.5H7.125A2.625 2.625 0 0 1 4.5 16.875V14.25m3.75-4.5L12 13.5m0 0 3.75-3.75M12 13.5V3"
                            />
                          </svg>
                          <span>Descargar Programa Completo</span>
                        </a>
                        {activeCourse.programUpdate ? (
                          <span className="text-xs font-medium tracking-wide text-chocolate/70">
                            {activeCourse.programUpdate}
                          </span>
                        ) : null}
                      </div>
                    ) : null}

                    <div className="grid gap-4 border-t border-slate-200 pt-4 md:grid-cols-2">
                      <div className="grid gap-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                          Instructores
                        </p>
                        <p className="text-base leading-7 text-slate-700">
                          {activeCourse.modalInstructors.join(", ")}
                        </p>
                      </div>

                      <div className="grid gap-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                          Cupos
                        </p>
                        <p className="text-base font-semibold leading-7 text-deep-blue">
                          {formatCourseSeats(
                            activeCourse.seats,
                            activeCourse.remainingSeats,
                          )}
                        </p>
                      </div>

                      <div className="grid gap-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                          Fecha y hora
                        </p>
                        <p className="text-base leading-7 text-slate-700">
                          {formatCourseField(activeCourse.schedule)}
                        </p>
                      </div>

                      <div className="grid gap-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                          Lugar
                        </p>
                        <p className="text-base leading-7 text-slate-700">
                          {formatCourseField(activeCourse.location)}
                        </p>
                      </div>
                    </div>

                    {activeCourse.detailPoints.length > 0 ? (
                      <div className="grid gap-4 border-t border-slate-200 pt-4">
                        <div className="grid gap-1">
                          <p className="text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                            Detalle del curso
                          </p>
                          <p className="text-sm leading-6 text-slate-500">
                            Resumen de contenidos y modalidad publicados para
                            esta actividad.
                          </p>
                        </div>

                        <ul className="grid gap-3">
                          {activeCourse.detailPoints.map((detailPoint) => (
                            <li
                              key={detailPoint}
                              className="flex items-start gap-3 text-base leading-7 text-slate-700"
                            >
                              <span className="mt-2 size-2 shrink-0 rounded-full bg-lagoon" />
                              <span>{detailPoint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div className="grid gap-4 border-t border-slate-200 pt-4">
                      <div className="grid gap-1">
                        <p className="text-xs font-semibold uppercase tracking-widest text-deep-blue/60">
                          Aranceles
                        </p>
                        <p className="text-sm leading-6 text-slate-500">
                          Valores informativos por categoría publicada para este
                          curso.
                        </p>
                      </div>

                      <ul className="grid gap-3">
                        {activeCourse.priceOptions.map(
                          ({ label, price, registrationHref, requirements }) => (
                            <li
                              key={label}
                              className="grid gap-3 rounded-3xl border border-slate-200 p-4 md:grid-cols-3 md:items-center"
                            >
                              <div className="grid gap-1">
                                <p className="text-base font-semibold leading-7 text-deep-blue">
                                  {label}
                                </p>
                              </div>

                              <p className="text-base font-semibold leading-7 text-chocolate md:text-lg">
                                {price === null ? "A confirmar" : formatPrice(price)}
                              </p>

                              {registrationHref ? (
                                <a
                                  href={registrationHref}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex w-full items-center justify-center rounded-full bg-ocean-blue px-5 py-3 text-center font-semibold text-white transition hover:opacity-90"
                                >
                                  Ir a inscripción
                                </a>
                              ) : (
                                <button
                                  type="button"
                                  disabled
                                  className="inline-flex w-full items-center justify-center rounded-full bg-ocean-blue px-5 py-3 text-center font-semibold text-white transition disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                                >
                                  Ir a inscripción
                                </button>
                              )}

                              {formatRequirements(requirements) ? (
                                <p className="text-sm leading-6 text-slate-500 md:col-span-3">
                                  <span className="font-semibold text-slate-600">
                                    Requisitos:
                                  </span>{" "}
                                  {formatRequirements(requirements)}
                                </p>
                              ) : null}
                            </li>
                          ),
                        )}
                      </ul>

                      <button
                        type="button"
                        onClick={() => setActiveModal(null)}
                        className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-5 py-3 text-center font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </>
              ) : null}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default RegistrationCost;
