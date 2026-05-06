import aadi from "../assets/sponsors/acompanan/AADI.svg"
import hospitalCentral from "../assets/sponsors/acompanan/HOSPITAL-CENTRAL.svg"
import allMedical from "../assets/sponsors/gold/Logo All Medical.svg"
import bacon from "../assets/sponsors/gold/Bacon.png"
import gastrotex from "../assets/sponsors/gold/Gastrotex.svg"
import johnson from "../assets/sponsors/gold/JNJ_Logo_SingleLine_Red_RGB.svg"
import megamedica from "../assets/sponsors/gold/MEGAMEDICA-LOGO.svg"
import pamArgentina from "../assets/sponsors/gold/pam.png"
import qadvice from "../assets/sponsors/gold/QADVICE.svg"
import tecnoimagen from "../assets/sponsors/gold/Tecnoimagen.svg"
import abbott from "../assets/sponsors/silver/Abbott_Laboratories_logo.svg"
import acher from "../assets/sponsors/silver/acher-seeklogo.svg"
import biofarma from "../assets/sponsors/silver/Logo_Horizontal biofarma.svg"
import coloplast from "../assets/sponsors/silver/COLOPLAST_Logo.svg"
import susanaSalerno from "../assets/sponsors/silver/susana-salerno.png"
import tektronik from "../assets/sponsors/silver/tektronik-LOGO.png"

const sponsorTiers = [
  {
    name: "Gold",
    labelClassName: "text-gold",
    dividerClassName: "bg-gold/60",
    gridClassName: "grid-cols-2 lg:grid-cols-4",
    itemClassName: "h-32 sm:h-36",
    logoClassName: "h-full w-full object-contain",
    sponsors: [
      {
        name: "All Medical",
        logo: allMedical,
      },
      {
        name: "Bacon",
        logo: bacon,
      },
      {
        name: "Bio Omega de Grupo Gastrotex",
        logo: gastrotex,
      },
      {
        name: "Johnson & Johnson",
        logo: johnson,
      },
      {
        name: "Megamedica",
        logo: megamedica,
      },
      {
        name: "PAM Argentina",
        logo: pamArgentina,
      },
      {
        name: "Qadvice",
        logo: qadvice,
      },
      {
        name: "Tecnoimagen",
        logo: tecnoimagen,
      },
    ],
  },
  {
    name: "Silver",
    labelClassName: "text-slate-500",
    dividerClassName: "bg-slate-200",
    gridClassName: "grid-cols-3 lg:grid-cols-6",
    itemClassName: "h-24 sm:h-28",
    logoClassName: "h-full w-full object-contain",
    sponsors: [
      {
        name: "Abbott",
        logo: abbott,
      },
      {
        name: "Acher",
        logo: acher,
      },
      {
        name: "Biofarma",
        logo: biofarma,
      },
      {
        name: "Coloplast",
        logo: coloplast,
      },
      {
        name: "Susana Salerno & Asociados",
        logo: susanaSalerno,
      },
      {
        name: "Tektronik",
        logo: tektronik,
      },
    ],
  },
  {
    name: "Nos acompaña",
    labelClassName: "text-deep-blue",
    dividerClassName: "bg-slate-200",
    gridClassName: "grid-cols-3 md:grid-cols-4 lg:grid-cols-8",
    itemClassName: "h-20 sm:h-24",
    logoClassName: "h-full w-full object-contain",
    sponsors: [
      {
        name: "AADI Filial Mendoza",
        logo: aadi,
      },
      {
        name: "Hospital Central de Mendoza",
        logo: hospitalCentral,
      },
    ],
  },
]

function SponsorLogo({ sponsor, itemClassName, logoClassName }) {
  return (
    <div className={`flex items-center justify-center overflow-hidden ${itemClassName}`}>
      <img
        alt={sponsor.name}
        src={sponsor.logo}
        className={sponsor.logoClassName ?? logoClassName}
      />
    </div>
  )
}

function Sponsors() {
  return (
    <section id="patrocinadores" className="scroll-mt-36 text-center">
      <div className="mx-auto flex w-full flex-col items-center gap-10">
        <div className="flex max-w-3xl flex-col items-center gap-4">
          <h2 className="text-3xl font-semibold text-deep-blue">Sponsors</h2>
          <p className="text-xl text-ink">
            Las Jornadas de Cirugía Otoño 2026 son posibles gracias al apoyo de
            las empresas que acompañan esta edición.
          </p>
        </div>

        <div className="flex w-full flex-col gap-9">
          {sponsorTiers.map(
            ({
              name,
              labelClassName,
              dividerClassName,
              gridClassName,
              itemClassName,
              logoClassName,
              sponsors,
            }) => (
              <section key={name} className="flex flex-col gap-5">
                <div aria-hidden="true" className={`h-px w-full ${dividerClassName}`} />
                <h3
                  className={`text-left text-sm font-black uppercase tracking-widest ${labelClassName}`}
                >
                  {name}
                </h3>
                <div className={`grid w-full items-center gap-x-6 gap-y-6 ${gridClassName}`}>
                  {sponsors.map((sponsor) => (
                    <SponsorLogo
                      key={sponsor.name}
                      sponsor={sponsor}
                      itemClassName={itemClassName}
                      logoClassName={logoClassName}
                    />
                  ))}
                </div>
              </section>
            ),
          )}
        </div>
      </div>
    </section>
  )
}

export default Sponsors
