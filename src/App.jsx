import { useEffect, useMemo, useState } from "react";
import heroBackground from "./assets/vista-cinematografica-de-la-escena-del-hospital-con-personas-que-trabajan-en-el-sistema-de-salud.jpg";

const navigation = [
  { label: "Programa", href: "#programa" },
  { label: "Oradores", href: "#oradores" },
  { label: "Sedes", href: "#sedes" },
  { label: "Inscripcion", href: "#inscripcion" },
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
  const headline = useMemo(() => "Jornadas de Cirugia ", []);
  const [displayHeadline, setDisplayHeadline] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = headline;
    let timeout;

    if (!isDeleting && displayHeadline === current) {
      timeout = setTimeout(() => setIsDeleting(true), 1600);
    } else if (isDeleting && displayHeadline === "") {
      timeout = setTimeout(() => setIsDeleting(false), 450);
    } else {
      timeout = setTimeout(
        () => {
          const delta = isDeleting ? -1 : 1;
          const nextLength = displayHeadline.length + delta;
          setDisplayHeadline(current.slice(0, nextLength));
        },
        isDeleting ? 45 : 120
      );
    }

    return () => clearTimeout(timeout);
  }, [displayHeadline, headline, isDeleting]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(140deg,_#021E1B_0%,_#03312E_45%,_#0A7D69_70%,_#0F4C75_88%,_rgba(242,159,5,0.3)_100%)] text-white">
      <div className="pointer-events-none absolute -top-64 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[#0A7D69]/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] translate-x-1/3 translate-y-1/3 rounded-full bg-[#0F4C75]/35 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-40 left-0 h-[24rem] w-[24rem] -translate-x-1/4 rounded-full bg-[#F29F05]/25 blur-[140px]" />
      <div className="relative z-10">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#02211D]/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div className="text-lg font-semibold tracking-wide text-[#F2F2F2]">
              Jornadas de Cirugia · Argentina
            </div>
            <nav className="hidden items-center gap-6 text-sm text-[#E1F4EE] md:flex">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <button className="rounded-full bg-gradient-to-r from-[#0A7D69] via-[#0F4C75] to-[#F29F05] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#0F4C75]/30 transition hover:opacity-90">
              Entradas 2026
            </button>
          </div>
        </header>

        <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-16">
          <section
            className="relative grid gap-10 overflow-hidden rounded-3xl border border-white/10 bg-cover bg-center p-10 shadow-xl shadow-[#0A7D69]/20 lg:grid-cols-[1.2fr_1fr]"
            style={{
              backgroundImage: `linear-gradient(135deg, rgba(3,49,46,0.9), rgba(15,76,117,0.55)), url(${heroBackground})`,
            }}
          >
            <div className="space-y-7">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-[#F29F05]">
                Edicion 2026
              </span>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                <span className="block min-h-[1.2em]" aria-live="polite">
                  {displayHeadline || "\u00A0"}
                  <span
                    aria-hidden="true"
                    className="ml-1 inline-block h-7 w-[2px] translate-y-[2px] bg-[#F29F05] animate-pulse"
                  />
                </span>
                <span className="block text-2xl font-normal text-white/70 md:text-[2.15rem]"></span>
              </h1>
              <p className="text-base text-white/80">
                Dos dias de actualizacion cientifica, debates
                multidisciplinarios y experiencias inmersivas con tecnologia de
                ultima generacion en cirugia minimamente invasiva.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-gradient-to-br from-[#0A7D69]/35 via-[#0F4C75]/20 to-[#F29F05]/20 p-4 text-sm text-white/80">
                  <div className="text-[#F29F05]">Fecha</div>
                  <div className="text-lg font-semibold">7 · 8 mayo 2026</div>
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-[#0A7D69]/35 via-[#0F4C75]/20 to-[#F29F05]/20 p-4 text-sm text-white/80">
                  <div className="text-[#F29F05]">Sede</div>
                  <div className="text-lg font-semibold">
                    Centro de Convenciones Mendoza
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="flex-1 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#03312E] transition hover:bg-[#E3F2EE]">
                  Reservar lugar
                </button>
                <button className="flex-1 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40">
                  Descargar brochure
                </button>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-6">af</div>
          </section>

          <section className="space-y-10">
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-white">
                Experiencia integradora
              </h2>
              <p className="mt-3 text-white/80">
                Conferencias, demostraciones y laboratorios interactivos
                orientados a la realidad del quirofano moderno.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featureCards.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#03312E]/80 via-[#0A7D69]/40 to-[#F29F05]/20 p-6"
                >
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm text-white/80">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-10">
            <div className="text-center">
              <h2 className="text-3xl font-semibold">Visual del evento</h2>
              <p className="mt-3 text-white/80">
                Ambientaciones y stands preparados para la experiencia inmersiva
                de las jornadas.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {galleryImages.map((item) => (
                <figure
                  key={item.title}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#03312E]/80 via-[#0A7D69]/40 to-[#0F4C75]/40"
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <figcaption className="space-y-1 p-6">
                    <div className="text-sm uppercase tracking-[0.25em] text-[#F29F05]">
                      {item.title}
                    </div>
                    <p className="text-sm text-white/80">{item.description}</p>
                  </figcaption>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#021E1B]/80 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                </figure>
              ))}
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
                  Mendoza, mientras que los talleres inmersivos se desarrollan en
                  el Hospital Central.
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
