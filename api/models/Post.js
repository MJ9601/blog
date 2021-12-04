const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PostSchema = Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: false,
    },
    photo: {
      type: String,
      required: false,
    },
    username: { type: Schema.Types.ObjectId, ref: "User", unique: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "Dislike" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
