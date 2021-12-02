const ObjectId = mongoose.Schema.ObjectId;

const DislikeSchema = new mongoose.Schema(
  {
    Disliked: {
      type: Boolean,
      required: false,
      default: false,
    },
    username: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Dislike", DislikeSchema);
