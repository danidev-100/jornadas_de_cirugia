function Audience() {
  return (
    <section id="publico" className="scroll-mt-36">
      <div className="mx-auto grid max-w-5xl gap-10">
        <header className="grid gap-4 text-center">
          <h2 className="text-base font-semibold tracking-wide text-deep-blue md:text-lg">
            A quién está dirigido
          </h2>
          <div className="grid gap-3">
            <h3 className="mx-auto max-w-4xl text-3xl font-semibold tracking-tight text-balance text-ink md:text-5xl">
              Bienvenidos a las 27 Jornadas de Cirugía Otoño 2026 – Mendoza
            </h3>
            <h4 className="mx-auto max-w-3xl text-xl font-medium text-balance text-deep-blue md:text-2xl">
              Debates Actuales e Innovación en Cirugía
            </h4>
          </div>
        </header>

        <article className="mx-auto grid max-w-4xl gap-6 text-left md:gap-8">
          <p className="text-lg leading-8 text-chocolate text-pretty md:text-xl md:leading-9">
            <span className="font-semibold text-ink">
              Te damos la bienvenida a uno de los encuentros quirúrgicos más
              relevantes del año en la región.
            </span>{" "}
            Los días <span className="whitespace-nowrap font-semibold text-ink">7 y 8</span> de mayo de 2026, Mendoza
            será sede de las 27 Jornadas de Cirugía Otoño 2026, que se
            realizarán en el Hotel Sheraton Mendoza, organizadas por la
            Asociación de Cirugía de Mendoza (ACM) y la Asociación Argentina de
            Cirugía (AAC).
          </p>

          <p className="text-lg leading-8 text-chocolate text-pretty md:text-xl md:leading-9">
            Durante dos jornadas intensivas, convocaremos a cirujanas y
            cirujanos de Argentina y del exterior para compartir evidencia,
            experiencia y visión de futuro en un formato dinámico, centrado en
            la toma de decisiones reales: qué hacemos hoy, qué está cambiando y
            hacia dónde vamos.
          </p>

          <p className="text-lg leading-8 text-chocolate text-pretty md:text-xl md:leading-9">
            El programa integra módulos de alto impacto en cirugía
            hepatopancreatobiliar, coloproctología, pared abdominal y cirugía
            torácica, junto a espacios dedicados a cirujanos jóvenes,
            residentes y trabajos científicos, promoviendo el intercambio
            académico y el networking profesional.
          </p>

          <p className="text-xl font-semibold leading-8 text-deep-blue text-pretty md:text-2xl md:leading-9">
            Mendoza te espera con ciencia, debate y comunidad quirúrgica.
            Sumate: participá, presentá tu trabajo, actualizate y formá parte
            de una experiencia diseñada para impulsar la cirugía que viene.
          </p>
        </article>
      </div>
      {/* <p className="text-ink text-xl">
        Las Jornadas de Cirugía Otoño 2026 tienen como objetivo acercar al
        sector médico de nuestro país lo más moderno de la actividad a nivel
        internacional. Tanto en contenidos científicos, en desarrollos
        tecnológicos y en lo que a nuevos procedimientos se refiere. Estas
        Jornadas están dirigidas a Médicos, Médicos Residentes, Estudiantes de
        Medicina, Enfermeros, Instrumentistas y a todo el personal de salud
        vinculado a esta actividad en particular.
      </p> */}
    </section>
  );
}

export default Audience;
