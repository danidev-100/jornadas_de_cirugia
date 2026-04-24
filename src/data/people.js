import scheduleEvents from "../../schedule_events.json";
import peopleData from "./people.json";
import {
  buildTalkCountByPersonId,
  getRankingScore,
  sortPeopleEntries,
} from "./peopleRanking.js";

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

function shouldShowInSpeakers(person, talkCount) {
  return (
    talkCount > 0 &&
    Boolean(person.image || person.job_title || person.institution)
  );
}

const talkCountByPersonId = buildTalkCountByPersonId(scheduleEvents);

const basePeopleEntries = Object.entries(peopleData).map(([id, person]) => {
  const talkCount = talkCountByPersonId.get(id) ?? 0;

  return {
    id,
    ...person,
    imageSrc: person.image ? imageByFileName[person.image] ?? null : null,
    talk_count: talkCount,
    ranking_score: getRankingScore(person, talkCount),
    showInSpeakers: shouldShowInSpeakers(person, talkCount),
  };
});

const sortedPeopleEntries = sortPeopleEntries(basePeopleEntries);

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
