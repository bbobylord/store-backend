const HomeController = require("../../http/controllers/api/home.controller");
const {
  verifyAccessToken,
} = require("../../http/middlewares/verifyAccessToken");

const router = require("express").Router();

/**
 *  @swagger
 * tags:
 *   name: indexPage
 *   description: API to manage your books.
  
 */
/**
 * @swagger
 * /:
 *  get:
 *      summary: index of route
 *      tags: [indexPage]
 *      description : get all need data for index page
 *      parameters:
 *              - in : header
 *                name : accesstoken
 *      responses:
 *           200:
 *               description : success
 *           404:
 *               description : not found
 *
 */
router.get("/", verifyAccessToken, HomeController.indexPage);

module.exports = {
  homeRouter: router,
};
