const { db } = require("../db/index.js");
const { teams, players } = require("../db/schema.js");
const { eq } = require("drizzle-orm");

async function findAllTeams() {
  return await db.select().from(teams);
}

async function findTeamByIdWithPlayers(id) {
  const rows = await db
    .select({
      teamId: teams.id,
      teamName: teams.name,
      teamImage: teams.image,
      teamCreatedAt: teams.createdAt,
      playerId: players.id,
      playerName: players.name,
      playerPosition: players.position,
      playerImage: players.image,
      playerCreatedAt: players.createdAt,
    })
    .from(teams)
    .leftJoin(players, eq(players.teamId, teams.id))
    .where(eq(teams.id, id));

  if (rows.length === 0) return null;

  // Agrupa os jogadores
  const team = {
    id: rows[0].teamId,
    name: rows[0].teamName,
    image: rows[0].teamImage,
    createdAt: rows[0].teamCreatedAt,
    players: rows
      .filter((r) => r.playerId) // pode ter time sem jogadores
      .map((r) => ({
        id: r.playerId,
        name: r.playerName,
        position: r.playerPosition,
        image: r.playerImage,
        createdAt: r.playerCreatedAt,
      })),
  };

  return team;
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
