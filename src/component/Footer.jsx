import { FaWhatsapp } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";
import { CiInstagram } from "react-icons/ci";

import navigation from "../data/navigation";
import logoNav from "../assets/logo-nav.png";

const SOCIAL_LINKS = {
  whatsapp: "#",
  instagram:
    "https://www.instagram.com/asociacioncirugiamendoza?igsh=bHdqazEybHUxdjdw&utm_source=qr",
  facebook: "https://www.facebook.com/share/18Df2zrGEH/?mibextid=wwXIfr",
};

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
            <a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-lagoon  text-4xl" />
            </a>
            <h2 className="">Whatsapp</h2>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <CiInstagram className="text-lagoon text-4xl " />
            </a>
            <h2>Instagram</h2>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <LuFacebook className="text-lagoon text-4xl" />
              
            </a>
            <h2>Facebook</h2>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Footer;
