import { formatPrice, renderPriceTierLabel } from "./priceTierFormatting";

function PriceTier({ label, price }) {
  return (
    <li className="bg-white">
      <div className="flex h-full flex-col gap-3 px-4 py-4 text-left sm:px-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-6">
        <p className="min-w-0 text-base font-semibold leading-snug text-slate-700 sm:text-lg lg:flex-1">
          {renderPriceTierLabel(label)}
        </p>
        <div className="flex items-end gap-2 lg:shrink-0">
          <span className="text-3xl font-bold leading-none text-orange-500 sm:text-4xl">
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
