ALTER TABLE "ligas" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "ligas" CASCADE;--> statement-breakpoint
ALTER TABLE "players" ALTER COLUMN "team_id" SET NOT NULL;