const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../model/users");
const { SECRET_KEY_JWT } = require("../../utils/constants");

const verifyAccessToken = (req, res, next) => {
  const headers = req.headers;

  const [bearer, token] = headers?.accesstoken?.split(" ") || [];

  if (token && ["bearer", "Bearer"].includes(bearer)) {
    jwt.verify(token, SECRET_KEY_JWT, async (err, payload) => {
      if (err)
        return next(createError.Unauthorized("توکن ارسال شده معتبر نمی باشد"));

      console.log(payload);
      const { mobile } = payload || {};
      const user = await UserModel.findOne({ mobile }, { password: 0, otp: 0 });

      if (!user) return next(createError.Unauthorized("کاربری یافت نشد"));
      req.user = user;

      return next();
    });
  } else {
    return next(createError.Unauthorized("توکن ارسال شده معتبر نمی باشد"));
  }
};

module.exports = { verifyAccessToken };
