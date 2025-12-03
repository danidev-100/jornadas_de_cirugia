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
      <section className="relative grid min-h-140 gap-1 overflow-hidden lg:grid-cols-[1.2fr_1fr]">
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
            alt="XXVI Jornadas de Cirugia Otoño 2026"
            className="max-w-112 h-auto"
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
    </div>
  );
}
export default Hero;
