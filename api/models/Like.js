const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const LikeSchema = new Schema(
  {
    username: { type: Schema.Types.ObjectId, ref: "User" },
    originalPost: { type: Schema.Types.ObjectId, ref: "Post", default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Like", LikeSchema);
