

import { Container } from "./component/Container";




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
  return (
    <div>
      <Container className="" 
  
      
      />
    
         

          <footer className=" py-8 text-center text-xs text-[#A9C8C0]">
            © 2025 Jornadas Argentinas de Cirugia · Asociacion Mendocina de
            Cirugia · Mendoza
          </footer>
      
    </div>
  );
};

export default App;
