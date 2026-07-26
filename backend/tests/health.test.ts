import app from "../src/app.js"
import request from "supertest"
import { describe, it, expect } from "vitest"
import { OK } from "../src/constants/http.js"

describe("GET /health", () => {
  it("should return healthy status", async () => {
    const response = await request(app).get("/health")

    expect(response.status).toBe(OK)
    expect(response.body.message).toBe("healthy!")
  })
})
