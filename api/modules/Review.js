import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;

const ReviewSchema = new mongoose.Schema(
  {
    likes: [{ type: ObjectId, ref: "Like" }],
    dislikes: [{ type: ObjectId, ref: "Dislike" }],
    comments: [{ type: ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);
