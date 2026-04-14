const baseUrl = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

function withBaseUrl(path) {
  return `${baseUrl}${path}`;
}

export const documentLinks = {
  programa: withBaseUrl("/programa"),
  reglamento: withBaseUrl("/reglamento"),
};
