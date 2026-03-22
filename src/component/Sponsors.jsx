import megamedica from "../assets/sponsors/megamedica.svg"
import gastrotex from "../assets/sponsors/gastrotex.svg"
import bacon from "../assets/sponsors/bacon.png"
import tecnoimagen from "../assets/sponsors/tecnoimagen.jpg"
import acher from "../assets/sponsors/acher.jpeg"
import abbott from "../assets/sponsors/abbott.svg"
import coloplast from "../assets/sponsors/coloplast.svg"

const sponsorTiers = [
  {
    name: "Oro",
    sectionClassName:
      "rounded-3xl border border-amber-200 bg-radial from-amber-50 via-amber-100 to-amber-200 p-6 sm:p-8",
    gridClassName: "grid-cols-1 sm:grid-cols-2",
    itemClassName: "min-h-44",
    logoClassName: "w-full object-contain sm:h-100",
    sponsors: [
      {
        name: "Gastrotex",
        logo: gastrotex,
      },
      {
        name: "Bacon",
        logo: bacon,
      },
      {
        name: "Tecnoimagen",
        logo: tecnoimagen,
      },
      {
        name: "Megamedica",
        logo: megamedica,
      },

    ],
  },
  {
    name: "Silver",
    sectionClassName:
      "rounded-3xl border border-slate-200 bg-radial from-white via-slate-100 to-slate-300 p-6 sm:p-8",
    gridClassName: "grid-cols-2 md:grid-cols-4",
    itemClassName: "min-h-28 px-3 py-2",
    logoClassName: "h-14 w-full object-contain sm:h-16",
    sponsors: [
      {
        name: "Coloplast",
        logo: coloplast,
      },
      {
        name: "Acher",
        logo: acher,
      },
      {
        name: "Abbott",
        logo: abbott,
      },
    ],
  },
]

function SponsorCard({ sponsor, itemClassName, logoClassName, tierName }) {
  return (
    <div className={`flex w-full items-center justify-center ${itemClassName}`}>
      {sponsor.logo ? (
        <img
          alt={sponsor.name}
          src={sponsor.logo}
          className={sponsor.logoClassName ?? logoClassName}
        />
      ) : (
        <span
          className={`text-center font-semibold text-deep-blue ${
            tierName === "Oro" ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {sponsor.name}
        </span>
      )}
    </div>
  )
}

function Sponsors() {
  return (
    <section
      id="patrocinadores"
      className="scroll-mt-36 text-center"
    >
      <div className="mx-auto flex w-full flex-col items-center gap-10">
        <div className="flex max-w-3xl flex-col items-center gap-4">
          <h2 className="text-3xl font-semibold text-deep-blue">Patrocinadores</h2>
          <p className="text-xl text-ink">
            Las Jornadas de Cirugía Otoño 2026 son posibles gracias al apoyo de
            las empresas que acompañan esta edición.
          </p>
        </div>
        <div className="flex w-full flex-col gap-8">
          {sponsorTiers.map(
            ({
              name,
              sectionClassName,
              gridClassName,
              itemClassName,
              logoClassName,
              sponsors,
            }) => (
              <div key={name} className={`flex flex-col gap-5 ${sectionClassName}`}>
                <div className={`grid w-full items-stretch gap-4 ${gridClassName}`}>
                  {sponsors.map((sponsor) => (
                    <SponsorCard
                      key={sponsor.name}
                      sponsor={sponsor}
                      itemClassName={itemClassName}
                      logoClassName={logoClassName}
                      tierName={name}
                    />
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export default Sponsors
