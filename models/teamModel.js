const { db } = require("../db/index.js");
const { teams, players } = require("../db/schema.js"); // Importe 'players' também
const { eq } = require("drizzle-orm");

// NOVA FUNÇÃO: Adicione esta função para buscar um time com seus jogadores
async function findTeamByIdWithPlayers(id) {
  // O Drizzle vai automaticamente buscar o time e a relação 'players' que definimos no schema
  return await db.query.teams.findFirst({
    where: eq(teams.id, Number(id)),
    with: {
      players: true, // Isso informa ao Drizzle para incluir os jogadores relacionados
    },
  });
}

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
  findTeamByIdWithPlayers, // Não esqueça de exportar a nova função
};
