import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;

const CommentSchema = new mongoose.Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    username: [{ type: ObjectId, ref: "User" }],
    review: [{ type: ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
