import { CalendarIcon, MapPinIcon } from "@heroicons/react/24/outline";
import heroBackground from "../assets/bg.png";
import jornadasOverlay from "../assets/Logo.svg";

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
            alt="XXVII Jornadas de Cirugia Otoño 2026"
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
          <a
            href="https://maps.app.goo.gl/17yY9a6xShujcTrB8"
            className="flex items-center gap-2"
            target="_blank"
            rel="noreferrer"
          >
            <MapPinIcon className="size-6 text-gold" />
            <span className="text-lg">Hotel Sheraton, Mendoza</span>
          </a>
        </div>

      </div>
    </div>
  );
}
export default Hero;
