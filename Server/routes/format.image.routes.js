import { body } from "express-validator";
import express from "express";
import requestHandler from "../handlers/request.handler.js";
import formatImageController from "../controller/format.image.controller.js";
import tokenMiddleware from "../middleware/toke.middleware.js";

const router = express.Router();

router.post(
  "/add",

  tokenMiddleware.auth,

  body("formatImageUrl").exists().withMessage("formatImageUrl is required"),

  requestHandler.validate,

  formatImageController.add
);

router.get(
  "/get",

  tokenMiddleware.auth,

  formatImageController.getFormat
);

export default router;
