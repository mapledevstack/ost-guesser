import assert from "node:assert"
import type { AppErrorCode } from "../constants/appErrorCodes.js"
import type { HttpStatusCode } from "../constants/http.js"
import AppError from "./AppError.js"

export default function appAssert(
  condition: unknown,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode,
): asserts condition {
  assert(condition, new AppError(httpStatusCode, message, appErrorCode))
}
