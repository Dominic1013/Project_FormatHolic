import mongoose from "mongoose";
import modelOptions from "./models.options";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    unique: true,
  },
  displayname: {
    type: String,
    require: true,
  },
  salt: {
    type: String,
    require: true,
    select: false,
  },
});
