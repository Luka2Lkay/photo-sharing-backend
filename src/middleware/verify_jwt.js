const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/auth_key_config");

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "The token doesn't exist" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorised!" });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };
