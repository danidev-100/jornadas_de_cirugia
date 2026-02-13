import { FaWhatsapp } from "react-icons/fa";

function FixedCode() {
  return (
    <a
      href="https://wa.me/5492634365089" // Reemplaza con tu número y código de país
      className="fixed bottom-4 right-4 bg-[#25D366] hover:bg-[#128C7E] rounded-full p-3 shadow-lg z-50"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp className="w-8 h-8 text-white" />
    </a>
  );
}
export default FixedCode;
