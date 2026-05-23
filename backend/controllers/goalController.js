const db = require("../config/db")

// GET GOALS

const getGoals = async (req, res) => {

  try {

    const [rows] = await db.query(

  "SELECT * FROM goals WHERE user_id = ?",

  [req.query.user_id]

);

    res.json(rows);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server Error"
    });

  }

};

// ADD GOAL

const addGoal = async (req, res) => {

  try {

    const {

  title,
  target,
  saved,
  user_id

} = req.body;

    await db.query(
      "INSERT INTO goals (title, target_amount, saved_amount, user_id) VALUES (?, ?, ?, ?)",
      [title, target, saved, user_id]
    );

    res.status(201).json({
      message: "Goal added successfully"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: "Server Error"
    });

  }

};

// DELETE GOAL

const deleteGoal = async (req, res) => {

  try {

    const { id } = req.params

    await db.query(
      "DELETE FROM goals WHERE id = ?",
      [id]
    )

    res.json({
      message: "Goal deleted"
    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({
      error: "Server Error"
    })

  }

}

// UPDATE GOAL
const updateGoal = async (req, res) => {

  try {

    const { id } = req.params

    const { saved } = req.body

    await db.query(

      "UPDATE goals SET saved_amount = ? WHERE id = ?",

      [saved, id]

    )

    res.json({
      message: "Goal updated"
    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Failed to update goal"
    })

  }

}


module.exports = {

  getGoals,
  addGoal,
  deleteGoal,
  updateGoal

}