import {
  CheckIcon,
  ClipboardDocumentIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import huentalaLogo from "../assets/hotels/huentala.png";
import hualtaLogo from "../assets/hotels/hualta.png";
import sheratonLogo from "../assets/hotels/sheraton.png";

const reservationCode = "CIR2026";

const hotels = [
  {
    name: "Sheraton Mendoza Hotel",
    subtitle: "Est. 1937",
    logo: sheratonLogo,
    email: "reservas.mendoza@sheraton-mendoza.com",
    phoneLabel: "+54 9 2616 62-4856",
    phoneHref: "tel:+5492616624856",
    websiteHref: "https://www.marriott.com/es/hotels/mdzsi-sheraton-mendoza-hotel/overview/",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Sheraton+Mendoza+Hotel+Primitivo+de+la+Reta+989+Mendoza+Argentina",
  },
  {
    name: "Huentala Hotel",
    subtitle: "Mendoza Argentina",
    logo: huentalaLogo,
    email: "reservas@huentala.com",
    phoneLabel: "+54 9 2617 17-4645",
    phoneHref: "tel:+5492617174645",
    websiteHref: "https://huentala.com/",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Huentala+Hotel+Primitivo+de+la+Reta+1007+Mendoza+Argentina",
  },
  {
    name: "Hualta Hotel Mendoza",
    subtitle: "Curio Collection by Hilton",
    logo: hualtaLogo,
    email: "reservas@hualtahotel.com",
    phoneLabel: "+54 9 2616 16-1922",
    phoneHref: "tel:+5492616161922",
    websiteHref: "https://www.hilton.com/es/hotels/mdzahqq-hualta-mendoza-hotel/",
    mapHref:
      "https://www.google.com/maps/search/?api=1&query=Hualta+Hotel+Primitivo+de+la+Reta+1015+Mendoza+Argentina",
  },
];

const infoLinks = {
  email: "mailto:secretaria.acmza@gmail.com",
  whatsapp: "https://wa.me/5492634365089",
  whatsappLabel: "+54 9 2634 36-5089",
};

function HotelLine({ href, icon, label, value, external = false }) {
  const Icon = icon;

  return (
    <div className="flex items-start gap-3 text-sm text-slate-700 sm:text-base">
      <Icon className="mt-0.5 size-5 shrink-0 text-lagoon" />
      <div className="flex min-w-0 flex-col gap-1">
        <span className="font-semibold text-ink">{label}</span>
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noreferrer" : undefined}
          className="break-all text-deep-blue underline underline-offset-4"
        >
          {value}
        </a>
      </div>
    </div>
  );
}

function ContactCard({ href, icon, title, detail, variant = "default" }) {
  const Icon = icon;
  const baseClassName =
    variant === "whatsapp"
      ? "border-emerald-100 bg-white text-emerald-700 hover:border-emerald-200"
      : "border-deep-blue/10 bg-white text-deep-blue hover:border-lagoon";

  return (
    <a
      href={href}
      target={variant === "whatsapp" ? "_blank" : undefined}
      rel={variant === "whatsapp" ? "noreferrer" : undefined}
      className={`flex items-start gap-4 rounded-3xl border p-4 shadow-sm transition ${baseClassName}`}
    >
      <div
        className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${
          variant === "whatsapp" ? "bg-emerald-50" : "bg-cloud"
        }`}
      >
        <Icon className="size-5" />
      </div>
      <div className="flex min-w-0 flex-col">
        <span className="text-base font-semibold">{title}</span>
        <span className="text-sm text-slate-500">{detail}</span>
      </div>
    </a>
  );
}

function HotelRow({ hotel }) {
  return (
    <article className="grid gap-5 border-b border-slate-200 pb-8 last:border-b-0 last:pb-0 md:grid-cols-3 md:items-center">
      <div className="flex items-center gap-4 md:hidden">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white p-4">
          <img
            src={hotel.logo}
            alt={`Logo de ${hotel.name}`}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="text-2xl font-semibold text-ink">{hotel.name}</h3>
          <p className="text-sm font-medium uppercase tracking-wide text-lagoon">
            {hotel.subtitle}
          </p>
        </div>
      </div>

      <div className="hidden items-center justify-center rounded-3xl border border-slate-200 bg-white p-4 aspect-square md:flex">
        <img
          src={hotel.logo}
          alt={`Logo de ${hotel.name}`}
          className="h-32 w-full object-contain"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col gap-4 md:col-span-2">
        <div className="hidden flex-col gap-1 md:flex">
          <h3 className="text-2xl font-semibold text-ink">{hotel.name}</h3>
          <p className="text-sm font-medium uppercase tracking-wide text-lagoon">
            {hotel.subtitle}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <HotelLine
            href={`mailto:${hotel.email}`}
            icon={EnvelopeIcon}
            label="Correo de reservas"
            value={hotel.email}
          />
          <HotelLine
            href={hotel.phoneHref}
            icon={PhoneIcon}
            label="Teléfono"
            value={hotel.phoneLabel}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm font-semibold sm:text-base">
          <a
            href={hotel.websiteHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-deep-blue underline underline-offset-4"
          >
            <GlobeAltIcon className="size-5 text-lagoon" />
            <span>Web</span>
          </a>
          <a
            href={hotel.mapHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-deep-blue underline underline-offset-4"
          >
            <MapPinIcon className="size-5 text-lagoon" />
            <span>Maps</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function Accommodation() {
  const [copyState, setCopyState] = useState("idle");

  useEffect(() => {
    if (copyState === "idle") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setCopyState("idle");
    }, 2500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [copyState]);

  async function handleCopyCode() {
    if (!navigator.clipboard?.writeText) {
      setCopyState("error");
      return;
    }

    try {
      await navigator.clipboard.writeText(reservationCode);
      setCopyState("success");
    } catch {
      setCopyState("error");
    }
  }

  const copyFeedback =
    copyState === "success"
      ? "Código copiado."
      : copyState === "error"
        ? "Copiá el código manualmente."
        : "Mencioná este código al reservar.";

  return (
    <section id="hospedaje" className="scroll-mt-36 py-6">
      <div className="mx-auto flex flex-col gap-10">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex max-w-4xl flex-col gap-4">
            <h2 className="text-3xl font-bold text-deep-blue sm:text-4xl">
              Hospedaje
            </h2>
            <p className="text-lg leading-relaxed text-slate-700 sm:text-xl">
              Reservá en los hoteles con convenio y mencioná el código{" "}
              <span className="font-semibold text-deep-blue">
                {reservationCode}
              </span>{" "}
              para acceder a tarifas preferenciales durante las Jornadas de
              Cirugía Otoño 2026 en Mendoza.
            </p>
          </div>
        </div>

        <div className="grid gap-10 xl:grid-cols-3">
          <div className="flex flex-col gap-8 xl:col-span-2">
            {hotels.map((hotel) => (
              <HotelRow key={hotel.name} hotel={hotel} />
            ))}
          </div>

          <aside className="flex flex-col gap-8 xl:border-l xl:border-slate-200 xl:pl-8">
            <div className="flex flex-col gap-4">
              <span className="text-sm font-semibold uppercase tracking-wide text-lagoon">
                Más información
              </span>
              <h3 className="text-2xl font-semibold text-deep-blue">
                Código de reserva
              </h3>
              <p className="text-base leading-relaxed text-slate-600">
                Compartilo al gestionar tu estadía para que el hotel aplique la
                tarifa especial del convenio.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-4xl font-black tracking-widest text-deep-blue">
                  {reservationCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-deep-blue/15 bg-white px-4 py-2 text-sm font-semibold text-deep-blue transition hover:border-lagoon"
                >
                  {copyState === "success" ? (
                    <CheckIcon className="size-5" />
                  ) : (
                    <ClipboardDocumentIcon className="size-5" />
                  )}
                  <span>{copyState === "success" ? "Copiado" : "Copiar"}</span>
                </button>
              </div>
              <p aria-live="polite" className="text-sm text-slate-500">
                {copyFeedback}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold text-deep-blue">
                  Consultas sobre reservas e inscripciones
                </h3>
                <p className="text-base leading-relaxed text-slate-600">
                  Si necesitás ayuda con tu estadía o con el proceso de
                  inscripción, escribinos y te ayudamos a resolverlo.
                </p>
              </div>

              <ContactCard
                href={infoLinks.email}
                icon={EnvelopeIcon}
                title="Consultas por email"
                detail="Secretaría ACM"
              />
              <ContactCard
                href={infoLinks.whatsapp}
                icon={FaWhatsapp}
                title="Consultas por WhatsApp"
                detail={infoLinks.whatsappLabel}
                variant="whatsapp"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Accommodation;
