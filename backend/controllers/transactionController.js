const db = require("../config/db")

const addTransaction = async (req, res) => {

  try {

    const {

      text,
      amount,
      category,
      user_id

    } = req.body

    await db.query(

      "INSERT INTO transactions (text, amount, category, user_id) VALUES (?, ?, ?, ?)",

      [text, amount, category, user_id]

    )

    res.status(201).json({
      message: "Transaction added"
    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Transaction failed"
    })

  }

}

const getTransactions = async (req, res) => {

  try {

    const [rows] = await db.query(

      "SELECT * FROM transactions WHERE user_id = ?",

      [req.query.user_id]

    )

    res.json(rows)

  }

  catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Failed to fetch transactions"
    })

  }

}

const deleteTransaction = async (req, res) => {

  try {

    const { id } = req.params

    await db.query(

      "DELETE FROM transactions WHERE id = ?",

      [id]

    )

    res.json({
      message: "Transaction deleted"
    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Delete failed"
    })

  }

}

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction
}