// goal-api/db/schema.js
const {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  integer,
} = require("drizzle-orm/pg-core");
const { relations } = require("drizzle-orm");

const ligas = pgTable("ligas", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  image: text("image"),
  ligaId: integer("liga_id").references(() => ligas.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  // CORREÇÃO: Removido o .notNull()
  teamId: integer("team_id").references(() => teams.id, {
    onDelete: "set null",
  }),
  position: varchar("position", { length: 256 }),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: text("password").notNull(),
  teamId: integer("team_id").references(() => teams.id, {
    onDelete: "set null",
  }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const ligasRelations = relations(ligas, ({ many }) => ({
  teams: many(teams),
}));

const teamsRelations = relations(teams, ({ many, one }) => ({
  players: many(players),
  liga: one(ligas, {
    fields: [teams.ligaId],
    references: [ligas.id],
  }),
}));

const playersRelations = relations(players, ({ one }) => ({
  team: one(teams, {
    fields: [players.teamId],
    references: [teams.id],
  }),
}));

const usersRelations = relations(users, ({ one }) => ({
  team: one(teams, {
    fields: [users.teamId],
    references: [teams.id],
  }),
}));

module.exports = {
  ligas,
  teams,
  players,
  users,
  ligasRelations,
  teamsRelations,
  playersRelations,
  usersRelations,
};
