const HomeController = require("../../http/controllers/api/home.controller");

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
 *      responses:
 *           200:
 *               description : success
 *           404:
 *               description : not found
 *
 */
router.get("/", HomeController.indexPage);

module.exports = {
  homeRouter: router,
};
