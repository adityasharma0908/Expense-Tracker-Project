const express = require("express")
const cors = require("cors")

require("./config/db")

const authRoutes =
require("./routes/authRoutes")

const transactionRoutes =
require("./routes/transactionRoutes")

const goalRoutes =
require("./routes/goalRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)

app.use("/api/transactions", transactionRoutes)

app.use("/api/goals", goalRoutes)

app.get("/", (req, res) => {

  res.send("Backend running")

})

const PORT = 3001

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  )

})