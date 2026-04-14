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
