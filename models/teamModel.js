const { db } = require("../db/index.js");
const { teams, players } = require("../db/schema.js");
const { eq } = require("drizzle-orm");

async function findAllTeams() {
  return await db.select().from(teams);
}

async function findTeamByIdWithPlayers(id) {
  // Buscar o time pelo id
  const team = await db.select().from(teams).where(eq(teams.id, Number(id)));

  if (!team || team.length === 0) return null;

  // Buscar todos os players desse time
  const teamPlayers = await db
    .select()
    .from(players)
    .where(eq(players.teamId, Number(id)));

  return {
    id: team[0].id,
    name: team[0].name,
    image: team[0].image,
    createdAt: team[0].createdAt,
    players: teamPlayers.map((p) => ({
      id: p.id,
      name: p.name,
      position: p.position,
      image: p.image,
      createdAt: p.createdAt,
    })),
  };
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
  findTeamByIdWithPlayers,
  createNewTeam,
  updateExistingTeam,
  deleteExistingTeam,
};
