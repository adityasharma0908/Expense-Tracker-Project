const express = require("express")
const cors = require("cors")
const goalRoutes =
require("./Routes/goalRoutes")

require("./config/db")

const authRoutes = require("./Routes/authRoutes")

const transactionRoutes =
require("./Routes/transactionRoutes")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)

app.use("/api/transactions", transactionRoutes)

app.use("/api/goals", goalRoutes)

app.get("/", (req, res) => {
  res.send("Backend Server Running")
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})