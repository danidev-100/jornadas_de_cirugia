const FLAG_BY_NATIONALITY = {
  España: "🇪🇸",
  Portugal: "🇵🇹",
};

function NationalityFlag({ nationality, className = "text-sm leading-none" }) {
  const flag = FLAG_BY_NATIONALITY[nationality];

  if (!flag) return null;

  return (
    <span
      aria-label={`Nacionalidad: ${nationality}`}
      title={nationality}
      className={className}
    >
      {flag}
    </span>
  );
}

export default NationalityFlag;
