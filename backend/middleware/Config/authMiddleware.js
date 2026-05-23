const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {

  const token =
    req.headers.authorization

  if (!token) {

    return res.status(401).json({
      message: "Access denied"
    })

  }

  try {

    const verified =
      jwt.verify(token, "mysecretkey")

    req.user = verified

    next()

  }

  catch (error) {

    res.status(401).json({
      message: "Invalid token"
    })

  }

}

module.exports = verifyToken