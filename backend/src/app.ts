import express from "express"
import { OK } from "./constants/http.js"
import errorHandler from "./middleware/errorHandler.js"
import morgan from "morgan"
import notFound from "./middleware/notFound.js"
import trackRoutes from "./routes/tracks.routes.js"
import passport from "passport"
import authRoutes from "./routes/auth.routes.js"
import "./config/passport.js"

const app = express()
app.use(express.json())
app.use(morgan("dev"))

app.use(passport.initialize())

app.get("/api/v1", (_, res) => res.status(OK).json({ status: "healthy!" }))

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/tracks", trackRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
