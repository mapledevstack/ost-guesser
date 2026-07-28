import type { InferInsertModel } from "drizzle-orm"
import db from "../src/db/index.js"
import { albums, artists, trackArtists, tracks } from "../src/db/schema.js"

type NewAlbum = InferInsertModel<typeof albums>

export const createAlbum = async (overrides: Partial<NewAlbum> = {}) => {
  const album = {
    id: crypto.randomUUID(),
    title: "Test Album",
    cover: "cover.jpg",
    ...overrides,
  }

  const [createdAlbum] = await db.insert(albums).values(album).returning()

  if (!createdAlbum) {
    throw new Error("Failed to create album")
  }

  return createdAlbum
}

type NewArtist = InferInsertModel<typeof artists>

export const createArtist = async (overrides: Partial<NewArtist> = {}) => {
  const artist = {
    name: "Test Artist",
    ...overrides,
  }

  const [createdArtist] = await db.insert(artists).values(artist).returning()

  if (!createdArtist) {
    throw new Error("Failed to create artist")
  }

  return createdArtist
}

type NewTrack = InferInsertModel<typeof tracks>

export const createTrack = async (overrides: Partial<NewTrack> = {}) => {
  const track = {
    id: crypto.randomUUID(),
    title: "Test Track",
    albumId: "",
    character: null,
    ...overrides,
  }

  const [createdTrack] = await db.insert(tracks).values(track).returning()

  if (!createdTrack) {
    throw new Error("Failed to create track")
  }

  return createdTrack
}

type NewTrackArtist = InferInsertModel<typeof trackArtists>

export const createTrackArtist = async (
  overrides: Partial<NewTrackArtist> = {},
) => {
  const trackArtist: NewTrackArtist = {
    trackId: crypto.randomUUID(),
    artistId: crypto.randomUUID(),
    role: "composer",
    ...overrides,
  }

  const [createdTrackArtist] = await db
    .insert(trackArtists)
    .values(trackArtist)
    .returning()

  if (!createdTrackArtist) {
    throw new Error("Failed to create track artist")
  }

  return createdTrackArtist
}
