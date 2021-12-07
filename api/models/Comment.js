const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    desc: {
      type: String,
      required: true,
    },
    isReplay: {
      type: Boolean,
      required: true,
      default: false,
    },
    originalPost: { type: Schema.Types.ObjectId, ref: "Post" },
    originalComment: { type: Schema.Types.ObjectId, ref: "Comment" },
    username: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: false,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    replaies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
