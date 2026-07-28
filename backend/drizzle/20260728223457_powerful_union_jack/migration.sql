CREATE TYPE "artist_role" AS ENUM('composer', 'arranger', 'performer');--> statement-breakpoint
CREATE TABLE "albums" (
	"id" text PRIMARY KEY,
	"title" text NOT NULL,
	"cover" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "artists" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"name" text NOT NULL UNIQUE
);
--> statement-breakpoint
CREATE TABLE "daily_games" (
	"date" date PRIMARY KEY,
	"trackId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "track_artists" (
	"trackId" text,
	"artistId" uuid,
	"role" "artist_role",
	CONSTRAINT "track_artists_pkey" PRIMARY KEY("trackId","artistId","role")
);
--> statement-breakpoint
CREATE TABLE "tracks" (
	"id" text PRIMARY KEY,
	"albumId" text NOT NULL,
	"title" text NOT NULL,
	"character" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"googleId" text NOT NULL UNIQUE,
	"email" text NOT NULL UNIQUE,
	"displayName" text,
	"avatarUrl" text,
	"gamesPlayed" integer DEFAULT 0 NOT NULL,
	"totalScore" integer DEFAULT 0 NOT NULL,
	"currentStreak" integer DEFAULT 0 NOT NULL,
	"bestStreak" integer DEFAULT 0 NOT NULL,
	"lastPlayedDate" date,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "daily_games" ADD CONSTRAINT "daily_games_trackId_tracks_id_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id");--> statement-breakpoint
ALTER TABLE "track_artists" ADD CONSTRAINT "track_artists_trackId_tracks_id_fkey" FOREIGN KEY ("trackId") REFERENCES "tracks"("id");--> statement-breakpoint
ALTER TABLE "track_artists" ADD CONSTRAINT "track_artists_artistId_artists_id_fkey" FOREIGN KEY ("artistId") REFERENCES "artists"("id");--> statement-breakpoint
ALTER TABLE "tracks" ADD CONSTRAINT "tracks_albumId_albums_id_fkey" FOREIGN KEY ("albumId") REFERENCES "albums"("id");