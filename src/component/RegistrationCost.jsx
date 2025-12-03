function RegistrationCost() {
  return (
    <div className=" my-1 p-4 m-4">
      <div>
        <h2 className="text-center text-2xl text-deep-blue font-bold py-5">
          Inscripciones
        </h2>
      </div>

      <article className="bg-chocolate rounded-2xl max-w-3xl mx-auto p-5 space-y-4 ">
        <h3 className="text-white text-1xl font-bold">
          Costos de abonados antes del 10 de febrero del 2026
        </h3>
        <ul className="list-disc list-inside text-white text-sm space-y-2">
          <li>Profesionales: $100,000</li>
          <li>Estudiantes y Residentes: $50,000</li>
          <li>Acceso Virtual Premium: $70,000</li>
          <li>Acceso Virtual Premium: $70,000</li>
          <li>Acceso Virtual Premium: $70,000</li>
          <li>Acceso Virtual Premium: $70,000</li>
          <li>Acceso Virtual Premium: $70,000</li>
          <li>Acceso Virtual Premium: $70,000</li>
          <li>Acceso Virtual Premium: $70,000</li>
          <li>Acceso Virtual Premium: $70,000</li>
          <li>Acceso Virtual Premium: $70,000</li>
        </ul>
        <button className="justify-center flex w-full">
          <div className="flex justify-center items-center space-x-3 bg-ink rounded-full px-4 py-2 hover:bg-lagoon-dark transition cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="gold"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>

            <h1 className=" text-white text- font-semibold">Inscribite aqui</h1>
          </div>
        </button>
      </article>
    </div>
  );
}

export default RegistrationCost;
