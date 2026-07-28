import app from "../src/app.js"
import request from "supertest"
import { describe, it, expect } from "vitest"
import { OK } from "../src/constants/http.js"

describe("GET /health", () => {
  it("should return healthy status", async () => {
    const response = await request(app).get("/api/v1")

    expect(response.statusCode).toBe(OK)
    expect(response.body.status).toBe("healthy!")
  })
})
