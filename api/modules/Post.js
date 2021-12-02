import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    username: [{ type: ObjectId, ref: "User" }],
    review: [{ type: ObjectId, ref: "Review" }],
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
