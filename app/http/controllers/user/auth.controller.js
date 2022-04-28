const createError = require("http-errors");
const { UserModel } = require("../../../model/users");
const {
  randomNumberGenerator,
  signAccessToken,
} = require("../../../utils/functions");
const {
  authSchema,
  checkOTPSchema,
} = require("../../../validations/user/auth.schema");
const Controller = require("../controller");

class UserAuthController extends Controller {
  async getOTP(req, res, next) {
    try {
      await authSchema.validateAsync(req.body);
      const { mobile } = req.body;
      const code = randomNumberGenerator();

      const result = await this.saveUser(mobile, code);

      if (!result) throw createError.Unauthorized("مشکلی پیش آمده تلاش مجدد");

      return res.status(200).json({
        user: {
          status: 200,
          message: "لاگین با موفقیت انجام شد",
          code: code,
          mobile,
        },
      });
    } catch (error) {
      next(createError.BadRequest(error.message));
    }
  }

  async checkOTP(req, res, next) {
    try {
      await checkOTPSchema.validateAsync(req.body);
      const { mobile, code } = req.body;

      const user = await UserModel.findOne({ mobile });

      if (!user)
        throw createError.NotFound(`کاربری با  شماره ${mobile} یافت نشد `);

      if (user.otp.code != code)
        throw createError.Unauthorized("کد وارد شده صحیح نمی باشد ");

      if (+user.otp.expiresIn < new Date())
        throw createError.Unauthorized("کد منقضی شده است ");
      const token = await signAccessToken(user._id);

      return res.status(200).json({
        data: {
          user,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async saveUser(mobile, code) {
    let otp = {
      expiresIn: new Date().getTime() + 12000,
      code,
    };
    const result = await this.chackExistUser(mobile);

    if (result) {
      return await this.userUpdate(mobile, { otp });
    }

    return await UserModel.create({
      mobile,
      otp,
      Roles: ["USER"],
    });
  }

  async chackExistUser(mobile) {
    const user = await UserModel.findOne({ mobile });
    return !!user;
  }

  async userUpdate(mobile, objectData = {}) {
    Object.keys(objectData).forEach((key) => {
      if (["", " ", undefined, NaN, null, 0, "0"].includes(objectData[key]))
        delete objectData[key];
    });

    const userUpdate = await UserModel.updateOne(
      { mobile },
      { $set: objectData }
    );

    console.log(userUpdate);

    return !!userUpdate.modifiedCount;
  }
}

module.exports = {
  UserAuthController: new UserAuthController(),
};
