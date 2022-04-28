const joi = require("@hapi/joi");

const authSchema = joi.object({
  mobile: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("شماره وارد شده صحیح نمیباشد ، تلاش مجدد")),
});
const checkOTPSchema = joi.object({
  mobile: joi
    .string()
    .length(11)
    .pattern(/^09[0-9]{9}$/)
    .error(new Error("شماره وارد شده صحیح نمیباشد ، تلاش مجدد")),
  code: joi
    .string()
    .length(5)
    .required()
    .error(new Error("کد وارد شده صحیح نمیباشد ،  کد باید 5 رقم باشد")),
});
module.exports = {
  authSchema,
  checkOTPSchema,
};
