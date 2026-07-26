import app from "./app.js"
import { PORT, NODE_ENV } from "./constants/env.js"
import connectDB from "./db/connect.js"

await connectDB()

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT} in ${NODE_ENV} environment`)
})
