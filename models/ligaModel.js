const { db } = require("../db/index.js");
const { ligas } = require("../db/schema.js");
const { eq } = require("drizzle-orm");

async function findAllLigas() {
  return await db.select().from(ligas);
}

async function createNewLiga(ligaData) {
  return await db.insert(ligas).values(ligaData).returning();
}

async function updateExistingLiga(id, ligaData) {
  return await db
    .update(ligas)
    .set(ligaData)
    .where(eq(ligas.id, Number(id)))
    .returning();
}

async function deleteExistingLiga(id) {
  return await db
    .delete(ligas)
    .where(eq(ligas.id, Number(id)))
    .returning();
}

module.exports = {
  findAllLigas,
  createNewLiga,
  updateExistingLiga,
  deleteExistingLiga,
};
