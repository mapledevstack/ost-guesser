import type { AppErrorCode } from "../constants/appErrorCodes.js"
import type { HttpStatusCode } from "../constants/http.js"

class AppError extends Error {
  constructor(
    public statusCode: HttpStatusCode,
    message: string,
    public errorCode?: AppErrorCode,
  ) {
    super(message)
  }
}

export default AppError
