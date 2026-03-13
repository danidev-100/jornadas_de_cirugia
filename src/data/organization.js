import organizationData from "./organization.json";

function normalizeMember(member, index, groupKey) {
  return {
    id: `${groupKey}-${index + 1}`,
    name: member.name,
    role: member.role ?? null,
  };
}

function normalizeGroup([groupKey, group]) {
  const members = group.members.map((member, index) =>
    normalizeMember(member, index, groupKey),
  );

  return {
    key: groupKey,
    title: group.title,
    members,
    officers: members.filter(
      (member) => member.role && member.role.toLowerCase() !== "vocal",
    ),
    vocales: members.filter(
      (member) => member.role && member.role.toLowerCase() === "vocal",
    ),
  };
}

const organizationGroups = Object.entries(organizationData).map(normalizeGroup);
const organizationGroupByKey = new Map(
  organizationGroups.map((group) => [group.key, group]),
);

export function getOrganizationGroups() {
  return organizationGroups;
}

export function getOrganizationGroup(groupKey) {
  return organizationGroupByKey.get(groupKey) ?? null;
}
