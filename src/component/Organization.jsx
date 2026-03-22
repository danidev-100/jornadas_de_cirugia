import { getOrganizationGroups } from "../data/organization";

const cardMetaByKey = {
  commission_directiva: {
    badge: "Asociación de Cirugía de Mendoza",
    description:
      "Equipo institucional que acompaña la dirección académica y organizativa de las jornadas",
    accentClassName: "bg-deep-blue",
    badgeClassName: "bg-deep-blue/10 text-deep-blue",
  },
  comite_jornadas_2026: {
    badge: "Jornadas de Otoño 2026",
    description:
      "Comité responsable de la coordinación operativa y el acompañamiento integral del evento",
    accentClassName: "bg-gold",
    badgeClassName: "bg-gold/20 text-chocolate",
  },
};

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px flex-1 bg-slate-200" />
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {children}
      </span>
      <span className="h-px flex-1 bg-slate-200" />
    </div>
  );
}

function RoleList({ members }) {
  return (
    <ul className="flex flex-col rounded-3xl bg-cloud/65 px-4 py-2 ring-1 ring-inset ring-wave/20">
      {members.map((member) => (
        <li
          key={member.id}
          className="flex flex-col gap-2 border-b border-slate-200 py-3 last:border-b-0 sm:flex-row sm:items-center sm:gap-6"
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-lagoon sm:w-56 sm:shrink-0">
            {member.role}
          </span>
          <span className="text-lg font-semibold text-ink">
            {member.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

function NameList({ members }) {
  return (
    <ul className="flex flex-col gap-3">
      {members.map((member) => (
        <li key={member.id} className="flex items-start gap-3">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold" />
          <span className="text-sm font-medium leading-snug text-ink sm:text-base">
            {member.name}
          </span>
        </li>
      ))}
    </ul>
  );
}

function OrganizationCard({ group }) {
  const meta = cardMetaByKey[group.key] ?? {
    badge: "Organización",
    description: null,
    accentClassName: "bg-wave",
    badgeClassName: "bg-wave/20 text-deep-blue",
  };

  return (
    <article className="relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <span className={`absolute inset-y-0 left-0 w-1 ${meta.accentClassName}`} />

      <div className="flex flex-col gap-6 px-5 py-6 sm:px-6">
        <div className="flex flex-col gap-4 sm:pl-3">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`inline-flex w-fit items-center rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide ${meta.badgeClassName}`}
            >
              {meta.badge}
            </span>
          </div>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="flex max-w-3xl flex-col gap-2">
              <h3 className="text-2xl font-semibold text-ink sm:text-3xl">
                {group.title}
              </h3>
              {meta.description ? (
                <p className="max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
                  {meta.description}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        {group.officers.length > 0 || group.vocales.length > 0 ? (
          <div className="flex flex-col gap-6">
            {group.officers.length > 0 ? (
              <div className="flex flex-col gap-4 sm:pl-3">
                <SectionLabel>Cargos principales</SectionLabel>
                <RoleList members={group.officers} />
              </div>
            ) : null}

            {group.vocales.length > 0 ? (
              <div className="flex flex-col gap-4 sm:pl-3">
                <SectionLabel>Vocales</SectionLabel>
                <NameList members={group.vocales} />
              </div>
            ) : null}
          </div>
        ) : null}

        {!group.officers.length && !group.vocales.length ? (
          <div className="flex flex-col gap-4 sm:pl-3">
            <SectionLabel>Integrantes</SectionLabel>
            <NameList members={group.members} />
          </div>
        ) : null}
      </div>
    </article>
  );
}

function Organization() {
  const organizationGroups = getOrganizationGroups();

  return (
    <section id="organizacion" className="scroll-mt-36 px-4 py-6 sm:px-6">
      <div className="mx-auto flex flex-col gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex max-w-4xl flex-col gap-4">
            <h2 className="text-3xl font-bold text-deep-blue sm:text-4xl">
              Organización
            </h2>
            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
              La XXVII Edición de las Jornadas de Cirugía, Otoño 2026, es
              organizada por la{" "}
              <span className="font-semibold text-deep-blue">
                Asociación de Cirugía de Mendoza
              </span>{" "}
              y la{" "}
              <span className="font-semibold text-deep-blue">
                Asociación Argentina de Cirugía
              </span>
            </p>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
          {organizationGroups.map((group) => (
            <OrganizationCard key={group.key} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Organization;
