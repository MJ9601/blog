const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const LikeSchema = new mongoose.Schema(
  {
    liked: {
      type: Boolean,
      required: false,
      default: false,
    },
    username: [{ type: ObjectId, ref: "User", unique: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", LikeSchema);
