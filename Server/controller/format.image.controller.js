import { format } from "path";
import responseHandler from "../handlers/response.handler.js";
import formatImageModel from "../models/format.image.model.js";

const add = async (req, res) => {
  try {
    console.log("ok");
    const { formatImageUrl } = req.body;

    const formatImage = new formatImageModel({
      user: req.user.id,
      formatImageUrl,
    });

    await formatImage.save();
    // await formatImage.save();

    responseHandler.created(res, {
      ...formatImage._doc,
      user: req.user,
      formatImageUrl: formatImage.formatImageUrl,
    });
  } catch {
    responseHandler.error(res);
  }
};

const getFormat = async (req, res) => {
  try {
    console.log("hellou");
    const format = await formatImageModel.find({ user: req.user.id });

    responseHandler.ok(res, format);
  } catch {
    responseHandler.error(res);
  }
};

export default { add, getFormat };
