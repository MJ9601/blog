const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const DislikeSchema = new mongoose.Schema(
  {
    Disliked: {
      type: Boolean,
      required: false,
      default: false,
    },
    username: [{ type: ObjectId, ref: "User", unique: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dislike", DislikeSchema);
