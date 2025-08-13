const { db } = require("../db/index.js");
const { teams } = require("../db/schema.js");
const { eq } = require("drizzle-orm");

async function findAllTeams() {
  return await db.select().from(teams);
}

async function createNewTeam(teamData) {
  return await db.insert(teams).values(teamData).returning();
}

async function updateExistingTeam(id, teamData) {
  return await db
    .update(teams)
    .set(teamData)
    .where(eq(teams.id, Number(id)))
    .returning();
}

async function deleteExistingTeam(id) {
  return await db
    .delete(teams)
    .where(eq(teams.id, Number(id)))
    .returning();
}

module.exports = {
  findAllTeams,
  createNewTeam,
  updateExistingTeam,
  deleteExistingTeam,
};
