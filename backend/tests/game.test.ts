import { describe, expect, it } from "vitest"
import request from "supertest"
import app from "../src/app.js"
import { OK } from "../src/constants/http.js"
import {
  createAlbum,
  createArtist,
  createTrack,
  createTrackArtist,
} from "./factories.js"
import { SUPABASE_URL } from "../src/constants/env.js"

describe("GET /game/daily", () => {
  it("returns daily track", async () => {
    const album = await createAlbum()
    const track = await createTrack({ albumId: album.id })
    const artist = await createArtist()

    await createTrackArtist({
      trackId: track.id,
      artistId: artist.id,
    })

    const res = await request(app).get("/api/v1/game/daily")

    expect(res.status).toBe(OK)
    expect(res.headers["set-cookie"]).toBeDefined()
    expect(res.body).toEqual({
      clipUrl: `${SUPABASE_URL}/${track.id}.mp3`,
    })
  })
})
