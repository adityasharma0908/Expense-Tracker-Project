const db = require("../Config/db")

const jwt = require("jsonwebtoken")

// REGISTER USER

const registerUser = (req, res) => {

  const { name, email, password } = req.body

  const sql =
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"

  db.query(sql, [name, email, password], (err, result) => {

    if (err) {

      console.log(err)

      return res.status(500).json({
        message: "Registration failed"
      })

    }

    res.status(201).json({
      message: "User registered successfully"
    })

  })

}

// LOGIN USER

const loginUser = (req, res) => {

  const { email, password } = req.body

  const sql =
    "SELECT * FROM users WHERE email = ?"

  db.query(sql, [email], (err, result) => {

    if (err) {

      return res.status(500).json({
        message: "Login failed"
      })

    }

    if (result.length === 0) {

      return res.status(401).json({
        message: "User not found"
      })

    }

    const user = result[0]

    if (user.password !== password) {

      return res.status(401).json({
        message: "Invalid password"
      })

    }

    const token = jwt.sign(

      {
        id: user.id
      },

      "mysecretkey",

      {
        expiresIn: "1d"
      }

    )

    res.status(200).json({

      message: "Login successful",

      token

    })

  })

}

module.exports = {
  registerUser,
  loginUser
}