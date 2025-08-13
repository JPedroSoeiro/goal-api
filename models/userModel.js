const { db } = require("../db/index.js");
const { users } = require("../db/schema.js");
const { eq } = require("drizzle-orm");

async function findAllUsers() {
  return await db.select().from(users);
}

async function findUserByEmail(email) {
  return await db.select().from(users).where(eq(users.email, email));
}

async function createNewUser(userData) {
  return await db.insert(users).values(userData).returning();
}

async function updateExistingUser(id, userData) {
  return await db
    .update(users)
    .set(userData)
    .where(eq(users.id, Number(id)))
    .returning();
}

async function deleteExistingUser(id) {
  return await db
    .delete(users)
    .where(eq(users.id, Number(id)))
    .returning();
}

module.exports = {
  findAllUsers,
  findUserByEmail,
  createNewUser,
  updateExistingUser,
  deleteExistingUser,
};
