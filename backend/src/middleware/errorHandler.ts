import type { ErrorRequestHandler } from "express"
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from "../constants/http.js"
import z, { ZodError } from "zod"
import AppError from "../utils/AppError.js"
import { NODE_ENV } from "../constants/env.js"

const errorHandler: ErrorRequestHandler = (error, req, res, _next) => {
  if (error instanceof ZodError) {
    return res.status(BAD_REQUEST).json({
      path: req.originalUrl,
      message: z.prettifyError(error),
    })
  }

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      path: req.originalUrl,
      message: error.message,
      errorCode: error.errorCode,
    })
  }

  console.error(error.stack)

  return res
    .status(res.statusCode !== OK ? res.statusCode : INTERNAL_SERVER_ERROR)
    .json({
      path: req.originalUrl,
      message:
        NODE_ENV === "production" ? "Internal Server Error" : error.message,
    })
}

export default errorHandler
