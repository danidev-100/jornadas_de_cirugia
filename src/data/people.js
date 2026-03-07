import peopleData from "./people.json";

const peopleImages = import.meta.glob(
  "../assets/people/*.{png,jpg,jpeg,webp,avif,svg}",
  {
    eager: true,
    import: "default",
  },
);

const imageByFileName = Object.fromEntries(
  Object.entries(peopleImages).map(([filePath, assetUrl]) => [
    filePath.split("/").pop(),
    assetUrl,
  ]),
);

const peopleEntries = Object.entries(peopleData).map(([id, person]) => ({
  id,
  ...person,
  imageSrc: person.image ? imageByFileName[person.image] ?? null : null,
}));

const peopleById = new Map(peopleEntries.map((person) => [person.id, person]));

export function getAllPeople() {
  return peopleEntries;
}

export function getPersonById(personId) {
  return peopleById.get(personId) ?? null;
}

export function getPersonAnchorId(personId) {
  return `disertante-${personId}`;
}
