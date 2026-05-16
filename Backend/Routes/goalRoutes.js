const express = require("express")

const router = express.Router()

const {

  getGoals,
  addGoal,
  deleteGoal,
  updateGoal

} = require("../controllers/goalController")

router.get("/", getGoals)

router.post("/", addGoal)

router.delete("/:id", deleteGoal)

router.put("/:id", updateGoal)

module.exports = router