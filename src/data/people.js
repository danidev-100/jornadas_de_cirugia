import peopleData from "./people.json";

const peopleImages = {
  ...import.meta.glob("../assets/people/*.{png,jpg,jpeg,webp,avif,svg}", {
    eager: true,
    import: "default",
  }),
  ...import.meta.glob("../assets/people/unverified/*.{png,jpg,jpeg,webp,avif,svg}", {
    eager: true,
    import: "default",
  }),
};

const imageByFileName = Object.fromEntries(
  Object.entries(peopleImages).flatMap(([filePath, assetUrl]) => {
    const relativePath = filePath.replace("../assets/people/", "");
    const fileName = relativePath.split("/").pop();

    return [
      [relativePath, assetUrl],
      [fileName, assetUrl],
    ];
  }),
);

function getRankingScore(person) {
  return (
    (person.image ? 4 : 0) +
    (person.job_title ? 2 : 0) +
    (person.institution ? 1 : 0)
  );
}

function shouldShowInSpeakers(person) {
  return Boolean(person.image || person.job_title || person.institution);
}

function compareSubmittedAt(leftSubmittedAt, rightSubmittedAt) {
  if (!leftSubmittedAt && !rightSubmittedAt) return 0;
  if (!leftSubmittedAt) return 1;
  if (!rightSubmittedAt) return -1;

  const leftTime = Date.parse(leftSubmittedAt);
  const rightTime = Date.parse(rightSubmittedAt);

  if (Number.isNaN(leftTime) && Number.isNaN(rightTime)) return 0;
  if (Number.isNaN(leftTime)) return 1;
  if (Number.isNaN(rightTime)) return -1;

  return leftTime - rightTime;
}

const basePeopleEntries = Object.entries(peopleData).map(([id, person]) => ({
  id,
  ...person,
  imageSrc: person.image ? imageByFileName[person.image] ?? null : null,
  ranking_score: getRankingScore(person),
  showInSpeakers: shouldShowInSpeakers(person),
}));

const sortedPeopleEntries = [...basePeopleEntries]
  .sort((leftPerson, rightPerson) => {
    if (rightPerson.ranking_score !== leftPerson.ranking_score) {
      return rightPerson.ranking_score - leftPerson.ranking_score;
    }

    const submittedAtComparison = compareSubmittedAt(
      leftPerson.submitted_at,
      rightPerson.submitted_at,
    );
    if (submittedAtComparison !== 0) return submittedAtComparison;

    return leftPerson.name.localeCompare(rightPerson.name, "es");
  });

const peopleEntries = sortedPeopleEntries
  .filter((person) => person.showInSpeakers)
  .map((person, index) => ({
    ...person,
    rank: index + 1,
  }));

const peopleById = new Map(
  sortedPeopleEntries.map((person) => [person.id, person]),
);

export function getAllPeople() {
  return peopleEntries;
}

export function getPersonById(personId) {
  return peopleById.get(personId) ?? null;
}

export function getPersonAnchorId(personId) {
  return `disertante-${personId}`;
}
