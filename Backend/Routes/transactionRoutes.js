const express = require("express")

const router = express.Router()

const {
  addTransaction,
  getTransactions,
  deleteTransaction
} = require("../Controllers/transactionController")

const verifyToken =
require("../Middleware/authMiddleware")

router.post("/", verifyToken, addTransaction)

router.get("/", verifyToken, getTransactions)

router.delete("/:id", verifyToken, deleteTransaction)

module.exports = router