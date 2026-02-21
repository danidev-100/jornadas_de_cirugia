function RegistrationCost() {
  return (
    <div id="inscripciones" className=" my-1 p-1 m-1">
      <div className="p-6">
        <h2 className="text-center text-4xl text-deep-blue font-bold py-5">
          Inscripciones
        </h2>
      </div>

      <article className="bg-chocolate rounded-2xl max-w-3xl mx-auto p-2  ">
        <h3 className="text-white text-3xl font-bold m-3 text-center p-5">
          Costos 
        </h3>
        <ul className=" m-3 text-white text-1xl  space-y-2 list-disc list-inside">
          <li>Socios (AAC-ACM): $100,000</li>
          <li>Estudiantes y Residentes: $50,000</li>
          <li>No Socios: 120.000 $</li>
          <li>Acceso Virtual Premium: $70,000</li>
          <li>Extranjeros $120.000 </li>
          <li>Residentes: $60.000 </li>
          <li>Estudiantes Medicina: $30.000 </li>
          <li>Instrumentadores/as: $70.000 </li>
          <li>Estudiantes $30.000</li>
          <li>AADI $50.000 </li>
         
        </ul>
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
    </div>
  );
}

export default RegistrationCost;
