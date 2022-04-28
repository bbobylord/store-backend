const {
  UserAuthController,
} = require("../../http/controllers/user/auth.controller");

const router = require("express").Router();

/**
 *  @swagger
 * tags:
 *   name: User-Authentication

 */
/**
 * @swagger
 * /user/getOTP:
 *   post:
 *      tags: [User-Authentication]
 *      summary: Login User By Phone Number
 *      description : One Time Password (OTP) Login
 *      parameters :
 *              - name : mobile
 *                description : fa_IRI phoneNumber
 *                in : formData
 *                required : true
 *                type : string
 *      responses:
 *            200:
 *               description : Success
 *            400:
 *               description : Bad Request
 *            401:
 *               description : Unauthraize
 *            500:
 *               description : Internal Server Error
 *
 */
router.post("/getOTP", UserAuthController.getOTP);

/**
 * @swagger
 * /user/checkOTP:
 *   post:
 *      tags: [User-Authentication]
 *      summary: Check OTP Value Controller
 *      description : Check OTP Value By Mobile user With Code
 *      parameters :
 *              - name : mobile
 *                description : fa_IRI phoneNumber
 *                in : formData
 *                required : true
 *                type : string
 *
 *              - name : code
 *                description : entet sms code recived
 *                in : formData
 *                required : true
 *                type : string
 *      responses:
 *            200:
 *               description : Success
 *            400:
 *               description : Bad Request
 *            401:
 *               description : Unauthraize
 *            500:
 *               description : Internal Server Error
 *
 */
router.post("/checkOTP", UserAuthController.checkOTP);

module.exports = {
  userAuthRouter: router,
};
