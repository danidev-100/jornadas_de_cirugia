import heroBackground from "../assets/bg.png";
import jornadasOverlay from "../assets/jornadas.png";

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

// const schedule = [
//   {
//     bloque: "1",
//     slots: [
//       {
//         time: "08:30 -10:00 hs.",
//         title: "MÓDULO PARED ABDOMINAL RESIDENTES",
//         description:
//           "",
//       },
//       {
//         time: "11:00",
//         title: "Bloque laparoscopico",
//         description:
//           "Demostracion de procedimientos complejos con panel de expertos.",
//       },

//     ],
//   },
//   {
//     day: "Viernes 08/05",
//     slots: [
//       {
//         time: "09:00",
//         title: "Cirugia hepatobiliopancreatica",
//         description:
//           "Nuevos abordajes y criterios de seleccion multidisciplinaria.",
//       },
//       {
//         time: "12:30",
//         title: "Sesiones simultaneas",
//         description:
//           "Endoscopia digestiva avanzada y cuidados perioperatorios.",
//       },
//       {
//         time: "16:00",
//         title: "Cierre y networking",
//         description: "Conclusiones, reconocimientos y ronda de alianzas.",
//       },
//     ],
//   },
// ];

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

function Main() {
  return (
    <div>
      <section className="relative grid min-h-[600px] gap-1 overflow-hidden  border-white/10  pb-3 shadow-xl shadow-[#0A7D69]/20 lg:grid-cols-[1.2fr_1fr]">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBackground}
            alt="Auditorio principal"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-center -z-0">
          <img
            src={jornadasOverlay}
            alt="Lema Jornadas de Cirugia"
            className="h-auto w-full max-w-[420px] sm:max-w-[520px] lg:max-w-[620px]"
            loading="lazy"
          />
        </div>
        <div className="pointer-events-none absolute bottom-8 left-1/2 flex w-full max-w-xl -translate-x-1/2 flex-col items-center gap-3 text-center text-sm text-[#3F2514] sm:flex-row">
          <div className="pointer-events-auto flex-1 rounded-2xl border border-[#F3D9BD]/60 bg-[#F3D9BD]/40 px-4 py-3 backdrop-blur">
            <div className="flex items-center justify-center gap-6 text-xl font-semibold">
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
                <path d="M8 2.5V6" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 2.5V6" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M3 9h18" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              7 · 8 mayo 2026
            </div>
          </div>
          <div className="pointer-events-auto flex-1 rounded-2xl border border-[#F3D9BD]/60 bg-[#F3D9BD]/40 px-4 py-3 backdrop-blur">
            <div className="flex items-center justify-center gap-2  font-semibold">
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
      <section id="objetivos" className="bg-disertante py-5">
        <div className="text-center ">
          <h2 className="text-3xl font-semibold bottom-2.5 text-titleColor py-3">
            A quien esta dirigido
          </h2>
          <p className=" p-3 m-3  text-black">
            Las Jornadas de Cirugía Otoño 2026 tienen como objetivo acercar al
            sector médico de nuestro país lo más moderno de la actividad a nivel
            internacional. Tanto en contenidos científicos, en desarrollos
            tecnológicos y en lo que a nuevos procedimientos se refiere. Estas
            Jornadas están dirigidas a Médicos, Médicos Residentes, Estudiantes
            de Medicina, Enfermeros, Instrumentistas y a todo el personal de
            salud vinculado a esta actividad en particular.
          </p>
        </div>
      </section>
      <section id="programa" className="flex py-7 ">
        <div className=" flex-3 space-y-4">
          <h2 className="text-3xl text-titleColor flex justify-center font-semibold">
            Programa
          </h2>
          <p className="text-black p-5 m-5">
            El programa de las Jornadas de Cirugía Otoño 2026, que se
            desarrollará en cuatro salas del Hotel Sheraton, de la ciudad de
            Mendoza. Si bien el mismo se encuentra en proceso de definiciones
            vamos adelantando los temas de algunas actividades que ya están
            definidas:
          </p>

          <div className="rounded-4xl border-2  border-tertiary p-2  ">
            <h2 className="text-2xl font-semibold text-black  ">
              Ver programa - Jueves 7 de mayo
            </h2>
          </div>

          <article>
            <h2 className="font-medium m-5">
              <strong> BLOQUE 1 </strong> | MODULO PARED ABDOMINAL RESIDENTES
              08:30 - 10:00 hs
              <hr className="m-2 border-1 border-inscripcion" />
            </h2>
            <p className="m-5">
              Cordinadores: Dr. Juan Perez · Dra. Maria Gomez
              <br />
              Comentadores: Dr. Carlos Lopez · Dra. Ana Martinez
              <br />
              <br />
              <strong>Temas y Disertantes:</strong>
              <br />
              Anatomia de la pared abdominal anterior - Dr. Luis Rodriguez
              <br />
              Hermoplasia y eventraciones - Dra. Sofia Fernandez
              <br />
              Hernioplastia laparoscopica - Dr. Diego Sanchez
              <br />
              Eventtroplastia compleja - Dra. Lucia Ramirez
              <br />
            </p>

            <h2 className="font-medium m-5">
              {" "}
              <strong> BLOQUE 2 </strong> | MODULO PARED ABDOMINAL RESIDENTES
              08:30 - 10:00 hs
              <hr className="m-2 border-1 border-inscripcion" />
            </h2>
            <p className="m-5">
              <strong>Cordinadores:</strong> Dr. Juan Perez · Dra. Maria Gomez
              <br />
              Comentadores: Dr. Carlos Lopez · Dra. Ana Martinez
              <br />
              <br />
              <strong>Temas y Disertantes:</strong>
              <br />
              Anatomia de la pared abdominal anterior - Dr. Luis Rodriguez
              <br />
              Hermoplasia y eventraciones - Dra. Sofia Fernandez
              <br />
              Hernioplastia laparoscopica - Dr. Diego Sanchez
              <br />
              Eventtroplastia compleja - Dra. Lucia Ramirez
              <br />
            </p>
          </article>
          <article>
            <div className="rounded-4xl border-2  border-tertiary p-2  ">
              <h2 className="text-2xl font-semibold text-black  ">
                Ver programa - Jueves 8 de mayo
              </h2>
            </div>
            <h2 className="font-medium m-5">
              {" "}
              <strong> BLOQUE 1 </strong> | MODULO PARED ABDOMINAL RESIDENTES
              08:30 - 10:00 hs
              <hr className="m-2 border-1 border-inscripcion" />
            </h2>
            <p className="m-5">
              Cordinadores: Dr. Juan Perez · Dra. Maria Gomez
              <br />
              Comentadores: Dr. Carlos Lopez · Dra. Ana Martinez
              <br />
              <br />
              <strong>Temas y Disertantes:</strong>
              <br />
              Anatomia de la pared abdominal anterior - Dr. Luis Rodriguez
              <br />
              Hermoplasia y eventraciones - Dra. Sofia Fernandez
              <br />
              Hernioplastia laparoscopica - Dr. Diego Sanchez
              <br />
              Eventtroplastia compleja - Dra. Lucia Ramirez
              <br />
            </p>

            <h2 className="font-medium m-5">
              {" "}
              <strong> BLOQUE 2 </strong> | MODULO PARED ABDOMINAL RESIDENTES
              08:30 - 10:00 hs
              <hr className="m-2 border-1 border-inscripcion" />
            </h2>
            <p className="m-5">
              Cordinadores: Dr. Juan Perez · Dra. Maria Gomez
              <br />
              Comentadores: Dr. Carlos Lopez · Dra. Ana Martinez
              <br />
              <br />
              <strong>Temas y Disertantes:</strong>
              <br />
              Anatomia de la pared abdominal anterior - Dr. Luis Rodriguez
              <br />
              Hermoplasia y eventraciones - Dra. Sofia Fernandez
              <br />
              Hernioplastia laparoscopica - Dr. Diego Sanchez
              <br />
              Eventtroplastia compleja - Dra. Lucia Ramirez
              <br />
            </p>
          </article>
        </div>
      </section>
      <section id="disertante" className="space-y-10 bg-titleColor py-7">
        <div>
          <h2>Disertantes</h2>
          <p>
            El programa de las Jornadas de Cirugía Otoño 2026, que se
            desarrollará en cuatro salas del Hotel Sheraton, de la ciudad de
            Mendoza. Si bien el mismo se encuentra en proceso de definiciones
            vamos adelantando los temas de algunas actividades que ya están
            definidas:
          </p>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-inscripcion">
            Disertantes Nacionales
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {speakers.map((speaker) => (
              <article key={speaker.name} className="  text-white  p-6">
                <div />
                <div className=" ">
                  <div>
                    <h3
                      className="text-2xl
                   font-semibold"
                    >
                      {speaker.name}
                    </h3>
                    <div className="text-sm text-white">{speaker.title}</div>
                    <p className="mt-2  text-white/80">{speaker.institution}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-inscripcion">
            Disertantes Internacionales
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker) => (
            <article
              key={speaker.name}
              className="group relative overflow-hidden text-white  p-6"
            >
              <div className="absolute inset-0  opacity-0 transition group-hover:opacity-100" />
              <div className="relative flex items-start gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-3xl">
                  <img
                    src={speaker.photo}
                    alt={speaker.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{speaker.name}</h3>
                  <div className=" text-white">{speaker.title}</div>
                  <p className="mt-2  text-white/80">{speaker.institution}</p>
                </div>
              </div>
            </article>
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
            Completa el formulario para recibir la propuesta academica completa,
            aranceles diferenciales y opciones de sponsoreo institucional.
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
    </div>
  );
}
export default Main;
