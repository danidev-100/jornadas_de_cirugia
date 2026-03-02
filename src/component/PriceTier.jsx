function formatPrice(price) {
  const numericPrice =
    typeof price === "number"
      ? price
      : Number(String(price).replace(/[^\d.-]/g, ""));

  if (Number.isNaN(numericPrice)) {
    return `$${price}`;
  }

  return `$${new Intl.NumberFormat("es-AR").format(numericPrice)}`;
}

function PriceTier({ label, price }) {
  return (
    <div className="rounded-3xl border border-slate-300 bg-white px-6 py-5 min-h-[120px] flex flex-col justify-between items-start text-left">
      <p className="text-slate-700 text-2xl font-semibold leading-tight">{label}</p>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-black text-orange-500 leading-none">
          {formatPrice(price)}
        </span>
        <span className="text-slate-500 text-base font-semibold">ARS</span>
      </div>
    </div>
  );
}

export default PriceTier;
