const db = require("../config/db")
const jwt = require("jsonwebtoken")

const registerUser = async (req, res) => {

  try {

    const { name, email, password } =
      req.body

    await db.query(

      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",

      [name, email, password]

    )

    res.status(201).json({
      message: "User registered successfully"
    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Registration failed"
    })

  }

}

const loginUser = async (req, res) => {

  try {

    const { email, password } = req.body

    const [rows] = await db.query(

      "SELECT * FROM users WHERE email = ? AND password = ?",

      [email, password]

    )

    if (rows.length === 0) {

      return res.status(401).json({
        message: "Invalid credentials"
      })

    }

    res.json({

      message: "Login successful",

      user: rows[0]

    })

  }

  catch (error) {

    console.log(error)

    res.status(500).json({
      message: "Login failed"
    })

  }

}

module.exports = {
  registerUser,
  loginUser
}