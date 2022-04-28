const { homeRouter } = require("./api");
const { userAuthRouter } = require("./user/auth");

const router = require("express").Router();

router.use("/", homeRouter);
router.use("/user", userAuthRouter);

module.exports = {
  allRouter: router,
};
