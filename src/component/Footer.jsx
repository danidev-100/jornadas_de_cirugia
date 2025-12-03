import navigation from "../data/navigation";
import logoNav from "../assets/logo-nav.png";

function Footer() {
  return (
    <div className=" text-white p-5 bg-deep-blue ">
      <div className="py-4">
        <img
          alt="Jornadas de Cirugia"
          src={logoNav}
          className=" h-9  w-auto mb-1 text-center mx-auto "
        />
      </div>
      <hr></hr>

      <div className="grid gap-1.5 text-sm text-gray-500 mt-9">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="px-7 py-2 text-white justify-center hover:text-white font-medium "
          >
            {item.name}
          </a>
        ))}
      </div>
      <div className=" grid gap-4 text-sm text-white m-7">
        <h2>Whatsapp</h2>
        <h2>Instagram</h2>
        <h2>Facebook</h2>
      </div>
    </div>
  );
}
export default Footer;
