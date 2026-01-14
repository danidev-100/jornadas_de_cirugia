import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import heroBackground from "../assets/bg.png";
import jornadasOverlay from "../assets/Logo.svg";


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

function Hero() {
  return (
    <div id="inicio" className="scroll-mt-36">
      <div className="relative gap-4 grid items-center justify-center pt-10">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBackground}
            alt="Auditorio principal"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="flex justify-center items-center">
          <img
            src={jornadasOverlay}
            alt="XXVI Jornadas de Cirugia Otoño 2026"
            className="max-w-full h-auto"
            loading="lazy"
          />
        </div>
        <div className="bg-ink opacity-75 py-5 px-4 rounded-4xl text-white flex flex-col md:flex-row items-center gap-2 md:gap-6 mb-18 mx-6">
          <div className="flex gap-2 items-center">
            <CalendarIcon className="size-6 text-gold" />
            <span className="text-lg">7 y 8 de Mayo 2026</span>
          </div>
          <div className="hidden md:block text-gold">|</div>
          <a href="https://maps.app.goo.gl/17yY9a6xShujcTrB8" className="flex gap-2 items-center" target="_blank">
            <MapPinIcon className="size-6 text-gold" />
            <span className="text-lg">Hotel Sheraton, Mendoza</span>
          </a>
        </div>

      </div>
    </div>
  );
}
export default Hero;
