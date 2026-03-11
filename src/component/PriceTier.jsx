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
    <div className="flex min-h-[132px] flex-col justify-between gap-4 rounded-3xl border border-slate-300 bg-white px-5 py-5 text-left shadow-sm sm:min-h-[148px] sm:px-6">
      <p className="text-2xl font-semibold leading-tight text-slate-700 sm:text-3xl">
        {label}
      </p>
      <div className="flex items-end gap-2">
        <span className="text-4xl font-black leading-none text-orange-500 sm:text-5xl">
          {formatPrice(price)}
        </span>
        <span className="text-slate-500 text-base font-semibold">ARS</span>
      </div>
    </div>
  );
}

export default PriceTier;
