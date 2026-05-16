const db = require("../config/db")

// GET GOALS

const getGoals = (req, res) => {

  const sql =
    "SELECT * FROM goals"

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err)

      return res.status(500).json({
        message: "Failed to fetch goals"
      })

    }

    res.json(result)

  })

}

// ADD GOAL

const addGoal = (req, res) => {

  const { title, target, saved } =
    req.body

  const sql =
    "INSERT INTO goals (title, target, saved) VALUES (?, ?, ?)"

  db.query(

    sql,

    [title, target, saved],

    (err, result) => {

      if (err) {

        console.log(err)

        return res.status(500).json({
          message: "Failed to add goal"
        })

      }

      res.json({
        message: "Goal added"
      })

    }

  )

}

// DELETE GOAL

const deleteGoal = (req, res) => {

  const { id } = req.params

  const sql =
    "DELETE FROM goals WHERE id = ?"

  db.query(sql, [id], (err) => {

    if (err) {

      console.log(err)

      return res.status(500).json({
        message: "Failed to delete goal"
      })

    }

    res.json({
      message: "Goal deleted"
    })

  })

}

// UPDATE GOAL

const updateGoal = (req, res) => {

  const { id } = req.params

  const { saved } = req.body

  const sql =
    "UPDATE goals SET saved = ? WHERE id = ?"

  db.query(

    sql,

    [saved, id],

    (err) => {

      if (err) {

        console.log(err)

        return res.status(500).json({
          message: "Failed to update goal"
        })

      }

      res.json({
        message: "Goal updated"
      })

    }

  )

}

module.exports = {

  getGoals,
  addGoal,
  deleteGoal,
  updateGoal

}