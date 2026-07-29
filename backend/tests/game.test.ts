import { describe, expect, it } from "vitest"
import request from "supertest"
import app from "../src/app.js"
import { OK } from "../src/constants/http.js"
import { createSampleData } from "./factories.js"
import { SUPABASE_URL } from "../src/constants/env.js"

describe("GET /game/daily", () => {
  it("returns daily track", async () => {
    const { track } = await createSampleData()

    const res = await request(app).get("/api/v1/game/daily")

    expect(res.status).toBe(OK)
    expect(res.headers["set-cookie"]).toBeDefined()
    expect(res.body).toEqual({
      clipUrl: `${SUPABASE_URL}/${track.id}.mp3`,
    })
  })
})
