export function formatPrice(price) {
  const numericPrice =
    typeof price === "number"
      ? price
      : Number(String(price).replace(/[^\d.-]/g, ""));

  if (Number.isNaN(numericPrice)) {
    return `$${price}`;
  }

  return `$${new Intl.NumberFormat("es-AR").format(numericPrice)}`;
}

export function renderPriceTierLabel(label) {
  const match = String(label).match(/^(.*?)(\s*\([^)]*\))$/);

  if (!match) {
    return label;
  }

  return (
    <>
      {match[1]}{" "}
      <span className="whitespace-nowrap">{match[2].trim()}</span>
    </>
  );
}

function PriceTier({ label, price }) {
  return (
    <li className="bg-white">
      <div className="flex h-full flex-col gap-3 px-4 py-4 text-left sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-6">
        <p className="min-w-0 text-base font-semibold leading-snug text-slate-700 sm:text-lg lg:flex-1">
          {renderPriceTierLabel(label)}
        </p>
        <div className="flex items-end gap-2 lg:shrink-0">
          <span className="text-[2rem] font-bold leading-none text-orange-500 sm:text-[2.2rem] lg:text-4xl">
            {formatPrice(price)}
          </span>
          <span className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            ARS
          </span>
        </div>
      </div>
    </li>
  );
}

export default PriceTier;
