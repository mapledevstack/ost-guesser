import type { RequestHandler } from "express"
import { NOT_FOUND } from "../constants/http.js"

const notFound: RequestHandler = (req, res, next) => {
  res.status(NOT_FOUND)

  const error = new Error(`Not Found - ${req.originalUrl}`)

  next(error)
}

export default notFound
