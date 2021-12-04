const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    originalPost: { type: Schema.Types.ObjectId, ref: "Post" },
    username: { type: Schema.Types.ObjectId, ref: "User" },
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "Dislike" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
