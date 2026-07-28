import { describe, expect, it } from "vitest"
import request from "supertest"
import app from "../src/app.js"
import {
  createAlbum,
  createArtist,
  createTrack,
  createTrackArtist,
} from "./factories.js"
import { NOT_FOUND, OK } from "../src/constants/http.js"

describe("GET /tracks/:trackId", () => {
  it("returns a track", async () => {
    const album = await createAlbum()
    const track = await createTrack({ albumId: album.id })
    const artist = await createArtist()
    await createTrackArtist({
      trackId: track.id,
      artistId: artist.id,
    })

    const res = await request(app).get(`/api/v1/tracks/${track.id}`)

    expect(res.status).toBe(OK)
    expect(res.body).toEqual({
      id: track.id,
      title: track.title,
      albumId: album.id,
      cover: album.cover,
      artists: [
        {
          name: artist.name,
          role: "composer",
        },
      ],
    })
  })

  it("returns 404 if the track does not exist", async () => {
    const res = await request(app).get("/api/v1/tracks/id-does-not-exist")

    expect(res.status).toBe(NOT_FOUND)
  })
})
