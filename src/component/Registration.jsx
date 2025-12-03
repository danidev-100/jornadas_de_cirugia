function Registration() {
  return (
    <section
      id="inscripciones"
      className="grid gap-8  p-10 lg:grid-cols-[1fr_1fr]"
    >
      <div className="space-y-4">
        <h2 className="text-3xl font-semibold">Asegura tu lugar</h2>
        <p className="text-white/80">
          Completa el formulario para recibir la propuesta academica completa,
          aranceles diferenciales y opciones de sponsoreo institucional.
        </p>
        <ul className="space-y-2 text-sm text-white/80">
          <li>• nombre.</li>
          <li>• Grupos hospitalarios con beneficios exclusivos.</li>
          <li>• Acceso virtual premium disponible.</li>
        </ul>
      </div>
      <form className="grid gap-4 text-sm text-[#03312E]">
        <input
          type="text"
          placeholder="Nombre completo"
          className="rounded-full border border-white/20 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-[#0F4C75] focus:outline-none focus:ring-2 focus:ring-[#0F4C75]"
        />
        <input
          type="email"
          placeholder="Correo institucional"
          className="rounded-full border border-white/20 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-[#0F4C75] focus:outline-none focus:ring-2 focus:ring-[#0F4C75]"
        />
        <input
          type="text"
          placeholder="Rol / Especialidad"
          className="rounded-full border border-white/20 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-[#0F4C75] focus:outline-none focus:ring-2 focus:ring-[#0F4C75]"
        />
        <textarea
          placeholder="Consulta o requerimiento"
          rows={4}
          className="rounded-3xl border border-white/20 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-[#0F4C75] focus:outline-none focus:ring-2 focus:ring-[#0F4C75]"
        />
        <button
          type="submit"
          className="rounded-full bg-gradient-to-r from-[#0A7D69] via-[#0F4C75] to-[#F29F05] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#0F4C75]/30 transition hover:opacity-90"
        >
          Solicitar informacion
        </button>
      </form>
    </section>
  );
}
export default Registration;
