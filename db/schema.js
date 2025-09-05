const {
  pgTable,
  serial,
  integer, // Usando integer ao invés de serial
  text,
  varchar,
  timestamp,
} = require("drizzle-orm/pg-core");
const { relations } = require("drizzle-orm");

const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull().unique(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const players = pgTable("players", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  // Usando integer para a chave estrangeira e configurando o onDelete
  teamId: integer("team_id").references(() => teams.id, {
    onDelete: "SET NULL",
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
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

const teamsRelations = relations(teams, ({ many }) => ({
  players: many(players),
}));

const playersRelations = relations(players, ({ one }) => ({
  team: one(teams, {
    fields: [players.teamId],
    references: [teams.id],
  }),
}));

module.exports = {
  teams,
  players,
  users, // Adiciona a nova tabela ao export
  teamsRelations,
  playersRelations,
};
