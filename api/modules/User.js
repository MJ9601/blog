import mongoose from "mongoose";
const ObjectId = mongoose.Schema.ObjectId;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    userImgs: [{ type: ObjectId, ref: "UserImg" }],
    userInfos: [{ type: ObjectId, ref: "UserInfo" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
