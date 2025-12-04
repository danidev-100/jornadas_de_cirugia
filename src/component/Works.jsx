import pdf from "../assets/acta.pdf";

function Works() {
  return (
    <section
      id="trabajos"
      className="text-center px-4 md:px-16 lg:px-50 space-y-6 scroll-mt-36"
    >
      <h2 className="text-3xl font-semibold text-deep-blue">
        Trabajos Científicos
      </h2>
      <p className="text-lagoon text-2xl font-bold">
        Normativas Presentación Trabajos Científicos.
        <br />
        Jornadas de otoño de Cirugía 2026
      </p>
      <p className="text-ink text-xl">
        El 31 de marzo de 2025, terminó el plazo de entrega de los trabajos
        científicos.
      </p>
      <p className="text-ink text-xl">
        Valoramos muchísimo el esfuerzo realizado, hemos recibido cantidad de
        trabajos y estamos sumamente agradecidos por haber participado.
      </p>
      <p className="text-ink text-xl">
        Nos vemos en la jornadas para continuar con los vínculos académicos que
        marcan el gran compromiso con la salud.
      </p>
      <div className="flex justify-center  my-6 ">
        <a href={pdf} download>
          <button className="flex space-x-5 bg-chocolate rounded-3xl px-6 py-3 text-white font-semibold mx-2 hover:bg-lagoon-dark transition">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
            </div>

            <h2>Normativas</h2>
          </button>
        </a>

        <a href={pdf} download>
          <button className=" flex space-x-5  bg-chocolate rounded-3xl  px-6 py-3 text-white font-semibold mx-2 hover:bg-lagoon-dark transition">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
            </div>
            <h2>Plantillas</h2>
          </button>
        </a>
      </div>
    </section>
  );
}

export default Works;
