const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const UserInfoSchema = Schema(
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
      default: [],
    },
    socialMedias: { type: ObjectId, ref: "SocialMedia" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserInfo", UserInfoSchema);
