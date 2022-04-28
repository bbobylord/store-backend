const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/users");
const { SECRET_KEY_JWT } = require("./constants");

const randomNumberGenerator = () => {
  return Math.floor(Math.random() * 90000 + 10000);
};

const signAccessToken = (userID) => {
  return new Promise((resolve, reject) => {
    const user = UserModel.findById(userID);

    const payload = {
      mobile: user.mobile,
      userID: user._id,
    };

    const secretKey = SECRET_KEY_JWT;

    const option = {
      expiresIn: "1h",
    };

    jwt.sign(payload, secretKey, option, (err, token) => {
      if (err) reject(createError.InternalServerError("خطای سرور"));

      resolve(token);
    });
  });
};
module.exports = {
  randomNumberGenerator,
  signAccessToken,
};
