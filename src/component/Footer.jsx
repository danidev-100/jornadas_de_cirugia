import { FaWhatsapp } from "react-icons/fa";
import { LuFacebook } from "react-icons/lu";
import { CiInstagram } from "react-icons/ci";

import navigation from "../data/navigation";
import logoNav from "../assets/logo-nav.png";

const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/5492634365089", // Reemplaza con tu número y código de país
  instagram:
    "https://www.instagram.com/asociacioncirugiamendoza?igsh=bHdqazEybHUxdjdw&utm_source=qr",
  facebook: "https://www.facebook.com/share/18Df2zrGEH/?mibextid=wwXIfr",
};

function Footer() {
  return (
    <section className="flex flex-col gap-10">
      <div className="py-4">
        <img
          alt="Jornadas de Cirugia"
          src={logoNav}
          className=" h-11  w-auto mb-1 text-center mx-auto "
        />
      </div>
      <hr className="border-1 border-white/50"></hr>
      <div className="flex flex-col lg:flex lg:flex-row gap-20 lg:gap-0 justify-around text-white bg-deep-blue">
        <div className="grid grid-cols-2 sm:grid-cols-3 items-center gap-10">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-base md:text-xl text-white  hover:text-white font-medium "
            >
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex flex-row flex-wrap gap-10 text-xl text-white lg:flex-col lg:justify-start">
          <div className="flex items-center gap-2">
            <a
              className="flex items-center gap-0 sm:gap-2"
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="text-lagoon  text-4xl" />
              <div className="hidden sm:block">Whatsapp</div>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              className="flex items-center gap-0 sm:gap-2"
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <CiInstagram className="text-lagoon text-4xl " />
              <div className="hidden sm:block">Instagram</div>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              className="flex items-center gap-0 sm:gap-2"
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <LuFacebook className="text-lagoon text-4xl" />
              <div className="hidden sm:block">Facebook</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Footer;
