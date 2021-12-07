const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  reciver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  desc: {
    type: String,
    required: true,
  },
  replay: {
    type: Schema.Types.ObjectId,
    ref: "Message",
  },
});

module.exports = mongoose.model("Message", MessageSchema);
