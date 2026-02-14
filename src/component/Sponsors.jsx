
import megamedica from "../assets/megamedica.svg"
import abbott from "../assets/abbott.svg"
import coloplast from "../assets/coloplast.svg"





function Sponsors() {
  return (
    <section id="patrocinadores" className="text-center px-4 md:px-16  lg:px-50  space-y-6 scroll-mt-36">
      <h2 className="text-3xl font-semibold text-deep-blue">Patrocinadores</h2>
      <p className="text-ink text-xl">
        Las Jornadas de Cirugía Otoño 2026 son posibles gracias al apoyo de
        las siguientes <br/>
        empresas y entidades.
      </p>
      <div className="grid grid-cols-1 grid-rows-2 gap-9  items-center justify-items-center ">
        <img
          alt="Patrocinadores"
          src={megamedica}
          className="mx-auto w-70"
        />
        <img
          alt="Patrocinadores"
          src={coloplast}
          className="mx-auto w-70"
        />
        <img
          alt="Patrocinadores"
          src={abbott}
          className="mx-auto w-70 "
        />
      
      </div>
    </section>
  );
};

export default Sponsors;
