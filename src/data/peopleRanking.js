function incrementTalkCount(talkCountByPersonId, personId) {
  if (!personId) return;

  talkCountByPersonId.set(
    personId,
    (talkCountByPersonId.get(personId) ?? 0) + 1,
  );
}

function countReferenceList(talkCountByPersonId, references) {
  if (!Array.isArray(references)) return;

  references.forEach((reference) =>
    incrementTalkCount(talkCountByPersonId, reference?.person_id),
  );
}

function countLightningTalks(talkCountByPersonId, lightningTalks) {
  if (!Array.isArray(lightningTalks)) return;

  lightningTalks.forEach((lightningTalk) => {
    incrementTalkCount(talkCountByPersonId, lightningTalk?.person_id);
    countReferenceList(talkCountByPersonId, lightningTalk?.speakers);
    countReferenceList(talkCountByPersonId, lightningTalk?.commentators);
  });
}

export function buildTalkCountByPersonId(scheduleEvents) {
  const talkCountByPersonId = new Map();

  scheduleEvents.forEach((day) => {
    day.rooms?.forEach((room) => {
      room.events?.forEach((event) => {
        event.main_talks?.forEach((mainTalk) => {
          countReferenceList(talkCountByPersonId, mainTalk.speakers);
          countReferenceList(talkCountByPersonId, mainTalk.moderators);
          countReferenceList(talkCountByPersonId, mainTalk.commentators);
          countReferenceList(talkCountByPersonId, mainTalk.secretaries);
          countLightningTalks(talkCountByPersonId, mainTalk.lightning_talks);
        });
      });
    });
  });

  return talkCountByPersonId;
}

export function getRankingScore(person, talkCount = 0) {
  return (
    talkCount +
    (person.image ? 4 : 0) +
    (person.job_title ? 2 : 0) +
    (person.institution ? 1 : 0)
  );
}

export function compareSubmittedAt(leftSubmittedAt, rightSubmittedAt) {
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

export function sortPeopleEntries(peopleEntries) {
  return [...peopleEntries].sort((leftPerson, rightPerson) => {
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
}
