import { useState } from "react";
import heroBackground from "./assets/bg.png";
import jornadasOverlay from "./assets/jornadas.png";

const navigation = [
  { label: "Inicio", href: "#inicio" },
  { label: "Objetivo", href: "#objetivos" },
  { label: "Disertantes", href: "#disertantes" },
  { label: "Trabajos cientificos", href: "#trabajos" },
  { label: "Inscripciones", href: "#inscripciones" },
  { label: "Patrocinadores", href: "#patroinadores" },
  { label: "Organizacion", href: "#organizacion" },
  { label: "Contacto", href: "#contactos" },
];

const featureCards = [
  {
    title: "Cirugia digital",
    description:
      "Simuladores, navegacion en tiempo real y IA aplicada al quirofano integradas en demostraciones en vivo.",
  },
  {
    title: "Videoendoscopia avanzada",
    description:
      "Casos de alta complejidad con enfoque en ergonomia, seguridad y resultados clinicos comparados.",
  },
  {
    title: "Formacion colaborativa",
    description:
      "Workshops hands-on con mentores internacionales y espacios de networking orientados a equipos quirurgicos.",
  },
];

const schedule = [
  {
    day: "Jueves 12/06",
    slots: [
      {
        time: "08:30",
        title: "Acreditaciones y bienvenida",
        description:
          "Presentacion institucional y tendencias globales en cirugia moderna.",
      },
      {
        time: "11:00",
        title: "Bloque laparoscopico",
        description:
          "Demostracion de procedimientos complejos con panel de expertos.",
      },
      {
        time: "14:30",
        title: "Foro de innovacion",
        description:
          "Casos clinicos con soluciones digitales aplicadas al flujo quirurgico.",
      },
    ],
  },
  {
    day: "Viernes 08/05",
    slots: [
      {
        time: "09:00",
        title: "Cirugia hepatobiliopancreatica",
        description:
          "Nuevos abordajes y criterios de seleccion multidisciplinaria.",
      },
      {
        time: "12:30",
        title: "Sesiones simultaneas",
        description:
          "Endoscopia digestiva avanzada y cuidados perioperatorios.",
      },
      {
        time: "16:00",
        title: "Cierre y networking",
        description: "Conclusiones, reconocimientos y ronda de alianzas.",
      },
    ],
  },
];

const speakers = [
  {
    name: "Dra. Marcela Ocampo",
    title: "Jefa de Cirugia General",
    institution: "Hospital Italiano de Buenos Aires",
    photo:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Dr. Leonel Paredes",
    title: "Director de Cirugia Robotica",
    institution: "Clinica Quirurgica del Plata",
    photo:
      "https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Dra. Julia Fernandez",
    title: "Especialista en Endoscopia Digestiva",
    institution: "Centro Argentino de Endoscopia",
    photo:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Dr. Tomas Villalba",
    title: "Coordinador de Innovacion Clinica",
    institution: "Universidad Nacional de Cordoba",
    photo:
      "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Dra. Laura Mendez",
    title: "Cirujana Oncologica",
    institution: "Instituto Fleming",
    photo:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=320&q=80",
  },
  {
    name: "Dr. Santiago Pini",
    title: "Profesor de Simulation Lab",
    institution: "UP Medical School",
    photo:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=320&q=80",
  },
];

const sponsors = [
  "Johnson+Johnson MedTech",
  "Medtronic",
  "BD",
  "Stryker",
  "Karl Storz",
  "Boston Scientific",
];

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=820&q=80",
    title: "Stand de tecnologia",
    description:
      "Espacios inmersivos con demostraciones en vivo de soluciones quirurgicas.",
  },
  {
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=820&q=80",
    title: "Networking clinico",
    description:
      "Conectate con equipos referentes y proveedores especializados.",
  },
  {
    src: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=820&q=80",
    title: "Simuladores avanzados",
    description:
      "Entrenamiento con tecnologias de realidad aumentada y robotica.",
  },
  {
    src: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=820&q=80",
    title: "Auditorio principal",
    description: "Transmision en alta definicion y traduccion simultanea.",
  },
];

const App = () => {
  const [activeNav, setActiveNav] = useState(navigation[0]?.href ?? "");

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#021E1B] text-white">
      <div className="relative z-10">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#1C4A66]">
          <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
            <div className="text-lg font-semibold tracking-wide text-[#F2F2F2]">
              Jornadas de Cirugia
            </div>
            <nav className="hidden items-center gap-1 rounded-full  p-1 text-sm text-[#E1F4EE] shadow-[0_12px_45px_rgba(3,49,46,0.35)] md:flex">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setActiveNav(item.href)}
                  aria-current={activeNav === item.href ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white/70 ${
                    activeNav === item.href
                      ? "bg-[#1ECAD3] text-[#012B35] shadow-[0_8px_25px_rgba(6,32,41,0.35)]"
                      : "text-[#E1F4EE]/80 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto flex max-w-[1440px] flex-col gap-2 px-6 ">
          <section
            className="relative grid min-h-[600px] gap-10 overflow-hidden border border-white/10 bg-cover bg-center p-10 pb-32 shadow-xl shadow-[#0A7D69]/20 lg:grid-cols-[1.2fr_1fr]"
            style={{
              backgroundImage: `url(${jornadasOverlay}), url(${heroBackground})`,
              backgroundSize: "25%, cover",
              backgroundRepeat: "no-repeat, no-repeat",
              backgroundPosition: "center 20%, center",
            }}
          >
            <div className="pointer-events-none absolute bottom-8 left-1/2 flex w-full max-w-xl -translate-x-1/2 flex-col items-center gap-3 text-center text-sm text-[#3F2514] sm:flex-row">
              <div className="pointer-events-auto flex-1 rounded-2xl border border-[#F3D9BD]/60 bg-[#F3D9BD]/40 px-4 py-3 backdrop-blur">
                <div className="flex items-center justify-center gap-6 text-lg font-semibold">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="stroke-current"
                  >
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="17"
                      rx="2"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M8 2.5V6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M16 2.5V6"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path d="M3 9h18" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  7 · 8 mayo 2026
                </div>
              </div>
              <div className="pointer-events-auto flex-1 rounded-2xl border border-[#F3D9BD]/60 bg-[#F3D9BD]/40 px-4 py-3 backdrop-blur">
                <div className="flex items-center justify-center gap-2 text-lg font-semibold">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="stroke-current"
                  >
                    <path
                      d="M12 3.5c-2.76 0-5 2.1-5 4.69 0 3.54 4.3 8.61 4.49 8.84.28.32.75.32 1.03 0 .19-.23 4.48-5.3 4.48-8.84C16.99 5.6 14.76 3.5 12 3.5z"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="8.2" r="1.4" strokeWidth="1.3" />
                  </svg>
                  Hotel Sheraton, Mendoza
                </div>
              </div>
            </div>
          </section>

          <section className="bg-amber-600 space-y-10">
            <div className="text-center ">
              <h2 className="text-3xl font-semibold bottom-2.5 text-white py-3">
                A quienes estan dirigidos
              </h2>
              <p className="mt-3  text-white/80">
                Las Jornadas de Cirugía Otoño 2026 tienen como objetivo acercar
                al sector médico de nuestro país lo más moderno de la actividad
                a nivel internacional. Tanto en contenidos científicos, en
                desarrollos tecnológicos y en lo que a nuevos procedimientos se
                refiere. Estas Jornadas están dirigidas a Médicos, Médicos
                Residentes, Estudiantes de Medicina, Enfermeros, Instrumentistas
                y a todo el personal de salud vinculado a esta actividad en
                particular.
              </p>
            </div>
           
          </section>

         

          <section
            id="programa"
            className="grid gap-10 lg:grid-cols-[1fr_1.1fr]"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Programa 2026</h2>
              <p className="text-white/80">
                Agenda curada por referentes nacionales con transmision en alta
                definicion y sesiones hibridas para participantes virtuales.
              </p>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#03312E]/80 via-[#0A7D69]/35 to-[#F29F05]/18 p-6 text-sm text-white/80">
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#F29F05]" />
                    Traslados oficiales y salas tematicas equipadas con torres
                    Full HD.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#F29F05]" />
                    Traduccion simultanea y acceso on-demand a contenidos
                    seleccionados.
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="inline-flex h-2 w-2 rounded-full bg-[#F29F05]" />
                    Certificacion oficial de la Asociacion Argentina de Cirugia
                    y hospitales asociados.
                  </li>
                </ul>
              </div>
            </div>
            <div className="space-y-6">
              {schedule.map((day) => (
                <div
                  key={day.day}
                  className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#03312E]/85 via-[#0A7D69]/40 to-[#0F4C75]/35 p-6"
                >
                  <div className="text-xs uppercase tracking-[0.3em] text-[#A9C8C0]">
                    {day.day}
                  </div>
                  <ul className="mt-4 space-y-4">
                    {day.slots.map((slot) => (
                      <li
                        key={slot.title}
                        className="rounded-2xl bg-gradient-to-br from-[#03312E]/85 via-[#0A7D69]/40 to-[#F29F05]/25 p-4"
                      >
                        <div className="text-sm text-[#F29F05]">
                          {slot.time}
                        </div>
                        <div className="text-base font-semibold">
                          {slot.title}
                        </div>
                        <p className="text-sm text-white/80">
                          {slot.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <section id="oradores" className="space-y-10">
            <div className="text-center">
              <h2 className="text-3xl font-semibold">Oradores principales</h2>
              <p className="mt-3 text-white/80">
                Referentes nacionales e internacionales en cirugia general,
                minimamente invasiva y gestion clinica.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {speakers.map((speaker) => (
                <article
                  key={speaker.name}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#03312E]/85 via-[#0A7D69]/35 to-[#F29F05]/20 p-6"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0A7D69]/20 via-transparent to-[#F29F05]/20 opacity-0 transition group-hover:opacity-100" />
                  <div className="relative flex items-start gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-[#03312E]/80 via-[#0A7D69]/40 to-[#0F4C75]/30 ring-2 ring-transparent transition duration-300 group-hover:border-[#F29F05]/50 group-hover:ring-[#0F4C75]/40">
                      <img
                        src={speaker.photo}
                        alt={speaker.name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{speaker.name}</h3>
                      <div className="text-sm text-[#F29F05]">
                        {speaker.title}
                      </div>
                      <p className="mt-2 text-sm text-white/80">
                        {speaker.institution}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="space-y-10" id="sedes">
            <div className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#03312E]/85 via-[#0A7D69]/35 to-[#0F4C75]/30 p-10 lg:grid-cols-[1.2fr_1fr]">
              <div className="space-y-4">
                <h2 className="text-3xl font-semibold">Sedes y actividades</h2>
                <p className="text-white/80">
                  Conferencias y live surgeries en el Centro de Convenciones
                  Mendoza, mientras que los talleres inmersivos se desarrollan
                  en el Hospital Central.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl bg-gradient-to-br from-[#03312E]/85 via-[#0A7D69]/45 to-[#F29F05]/20 p-4 text-sm text-white/80">
                    <div className="text-[#F29F05]">Centro de Convenciones</div>
                    <div className="font-semibold">Angel Bustello</div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-[#03312E]/85 via-[#0A7D69]/45 to-[#F29F05]/20 p-4 text-sm text-white/80">
                    <div className="text-[#F29F05]">Hospital Escuela</div>
                    <div className="font-semibold">
                      Gurruchaga · Ciudad Mendoza
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between gap-6">
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A7D69]/20 via-[#0F4C75]/12 to-[#F29F05]/18 p-6 text-sm text-white">
                  <p>
                    Incluye traslados programados entre sedes y credenciales
                    inteligentes con seguimiento de actividades para acreditar
                    horas.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#03312E]/85 via-[#0A7D69]/40 to-[#0F4C75]/30 p-6">
                  <h3 className="text-lg font-semibold">
                    Hospedaje recomendado
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-white/80">
                    <li>• Hotel · 4⭐ · Tarifa corporativa</li>
                    <li>• NH Mendoz City · 4⭐ · Convenio AAC</li>
                    <li>• Casa Campo · 3⭐ · Descuento residentes</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-10">
            <div className="text-center">
              <h2 className="text-3xl font-semibold">Sponsors estrategicos</h2>
              <p className="mt-3 text-white/80">
                Empresas lideres que impulsan la innovacion en soluciones
                quirurgicas.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {sponsors.map((brand) => (
                <div
                  key={brand}
                  className="rounded-full border border-white/10 bg-gradient-to-r from-[#03312E]/80 via-[#0A7D69]/40 to-[#F29F05]/25 px-6 py-3 text-sm text-white/80"
                >
                  {brand}
                </div>
              ))}
            </div>
          </section>

          <section
            id="inscripcion"
            className="grid gap-8 rounded-3xl border border-white/10 bg-gradient-to-br from-[#03312E]/85 via-[#0A7D69]/35 to-[#F29F05]/22 p-10 lg:grid-cols-[1fr_1fr]"
          >
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold">Asegura tu lugar</h2>
              <p className="text-white/80">
                Completa el formulario para recibir la propuesta academica
                completa, aranceles diferenciales y opciones de sponsoreo
                institucional.
              </p>
              <ul className="space-y-2 text-sm text-white/80">
                <li>• nombre.</li>
                <li>• Grupos hospitalarios con beneficios exclusivos.</li>
                <li>• Acceso virtual premium disponible.</li>
              </ul>
            </div>
            <form className="grid gap-4 text-sm text-[#03312E]">
              <input
                type="text"
                placeholder="Nombre completo"
                className="rounded-full border border-white/20 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-[#0F4C75] focus:outline-none focus:ring-2 focus:ring-[#0F4C75]"
              />
              <input
                type="email"
                placeholder="Correo institucional"
                className="rounded-full border border-white/20 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-[#0F4C75] focus:outline-none focus:ring-2 focus:ring-[#0F4C75]"
              />
              <input
                type="text"
                placeholder="Rol / Especialidad"
                className="rounded-full border border-white/20 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-[#0F4C75] focus:outline-none focus:ring-2 focus:ring-[#0F4C75]"
              />
              <textarea
                placeholder="Consulta o requerimiento"
                rows={4}
                className="rounded-3xl border border-white/20 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-[#0F4C75] focus:outline-none focus:ring-2 focus:ring-[#0F4C75]"
              />
              <button
                type="submit"
                className="rounded-full bg-gradient-to-r from-[#0A7D69] via-[#0F4C75] to-[#F29F05] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0F4C75]/30 transition hover:opacity-90"
              >
                Solicitar informacion
              </button>
            </form>
          </section>
        </main>

        <footer className="border-t border-white/10 bg-[#021E1B]/90 py-8 text-center text-xs text-[#A9C8C0]">
          © 2025 Jornadas Argentinas de Cirugia · Asociacion Mendocina de
          Cirugia · Mendoza
        </footer>
      </div>
    </div>
  );
};

export default App;
