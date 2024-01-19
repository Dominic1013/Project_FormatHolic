import express from "express";
import requestHandler from "../handlers/request.handler.js";
import userController from "../controller/user.controller.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/register",

  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("username minimum 8 character"),

  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 character"),

  body("confirmPassword")
    .exists()
    .withMessage("confirmPassword is required")
    .isLength({ min: 8 })
    .withMessage("confirmPassword minimum 8 character"),

  body("displayname")
    .exists()
    .withMessage("displayName is required")
    .isLength({ min: 8 })
    .withMessage("displayName minimum 8 character"),

  requestHandler.validate,
  userController.register
);

router.post(
  "/login",

  body("username")
    .exists()
    .withMessage("Username is require")
    .isLength({ min: 0 })
    .withMessage("username minimum 8 character"),

  body("password")
    .exists()
    .withMessage("Password is require")
    .isLength({ min: 0 })
    .withMessage("Password minimum 8 character"),

  requestHandler.validate,
  userController.login
);

export default router;
