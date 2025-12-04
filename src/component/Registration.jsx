function Registration() {
  return (
    <section
      id="inscripciones"
      className="text-center px-4 md:px-16  lg:px-50  space-y-6 scroll-mt-36"
    >
      <div>
        <h2 className="text-4xl font-semibold text-center text-white">
          Contacto
        </h2>
      </div>
      <div className="space-y-4  redonded-lg bg-white rounded-3xl p-10 shadow-lg shadow-deep-blue/30">
        <h3 className="text-deep-blue font-bold text-2xl ">Contactanos para mas informacion</h3>
        <h3 className="text-deep-blue text-2xl p-4">Responderemos a la brevedad</h3>
        <form className="grid gap-4 text-sm text-ink  ">
          <input
            type="text"
            placeholder="Nombre completo"
            className="rounded-full border border-gray-400 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-[#0F4C75] focus:outline-none focus:ring-2 focus:ring-[#0F4C75]"
          />
          <input
            type="email"
            placeholder="Correo"
            className="rounded-full border border-gray-400 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-[#0F4C75] focus:outline-none focus:ring-2 focus:ring-[#0F4C75]"
          />
       
          <textarea
            placeholder=" Mensaje"
            rows={4}
            className="rounded-3xl border border-gray-400 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-[#0F4C75] focus:outline-none focus:ring-2 focus:ring-[#0F4C75]"
          />
          <button
            type="submit"
            className="rounded-full bg-ocean-blue w-25 text-center  px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0F4C75]/30 transition hover:opacity-90 flex  mr-4 justify-center mx-auto"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
}
export default Registration;
