import megamedica from "../assets/sponsors/megamedica.svg"
import abbott from "../assets/sponsors/abbott.svg"
import coloplast from "../assets/sponsors/coloplast.svg"
import hospitalCentralMendoza from "../assets/sponsors/hospital-central-mendoza.jpg"

const sponsors = [
  {
    name: "Megamedica",
    logo: megamedica,
    className: "h-20 w-auto object-contain",
  },
  {
    name: "Coloplast",
    logo: coloplast,
    className: "h-20 w-auto object-contain",
  },
  {
    name: "Abbott",
    logo: abbott,
    className: "h-20 w-auto object-contain",
  },
  {
    name: "Hospital Central de Mendoza",
    logo: hospitalCentralMendoza,
    className: "h-28 w-28 object-contain",
  },
]

function Sponsors() {
  return (
    <section
      id="patrocinadores"
      className="scroll-mt-36 px-4 text-center md:px-16 lg:px-24"
    >
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-3xl font-semibold text-deep-blue">Patrocinadores</h2>
        <p className="text-xl text-ink">
          Las Jornadas de Cirugía Otoño 2026 son posibles gracias al apoyo de
          las siguientes <br />
          empresas y entidades
        </p>
        <div className="grid w-full max-w-6xl grid-cols-1 items-center justify-items-center gap-9 sm:grid-cols-2 xl:grid-cols-4">
          {sponsors.map(({ name, logo, className }) => (
            <div key={name} className="flex h-28 w-full items-center justify-center">
              <img alt={name} src={logo} className={className} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Sponsors
