import NationalityFlag from "./NationalityFlag";
import { getAllPeople, getPersonAnchorId } from "../data/people.js";

function PersonFallbackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      className="h-10 w-10"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
    </svg>
  );
}

function Speakers() {
  const people = getAllPeople();

  return (
    <section id="disertantes" className="space-y-10 py-7 scroll-mt-36">
      <div className="text-center px-4 md:px-16 lg:px-50 space-y-6">
        <h2 className="text-3xl font-semibold text-white">Disertantes</h2>
        <p className="text-white text-xl">
          Conocé a los disertantes y moderadores confirmados para las Jornadas
          de Cirugía Otoño 2026. Este espacio se nutre del registro editorial de
          personas y seguirá creciendo a medida que sumemos nuevos perfiles.
        </p>
      </div>
      <hr className="border-1 border-white/50" />
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {people.map((person) => (
          <article
            id={getPersonAnchorId(person.id)}
            key={person.id}
            className="group relative flex h-36 scroll-mt-36 gap-4 overflow-hidden rounded-3xl border border-white/15 bg-white/5 text-white"
          >
            <div className="flex h-full w-28 shrink-0 items-center justify-center overflow-hidden rounded-l-3xl border-r border-white/10 bg-white/10 text-white/70 sm:w-32">
              {person.imageSrc ? (
                <img
                  src={person.imageSrc}
                  alt={person.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-115"
                />
              ) : (
                <PersonFallbackIcon />
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1 overflow-hidden py-4 pr-5">
              <div className="flex items-start gap-2">
                <h3 className="min-w-0 shrink text-base leading-tight font-semibold">
                  {person.name}
                </h3>
                <NationalityFlag
                  nationality={person.nationality}
                  className="shrink-0 text-sm leading-none"
                />
              </div>
              <div className="flex min-h-0 flex-col gap-1 overflow-hidden">
                {person.job_title ? (
                  <p className="text-white/90 text-sm">{person.job_title}</p>
                ) : null}
                {person.institution ? (
                  <p className="text-white/60 text-xs">{person.institution}</p>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Speakers;
