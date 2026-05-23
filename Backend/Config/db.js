const mysql = require("mysql2/promise")

const db = mysql.createPool({

  host: "localhost",

  user: "root",

  password: "",

  database: "expense_tracker"

})

console.log("Connected to MySQL")

module.exports = db