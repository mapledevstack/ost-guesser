import express from "express"
import cors from "cors"
import { OK } from "./constants/http.js"
import errorHandler from "./middleware/errorHandler.js"
import morgan from "morgan"
import notFound from "./middleware/notFound.js"
import trackRoutes from "./routes/tracks.routes.js"
import passport from "passport"
import authRoutes from "./routes/auth.routes.js"
import "./config/passport.js"
import gameRoutes from "./routes/game.routes.js"
import { CLIENT_URL } from "./constants/env.js"
import cookieParser from "cookie-parser"
import resolveIdentity from "./middleware/resolveIdentity.js"
import userRoutes from "./routes/user.routes.js"

const app = express()
app.use(express.json())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(cookieParser())
app.use(morgan("dev"))

app.use(passport.initialize())

app.get("/api/v1", (_, res) => res.status(OK).json({ status: "healthy!" }))

app.use("/api/v1/auth", resolveIdentity, authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/tracks", trackRoutes)
app.use("/api/v1/game", resolveIdentity, gameRoutes)

app.use(notFound)
app.use(errorHandler)

export default app
