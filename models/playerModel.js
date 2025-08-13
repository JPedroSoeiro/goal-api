// models/playerModel.js
const { db } = require("../db/index.js");
const { players } = require("../db/schema.js");
const { eq } = require("drizzle-orm");

async function findAllPlayers() {
  return await db.select().from(players);
}

async function createNewPlayer(playerData) {
  return await db.insert(players).values(playerData).returning();
}

async function updateExistingPlayer(id, playerData) {
  return await db
    .update(players)
    .set(playerData)
    .where(eq(players.id, Number(id)))
    .returning();
}

async function deleteExistingPlayer(id) {
  return await db
    .delete(players)
    .where(eq(players.id, Number(id)))
    .returning();
}

module.exports = {
  findAllPlayers,
  createNewPlayer,
  updateExistingPlayer,
  deleteExistingPlayer,
};
