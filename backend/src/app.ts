import express from "express"
import { OK } from "./constants/http.js"

const app = express()
app.use(express.json())

app.get("/health", (_, res) => res.status(OK).json({ message: "healthy!" }))

export default app
