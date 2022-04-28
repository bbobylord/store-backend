const createError = require("http-errors");
const { authSchema } = require("../../../validations/user/auth.schema");
const Controller = require("../controller");

module.exports = new (class HomeController extends Controller {
  async indexPage(req, res, next) {
    try {
      return res.status(200).send("helooooo");
    } catch (error) {
      next(createError.BadRequest(error.message));
    }
  }
})();
