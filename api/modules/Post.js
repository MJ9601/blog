const mongoose = require("mongoose");
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
    username: [{ type: ObjectId, ref: "User", unique: true }],
    review: [{ type: ObjectId, ref: "Review" }],
    categories: [{ type: ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
