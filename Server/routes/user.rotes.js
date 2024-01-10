import express from "express";
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
    .withMessage("password minimum 8 character")
);
