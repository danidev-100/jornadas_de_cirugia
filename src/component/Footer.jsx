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
      <hr className="border-1 border-white/50"></hr>
      <div className="lg:flex justify-around m-7 text-white p-5 bg-deep-blue ">
        <div className="lg:grid grid-cols-3 flex flex-col items-cent m-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className=" px-7 py-4 text-xl text-white  hover:text-white font-medium "
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className=" grid gap-5 text-xl text-white m-7">
          <div className="flex items-center gap-2">
            <FaWhatsapp className="text-lagoon  text-4xl" />
            <h2 className="">Whatsapp</h2>
          </div>
          <div className="flex items-center gap-2">
            <CiInstagram className="text-lagoon text-4xl " />
            <h2>Instagram</h2>
          </div>
          <div className="flex items-center gap-2">
            <LuFacebook className="text-lagoon text-4xl" />
            <h2>Facebook</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Footer;
