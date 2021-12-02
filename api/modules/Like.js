const ObjectId = mongoose.Schema.ObjectId;

const LikeSchema = new mongoose.Schema(
  {
    liked: {
      type: Boolean,
      required: false,
      default: false,
    },
    username: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export default mongoose.model("Like", LikeSchema);
