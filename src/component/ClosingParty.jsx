import {
  ArrowTopRightOnSquareIcon,
  CalendarDaysIcon,
  MapPinIcon,
  MusicalNoteIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { useId } from "react";
import sunsetPoster from "../assets/closing-party-sunset.jpeg";

const closingPartyUrl = "https://forms.gle/coZws6vZ7PuyWHCZ9";
const sheratonMapsUrl = "https://maps.app.goo.gl/17yY9a6xShujcTrB8";

function ClosingParty({ id }) {
  const titleId = useId();

  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="group relative isolate z-10 mb-24 scroll-mt-36 bg-slate-950 text-white sm:mb-0"
    >
      <div className="absolute inset-0 -z-30 overflow-hidden">
        <img
          src={sunsetPoster}
          alt=""
          className="h-full w-full scale-105 object-cover opacity-50 blur-sm transition duration-700 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-950/80 via-indigo-950/85 to-slate-950" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 sm:py-10 md:grid-cols-5 md:items-center lg:px-8 lg:pb-6 lg:pt-12">
        <div className="grid gap-7 md:col-span-3">
          <div className="grid justify-items-start gap-2 text-left">
            <p className="text-sm font-black uppercase tracking-widest text-fuchsia-100 sm:text-base">
              Jornadas de Cirugía Otoño 2026 · Mendoza
            </p>
            <h2
              id={titleId}
              className="text-6xl font-black uppercase leading-none text-white sm:text-7xl lg:text-8xl"
            >
              Sunset
            </h2>
          </div>

          <div className="grid gap-4">
            <p className="max-w-3xl text-3xl font-black uppercase leading-tight text-balance text-white sm:text-4xl lg:text-5xl">
              Una experiencia única en las Cavas del Sheraton
            </p>

            <div className="flex flex-wrap gap-3 text-sm font-semibold uppercase tracking-wide text-white/90 sm:text-base">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20">
                <CalendarDaysIcon className="size-5" />
                Viernes 8 de mayo
              </span>
              <a
                href={sheratonMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 ring-1 ring-white/20 transition hover:bg-white/15"
              >
                <MapPinIcon className="size-5" />
                Las Cavas del Sheraton
              </a>
            </div>
          </div>

        </div>

        <div className="grid gap-5 border-t border-white/15 pt-6 md:col-span-2 md:border-t-0 md:pt-0">
          <div className="grid gap-3">
            <p className="text-sm font-black uppercase tracking-widest text-fuchsia-100">
              Cierre de jornadas
            </p>
            <p className="text-xl font-semibold leading-8 text-white/90 text-pretty">
              Después del programa académico, una noche para encontrarnos con
              cena, barra libre y música.
            </p>
          </div>

          <ul className="grid gap-2 text-center">
            <li className="flex min-h-16 items-center justify-center bg-indigo-700/80 px-4 py-3 text-lg font-black uppercase leading-tight tracking-wide">
              Cena de tapeo en pasos
            </li>
            <li className="flex min-h-16 items-center justify-center bg-violet-700/80 px-4 py-3 text-2xl font-black uppercase leading-tight tracking-wide">
              Barra libre · DJ
            </li>
            <li className="flex min-h-16 items-center justify-center bg-fuchsia-700/75 px-4 py-3 text-2xl font-black uppercase leading-tight tracking-wide">
              Fiesta inolvidable
            </li>
          </ul>

        </div>
      </div>

      <div className="relative z-10 grid gap-0 opacity-90">
        <div className="h-10 bg-indigo-700/80 lg:h-8" />
        <div className="h-10 bg-violet-700/80 lg:h-8" />
        <div className="h-10 bg-fuchsia-700/75 lg:h-8" />
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 text-white sm:flex-row sm:flex-wrap sm:justify-between">
          <div className="flex w-full flex-col items-center gap-3 sm:w-fit sm:flex-row">
            <a
              href={closingPartyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-white px-4 py-3 text-sm font-black uppercase tracking-wide text-slate-950 shadow-xl shadow-fuchsia-950/30 transition duration-300 hover:-translate-y-0.5 hover:bg-fuchsia-100 sm:w-fit sm:px-6 sm:text-base"
            >
              <TicketIcon className="size-5" />
              <span>Conseguí tus entradas</span>
              <ArrowTopRightOnSquareIcon className="size-5" />
            </a>
            <span className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 shadow-lg shadow-fuchsia-950/10 ring-1 ring-fuchsia-200 sm:px-5 sm:py-3 sm:text-sm sm:tracking-widest">
              <span className="size-1.5 rounded-full bg-fuchsia-400 motion-safe:animate-pulse sm:size-2" />
              Cupos limitados
            </span>
          </div>

          <div className="flex w-fit max-w-full items-center justify-center gap-2 rounded-full bg-white/95 px-4 py-2 text-slate-700 shadow-lg shadow-fuchsia-950/10 ring-1 ring-fuchsia-100 sm:gap-3 sm:bg-slate-950/90 sm:px-5 sm:py-3 sm:text-white/90 sm:shadow-xl sm:shadow-fuchsia-950/25 sm:ring-white/10">
            <MusicalNoteIcon className="size-5 shrink-0 text-fuchsia-500 sm:size-6 sm:text-fuchsia-200" />
            <span className="text-center text-sm font-medium sm:text-base sm:font-semibold">
              Viernes por la noche en Mendoza
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClosingParty;
