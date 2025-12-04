import { FaWhatsapp } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";
import { CiInstagram } from "react-icons/ci";

import navigation from "../data/navigation";
import logoNav from "../assets/logo-nav.png";

function Footer() {
  return (

    <section className="">
      <div className="py-4">
        <img
          alt="Jornadas de Cirugia"
          src={logoNav}
          className=" h-11  w-auto mb-1 text-center mx-auto "
        />
      </div>
      <hr></hr>
      <div className="flex justify-between text-white p-5 bg-deep-blue ">

      <div className="grid gap-1.5 grid-cols-3  text-sm text-gray-500 mt-9 ">
        {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className=" log: px-7 py-2 text-xl text-white justify-center hover:text-white font-medium "
          >
            {item.name}
          </a>
        ))}
      </div>
      <div className=" grid gap-4 text-xl text-white m-7">
        <div className="flex items-center gap-2">
          <FaWhatsapp className="text-lagoon  text-4xl"/>
          <h2 className="">Whatsapp</h2>
        </div>
        <div className="flex items-center gap-2">
          <CiInstagram  className="text-lagoon text-4xl "/>
          <h2>Instagram</h2>
        </div>
        <div className="flex items-center gap-2">
          <LuFacebook className="text-lagoon text-4xl"  />
          <h2>Facebook</h2>
        </div>
      </div>
    </div>
    </section>
    
  );
}
export default Footer;
