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
  ligaId: integer("liga_id").references(() => ligas.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: text("password").notNull(),
  // ADICIONE A COLUNA teamId AQUI
  teamId: integer("team_id").references(() => teams.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  teamId: integer("team_id").references(() => teams.id),
  position: varchar("position", { length: 256 }),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const ligasRelations = relations(ligas, ({ many }) => ({
  teams: many(teams),
}));

const teamsRelations = relations(teams, ({ one, many }) => ({
  liga: one(ligas, {
    fields: [teams.ligaId],
    references: [ligas.id],
  }),
  players: many(players),
}));

// ADICIONE A RELAÇÃO PARA USERS
const usersRelations = relations(users, ({ one }) => ({
  team: one(teams, {
    fields: [users.teamId],
    references: [teams.id],
  }),
}));

const playersRelations = relations(players, ({ one }) => ({
  team: one(teams, {
    fields: [players.teamId],
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
  usersRelations, // Não esqueça de exportar
  playersRelations,
};
