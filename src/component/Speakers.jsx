import speakers from "../data/speakers";

function Speakers() {
  return (
    <section id="disertantes" className="space-y-10 py-7">
      <div className="text-center px-4 md:px-16 lg:px-50 space-y-6">
        <h2 className="text-3xl font-semibold text-white">
          Disertantes
        </h2>
        <p className="text-white text-xl">
          El programa de las Jornadas de Cirugía Otoño 2026, que se desarrollará
          en cuatro salas del Hotel Sheraton, de la ciudad de Mendoza. Si bien
          el mismo se encuentra en proceso de definiciones vamos adelantando los
          temas de algunas actividades que ya están definidas:
        </p>
      </div>
      <hr className="border-1 border-white/50" />
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gold">
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
      <hr className="border-1 border-white/50" />
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gold">
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
  );
}

export default Speakers;
