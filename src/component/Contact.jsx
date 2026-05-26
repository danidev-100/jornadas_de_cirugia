import { useState } from "react";

const DEFAULT_FORM_ENDPOINT = "https://formcarry.com/s/mIYz8WRKi1T";
const FORM_ENDPOINT =
  import.meta.env.VITE_FORMCARRY_ENDPOINT?.trim() || DEFAULT_FORM_ENDPOINT;

const INITIAL_VALUES = {
  name: "",
  email: "",
  message: "",
  company: "",
};

function validateForm(values) {
  const errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Ingresá tu nombre completo.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Ingresá un correo válido.";
  }

  const messageLength = values.message.trim().length;

  if (messageLength < 20) {
    errors.message = "El mensaje debe tener al menos 20 caracteres.";
  }

  if (messageLength > 2000) {
    errors.message = "El mensaje no puede superar los 2000 caracteres.";
  }

  return errors;
}

function Contact() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[name]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[name];
      return nextErrors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus("error");
      setFeedback("Revisá los campos marcados antes de enviar.");
      return;
    }

    if (values.company.trim()) {
      setStatus("success");
      setFeedback("Gracias. Recibimos tu mensaje.");
      setValues(INITIAL_VALUES);
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          company: values.company.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Formcarry request failed");
      }

      setStatus("success");
      setFeedback("Gracias. Recibimos tu mensaje y responderemos a la brevedad.");
      setValues(INITIAL_VALUES);
      setErrors({});
    } catch {
      setStatus("error");
      setFeedback("No pudimos enviar el mensaje. Probá nuevamente en unos minutos.");
    }
  };

  const isSubmitting = status === "submitting";

  return (
    <section
      id="contacto"
      className="scroll-mt-36 px-4 text-center md:px-16 lg:px-48"
    >
      <div className="grid gap-6">
        <h2 className="text-center text-4xl font-semibold text-white">
          Contacto
        </h2>

        <div className="grid gap-4 rounded-3xl bg-white px-6 py-10 shadow-lg shadow-deep-blue/30 md:px-10">
          <div className="grid gap-3">
            <h3 className="text-2xl font-bold text-deep-blue">
              Contáctanos para más información
            </h3>
            <p className="text-2xl text-deep-blue">
              Responderemos a la brevedad
            </p>
          </div>

          <form className="grid gap-4 text-left text-sm text-ink" onSubmit={handleSubmit} noValidate>
            <label className="grid gap-2">
              <span className="sr-only">Nombre completo</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Nombre completo"
                value={values.name}
                onChange={handleChange}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-name-error" : undefined}
                className="rounded-full border border-gray-400 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-ocean-blue focus:outline-none focus:ring-2 focus:ring-ocean-blue"
              />
              {errors.name ? (
                <span id="contact-name-error" className="text-sm text-red-700">
                  {errors.name}
                </span>
              ) : null}
            </label>

            <label className="grid gap-2">
              <span className="sr-only">Correo</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Correo"
                value={values.email}
                onChange={handleChange}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-email-error" : undefined}
                className="rounded-full border border-gray-400 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-ocean-blue focus:outline-none focus:ring-2 focus:ring-ocean-blue"
              />
              {errors.email ? (
                <span id="contact-email-error" className="text-sm text-red-700">
                  {errors.email}
                </span>
              ) : null}
            </label>

            <div className="hidden" aria-hidden="true">
              <label className="grid gap-2">
                <span>Empresa</span>
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values.company}
                  onChange={handleChange}
                />
              </label>
            </div>

            <label className="grid gap-2">
              <span className="sr-only">Mensaje</span>
              <textarea
                name="message"
                placeholder="Mensaje"
                rows={4}
                value={values.message}
                onChange={handleChange}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className="rounded-3xl border border-gray-400 bg-white/90 px-5 py-3 placeholder:text-slate-500 focus:border-ocean-blue focus:outline-none focus:ring-2 focus:ring-ocean-blue"
              />
              {errors.message ? (
                <span id="contact-message-error" className="text-sm text-red-700">
                  {errors.message}
                </span>
              ) : null}
            </label>

            <div className="grid justify-items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex min-w-28 justify-center rounded-full bg-ocean-blue px-6 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-ocean-blue/30 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? "Enviando..." : "Enviar"}
              </button>

              {feedback ? (
                <p
                  className={status === "success" ? "text-center text-sm text-green-700" : "text-center text-sm text-red-700"}
                  role={status === "error" ? "alert" : "status"}
                >
                  {feedback}
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
