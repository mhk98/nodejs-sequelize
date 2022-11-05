const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.getJWT = (email) => {
  return jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24,
  });
};

module.exports.verifyJWT = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
