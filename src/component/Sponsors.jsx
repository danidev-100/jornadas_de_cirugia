import nike from "../assets/nike.png";
import adidas from "../assets/adidas.png";
import amazon from "../assets/amazon.png";
import disney from "../assets/disney.png";
import spiderman from "../assets/spiderman.png";





function Sponsors() {
  return (
    <section id="patrocinadores" className="text-center px-4 md:px-16 lg:px-50 space-y-6 scroll-mt-36">
      <h2 className="text-3xl font-semibold text-deep-blue">Patrocinadores</h2>
      <p className="text-ink text-xl">
        Las Jornadas de Cirugía Otoño 2026 son posibles gracias al apoyo de
        las siguientes <br/>
        empresas y entidades.
      </p>
      <div>
        <img
          alt="Patrocinadores"
          src={nike}
          className="mx-auto"
        />
        <img
          alt="Patrocinadores"
          src={spiderman}
          className="mx-auto"
        />
        <img
          alt="Patrocinadores"
          src={amazon}
          className="mx-auto"
        />
        <img
          alt="Patrocinadores"
          src={disney}
          className="mx-auto"
        />
        <img
          alt="Patrocinadores"
          src={adidas}
          className="mx-auto"
        />
        <img
          alt="Patrocinadores"
          src={nike}
          className="mx-auto"
        />
      </div>
    </section>
  );
};

export default Sponsors;
