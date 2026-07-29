CREATE TYPE "game_mode" AS ENUM('daily', 'endless');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "mode" "game_mode" NOT NULL;