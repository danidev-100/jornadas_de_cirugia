import PriceTier from "./PriceTier";

const registrationPrices = [
  { label: "Socios (AAC-ACM)", price: 100000 },
  { label: "No Socios", price: 120000 },
  { label: "Extranjeros", price: 120000 },
  { label: "Residentes", price: 60000 },
  { label: "Socios AAMRCG", price: 45000 },
  { label: "Instrumentadores/as", price: 70000 },
  { label: "AADI", price: 50000 },
  { label: "Estudiantes", price: 30000 },
];

function RegistrationCost() {
  return (
    <section id="inscripciones" className="my-1 p-1 m-1 scroll-mt-36">
      <div className="max-w-5xl mx-auto px-4 py-10 text-center">
        <p className="inline-flex rounded-full bg-cloud text-lagoon font-bold text-xs md:text-sm px-4 py-1.5">
          Inscripciones abiertas
        </p>
        <h2 className="text-deep-blue font-bold text-3xl md:text-4xl leading-tight mt-4">
          Asegurá tu lugar en el evento médico más esperado del año
        </h2>
        <p className="text-slate-600 text-lg md:text-xl mt-5">
          Seleccioná la categoría que mejor se adapte a tu perfil profesional<br />
          Precios expresados en Pesos <span className="whitespace-nowrap">Argentinos (ARS)</span>
        </p>
      </div>

      <article className="bg-chocolate rounded-2xl max-w-6xl mx-auto p-4">
        <h3 className="text-white text-3xl font-bold m-3 text-center p-5">Costos</h3>
        <div className="m-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {registrationPrices.map(({ label, price }) => (
            <PriceTier key={label} label={label} price={price} />
          ))}
        </div>
        <button className="justify-center flex w-full p-8">
          <div className="flex justify-center items-center space-x-3 bg-ink rounded-full px-4 py-2 hover:bg-lagoon-dark transition cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="gold"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>

            <h1 className=" text-white text- font-semibold">Inscribirme</h1>
          </div>
        </button>
      </article>
    </section>
  );
}

export default RegistrationCost;
