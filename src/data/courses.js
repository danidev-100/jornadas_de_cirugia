import endoscopiaProgramPdf from "../../cursos/HANDS ON-ENDOSCOPIA.pdf";
import percutaneoProgramPdf from "../../cursos/HANDS ON-PERCUTANEO.pdf";
import instructoresProgramPdf from "../../cursos/PROGRAMA-INSTRUCTORES.pdf";
import laparoscopiaProgramPdf from "../../cursos/PROGRAMA-PSQ-ACM.pdf";

const eventGoRegistrationUrl =
  "https://www.eventgo.ar/AAC/MiCuenta.dll/EXEC/2/09e54rs187huhp15g17zc0pwgjd1";
const laparoscopiaBasicoResidentesRegistrationUrl =
  "https://forms.gle/DSUVXpw4GTbXADFD9";
const laparoscopiaBasicoCirujanosRegistrationUrl =
  "https://forms.gle/XZK3C5DqtPwbiSBb8";
const laparoscopiaAvanzadoSociosRegistrationUrl =
  "https://forms.gle/hq8CaFePjVkJTNpG8";
const laparoscopiaAvanzadoNoSociosRegistrationUrl =
  "https://forms.gle/83L3NDt1u7sx2bM5A";

const courses = [
  {
    id: "hands-on-laparoscopia-basico",
    title: "Hands-on Laparoscopia Básico",
    titleLines: ["Hands-on", "Laparoscopia Básico"],
    tableInstructors: "Dr. Gonzalo Crosbie",
    modalInstructors: ["Dr. Gonzalo Crosbie"],
    seats: 12,
    remainingSeats: 4,
    summary:
      "Actividad presencial del programa PSQ enfocada en el entrenamiento práctico de habilidades laparoscópicas básicas.",
    schedule: "Jueves 07 de Mayo 2026 de 9 a 17 hs.",
    location: "Hotel Sheraton Mendoza (Sala C)",
    programHref: laparoscopiaProgramPdf,
    programUpdate: "Update: 01/04",
    detailPoints: [
      "PSQ básico 9:00 a 10:30",
      "Hernias 13:30 a 15:00",
      "Anastomosis intestinal 15:00 a 16:30",
    ],
    priceOptions: [
      {
        label: "Residentes",
        price: 100000,
        registrationHref: laparoscopiaBasicoResidentesRegistrationUrl,
        requirements: ["Presentar mini CV"],
      },
      {
        label: "Cirujano",
        price: 120000,
        registrationHref: laparoscopiaBasicoCirujanosRegistrationUrl,
      },
    ],
  },
  {
    id: "hands-on-laparoscopia-avanzado",
    title: "Hands-on Laparoscopia Avanzado",
    titleLines: ["Hands-on", "Laparoscopia Avanzado"],
    tableInstructors: "Dr. Gonzalo Crosbie",
    modalInstructors: ["Dr. Gonzalo Crosbie"],
    seats: 12,
    remainingSeats: 6,
    summary:
      "Actividad presencial del programa PSQ orientada a entrenamiento avanzado en simulación laparoscópica.",
    schedule: "Jueves 07 de Mayo 2026 de 9 a 17 hs.",
    location: "Hotel Sheraton Mendoza (Sala C)",
    programHref: laparoscopiaProgramPdf,
    programUpdate: "Update: 01/04",
    detailPoints: [
      "PSQ avanzado 10:30 a 12:00",
      "Hernias 13:30 a 15:00",
      "Anastomosis intestinal 15:00 a 16:30",
    ],
    priceOptions: [
      {
        label: "Socios",
        price: 240000,
        registrationHref: laparoscopiaAvanzadoSociosRegistrationUrl,
        requirements: [
          "Socio MAAC",
          "Presentar mini CV detallando la formación docente",
        ],
      },
      {
        label: "No socios",
        price: 320000,
        registrationHref: laparoscopiaAvanzadoNoSociosRegistrationUrl,
        requirements: ["Presentar mini CV detallando la formación docente"],
      },
    ],
  },
  {
    id: "hands-on-percutaneo",
    title: "Hands-on Percutáneo",
    tableInstructors: "Dr. Ignacio Herrero y equipo",
    modalInstructors: [
      "Dr. Ignacio Herrero",
      "Juan Pablo Córdoba",
      "Francisco Suarez Anzorena",
      "Ariel Sayegh",
      "Lelio Ciciliani",
      "Rafael Pazos",
      "Pablo Peroni",
    ],
    seats: 15,
    remainingSeats: 9,
    summary:
      "Programa federal de educación continua en intervencionismo con simulación práctica aplicada a procedimientos percutáneos.",
    schedule: "Viernes 8 de Mayo, de 09:00 a 13:00 hs",
    location: "Hospital Central. Av. Alem 430, Mendoza.",
    programHref: percutaneoProgramPdf,
    programUpdate: "Update: 14/04",
    detailPoints: [
      "Duración: 4 horas con 5 estaciones de simulación.",
      "Drenaje de colecciones",
      "Intervencionismo en vías biliares",
      "Gastrostomías",
      "Traqueostomías",
      "Coledocoscopías",
    ],
    priceOptions: [
      {
        label: "Socios/as de la AAC",
        price: 240000,
        registrationHref: eventGoRegistrationUrl,
        requirements: [],
      },
      {
        label: "Residentes socios/as",
        price: 120000,
        registrationHref: eventGoRegistrationUrl,
        requirements: ["Copia digitalizada del título de residencia"],
      },
      {
        label: "Residentes no socios/as",
        price: 180000,
        registrationHref: eventGoRegistrationUrl,
        requirements: ["Copia digitalizada del título de residencia"],
      },
      {
        label: "No socios/as",
        price: 360000,
        registrationHref: eventGoRegistrationUrl,
        requirements: [
          "Copia digitalizada del título de médico o especialista o matrícula profesional",
        ],
      },
    ],
  },
  {
    id: "hands-on-endoscopia",
    title: "Hands-on Endoscopia",
    tableInstructors: "Dr. Mauricio Ramírez, Dr. Omar Veloso y equipo",
    modalInstructors: [
      "Dr. Mauricio Ramírez",
      "Dr. Omar Veloso",
      "Dr. Adrián Cena",
      "Dra. Eliana Cilia",
      "Dr. Hernán Cordero",
    ],
    seats: 15,
    remainingSeats: 5,
    summary:
      "Entrenamiento hands-on en endoscopia digestiva para cirujanos, con práctica estructurada en habilidades diagnósticas y terapéuticas.",
    schedule: "Viernes 8 de Mayo, de 09:00 a 13:00 hs",
    location: "Hospital Central. Av. Alem 430, Mendoza.",
    programHref: endoscopiaProgramPdf,
    programUpdate: "Update: 14/04",
    detailPoints: [
      "Nivel 1: endoscopia alta y baja con familiarización anatómica y uso del canal de trabajo.",
      "Nivel 2: hemostasia, resección de lesiones y manejo de estenosis.",
      "Modalidad: rotación cada 20 minutos de pinzas y asas.",
      "Objetivos: control de sangrado, polipectomía, ligadura de várices y dilatación.",
    ],
    priceOptions: [
      {
        label: "Socios/as de la AAC",
        price: 240000,
        registrationHref: eventGoRegistrationUrl,
        requirements: [],
      },
      {
        label: "Residentes socios/as",
        price: 120000,
        registrationHref: eventGoRegistrationUrl,
        requirements: ["Copia digitalizada del título de residencia"],
      },
      {
        label: "Residentes no socios/as",
        price: 180000,
        registrationHref: eventGoRegistrationUrl,
        requirements: ["Copia digitalizada del título de residencia"],
      },
      {
        label: "No socios/as",
        price: 360000,
        registrationHref: eventGoRegistrationUrl,
        requirements: [
          "Copia digitalizada del título de médico o especialista o matrícula profesional",
        ],
      },
    ],
  },
  {
    id: "formacion-instructores-psq",
    title: "Formación de Instructores/as PSQ",
    tableInstructors: "Dr. Gonzalo Crosbie y equipo",
    modalInstructors: [
      "Dr. Gonzalo Crosbie",
      "Lic. Laura Magallan",
      "Dr. Jorge Bufaliza",
      "Dr. Mauricio Linzey",
      "Dr. Gustavo Schmidt",
      "Dr. Bartolomé Daniel",
      "Dr. José Herrera",
      "Cdte. Mariano Magariños",
    ],
    seats: 16,
    remainingSeats: 0,
    summary:
      "Formación inicial semipresencial para profesionales que deseen desempeñarse como instructores/as en simulación quirúrgica.",
    schedule: null,
    location: null,
    programHref: instructoresProgramPdf,
    programUpdate: "Update: 14/04",
    detailPoints: [
      "Modalidad semipresencial con módulos virtuales y encuentro presencial.",
      "Duración total: 20 horas entre tramos virtuales y presenciales.",
      "Requisitos: experiencia docente, experiencia en simulación laparoscópica y cumplimiento de tiempos PSQ.",
      "Incluye evaluación continua y certificación de la Asociación Argentina de Cirugía.",
    ],
    priceOptions: [
      {
        label: "Arancel general",
        price: 250000,
        registrationHref: eventGoRegistrationUrl,
      },
    ],
  },
];

export default courses;
