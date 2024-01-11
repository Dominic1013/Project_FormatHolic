import express from "express";
import requestHandler from "../handlers/request.handler";
import userController from "../controller/user.controller";
import { body } from "express-validator";
import { Error } from "mongoose";

const router = express.Router();

router.post(
  "/signup",

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

  body("displayName")
    .exists()
    .withMessage("displayName is required")
    .isLength({ min: 8 })
    .withMessage("displayName minimum 8 character"),

  requestHandler.validate,
  userController.signUp
);

router.post(
  "/signin",

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
  userController.signIn
);

export default router;
