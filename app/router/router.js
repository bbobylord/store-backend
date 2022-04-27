const { homeRouter } = require("./api");

const router = require("express").Router();

router.use("/", homeRouter);

module.exports = {
  allRouter: router,
};
