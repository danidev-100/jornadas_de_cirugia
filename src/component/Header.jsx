const menuLinks = [
  { label: "Inicio", href: "#inicio" },
  { label: "Objetivo", href: "#objetivos" },
  { label: "Programa", href: "#programa" },
  { label: "Disertantes", href: "#disertante" },
  { label: "Trabajos cientificos", href: "#Trabajos cientificos" },
  { label: "Patrocinadores", href: "#patrocinadores" },
  { label: "Organizacion", href: "#organizacion" },
  { label: "Contacto", href: "#contacto" },
];

function Header() {
  return (
    <header className=" bg-white/90 backdrop-blur border-b ">
      <div className=" bg-titleColor flex w-full  text-amber-50 justify-between px-6 py-4">
        <a
          href="#inicio"
          className="text-lg font-semibold tracking-wide text-white "
        >
        <h1 className="">Jornadas de Cirugia</h1>
        </a>
        <nav
          aria-label="Secciones principales"
          className="md:flex items-center hidden gap-4 "
        >
          {menuLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition hover:bg-disertante"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Header;
