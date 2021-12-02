import mongoose from "mongoose";

const SocialMediaSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    tiwtter: {
      type: String,
      default: "",
    },
    pinterest: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SoicalMedia", SocialMediaSchema);
