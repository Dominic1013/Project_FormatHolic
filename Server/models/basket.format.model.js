import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "basketball",
  mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
  })
);
