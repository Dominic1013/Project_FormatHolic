import mongoose, { Schema } from "mongoose";

export default mongoose.model(
  "formatImage",
  mongoose.Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    formatImageUrl: {
      type: Array,
      require: true,
    },
  })
);
