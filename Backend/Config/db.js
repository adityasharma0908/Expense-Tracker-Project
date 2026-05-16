const mysql = require("mysql2")

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "expense_tracker"
})

connection.connect((err) => {

  if (err) {
    console.log("Database connection failed")
  }

  else {
    console.log("Connected to MySQL")
  }

})

module.exports = connection