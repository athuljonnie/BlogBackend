const jwt = require("jsonwebtoken");

const generateAccessToken = (data) => {
  return jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: 10000000 * 600000000,
  });
};

const generateRefreshToken = (data) => {
  return jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 * 7,
  });
};

const authenticate = (req, res, next) => {
  if (req.headers["authorization"]) {
    const token = req.headers["authorization"].split(" ")[1];
    if (token === null) {
      return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
      if (err) {
        if (err.name === "JsonWebTokenError" || "TokenExpiredError") {
          res.status(401).json({
            code: 401,
            message: "Unauthorized",
          });
        }
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({
      code: 401,
      message: "Unauthorized",
    });
  }
};

const logger = (req, res, next) =>{
  next();
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticate,
  logger
};
