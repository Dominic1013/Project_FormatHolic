import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { username, password, confirmPassword, displayname } = req.body;

    const checkUser = await userModel.findOne({ username });

    if (checkUser)
      return responseHandler.badrequest(res, "username already exist");

    if (confirmPassword !== password)
      return responseHandler.badrequest(res, "Confirm password not match");

    const user = new userModel();

    user.displayname = displayname;
    user.username = username;

    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id }, // 為什麼不用底線
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" } // 24小時後失效
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("username displayname password salt id");

    if (!user) return responseHandler.badrequest(res, "user not exist");

    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Wrong password");

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    // 不讓使用者自己知道salt，但沒有save，所以不影響mongoDB的操作
    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    return responseHandler.error(res);
  }
};

export default { register, login };
