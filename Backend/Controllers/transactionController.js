const db = require("../Config/db")

// ADD TRANSACTION

const addTransaction = (req, res) => {

  const { user_id, text, amount } = req.body

  const sql =
    "INSERT INTO transactions (user_id, text, amount) VALUES (?, ?, ?)"

  db.query(sql, [user_id, text, amount], (err, result) => {

    if (err) {

      console.log(err)

      return res.status(500).json({
        message: "Transaction failed"
      })

    }

    res.status(201).json({
      message: "Transaction added successfully"
    })

  })

}

// GET TRANSACTIONS

const getTransactions = (req, res) => {

  const sql =
    "SELECT * FROM transactions"

  db.query(sql, (err, result) => {

    if (err) {

      return res.status(500).json({
        message: "Failed to fetch transactions"
      })

    }

    res.status(200).json(result)

  })

}
const deleteTransaction = (req, res) => {

  const { id } = req.params

  const sql =
    "DELETE FROM transactions WHERE id = ?"

  db.query(sql, [id], (err, result) => {

    if (err) {

      return res.status(500).json({
        message: "Delete failed"
      })

    }

    res.status(200).json({
      message: "Transaction deleted"
    })

  })

}

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction
}