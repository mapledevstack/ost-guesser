import type { ErrorRequestHandler } from "express"
import { INTERNAL_SERVER_ERROR } from "../constants/http.js"

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  console.log(`PATH: ${req.path}`, error)

  const statusCode = error.statusCode || INTERNAL_SERVER_ERROR
  const message = error.message || "Internal Server Error"

  return res.status(statusCode).send(message)
}

export default errorHandler
