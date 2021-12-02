import mongoose from "mongoose";

const UserImgSchema = new mongoose.Schema(
  {
    avatarImg: {
      type: String,
      default: "",
    },
    homeImg: {
      type: String,
      default: "",
    },
    backgroundImg: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserImg", UserImgSchema);
