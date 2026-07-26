import app from "./app.js"
import { PORT, NODE_ENV } from "./constants/env.js"

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT} in ${NODE_ENV} environment`)
})
