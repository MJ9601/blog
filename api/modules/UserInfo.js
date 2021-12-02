import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;

const UserInfoSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    aboutMe: {
      type: String,
      default: "",
    },
    career: {
      type: String,
      default: "",
    },
    passions: {
      type: Array,
      default: "",
    },
    socialMedias: [{ type: ObjectId, ref: "SocialMedia" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserInfo", UserInfoSchema);
