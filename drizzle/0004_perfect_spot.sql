CREATE TABLE "ligas" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256) NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ligas_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "players" DROP CONSTRAINT "players_team_id_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "team_id" integer;--> statement-breakpoint
ALTER TABLE "players" ADD CONSTRAINT "players_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;