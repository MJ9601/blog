const router = require("express").Router();
const User = require("../models/User");
const Message = require("../models/Message");

// create message
router.post("/createMessage", async (req, res) => {
  try {
    const newMessage = new Message({
      sender: req.body.senderId,
      reciever: req.body.recieverId,
      desc: req.body.desc,
    });
    await newMessage
      .save(async (err, firstResp) =>
        err
          ? res.status(500).send(err)
          : await User.findByIdAndUpdate(
              req.body.senderId,
              {
                $addToSet: { sentMessages: firstResp._id },
              },
              { new: true },
              async (err, secondResp) =>
                err
                  ? res.status(500).send(err)
                  : await User.findByIdAndUpdate(
                      req.body.recieverId,
                      {
                        $addToSet: { recievedMessages: firstResp._id },
                      },
                      { new: true },
                      async (err, thirdResp) => {
                        err && res.status(500).send(err);
                        !req.body.replayId
                          ? res.status(200).send({
                              reciever: thirdResp,
                              message: "message has been sent!",
                            })
                          : await Message.findByIdAndUpdate(
                              req.body.replayId,
                              { $set: { replay: req.body.replayId } },
                              { new: true },
                              (err, lastResp) =>
                                err
                                  ? res.status(500).send(err)
                                  : res.status(200).send(lastResp)
                            );
                      }
                    )
            )
      )
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (error) {}
});
// update message
router.put("/:messageId", async (req, res) => {
  try {
    await Message.findById(req.params.messageId, async (err, firstResp) => {
      err && res.status(500).send(err);
      if (req.body.usernameId == firstResp.sender && req.body.desc)
        await Message.findByIdAndUpdate(
          req.params.messageId,
          { $set: { desc: req.body.desc } },
          { new: true },
          (err, secondResp) =>
            err ? res.status(500).send(err) : res.status(200).send(secondResp)
        );
      else if (req.body.usernameId == firstResp.reciever && req.body.like)
        await Message.findByIdAndUpdate(
          req.params.messageId,
          { $set: { like: req.body.usernameId } },
          { new: true },
          (err, lastResp) =>
            err ? res.status(500).send(err) : res.status(200).send(lastResp)
        );
    })
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete message

router.delete("/:messageId", async (req, res) => {
  try {
    await Message.findById(req.params.messageId, async (err, firstResp) =>
      err
        ? res.status(500).send(err)
        : await User.findById(firstResp.sender, async (err, secondResp) =>
            err
              ? res.status(500).send(err)
              : await User.findByIdAndUpdate(
                  secondResp._id,
                  {
                    $set: {
                      sentMessages: secondResp.sentMessages.filter(
                        (messId) => messId != req.params.messageId
                      ),
                    },
                  },
                  { new: true },
                  async (err, thirdResp) =>
                    err
                      ? res.status(500).send(err)
                      : await User.findById(
                          firstResp.reciever,
                          async (err, forthResp) =>
                            err
                              ? res.status(500).send(err)
                              : await User.findByIdAndUpdate(
                                  firstResp.reciever,
                                  {
                                    $set: {
                                      recievedMessages:
                                        forthResp.recievedMessages.filter(
                                          (messId) =>
                                            messId != req.params.messageId
                                        ),
                                    },
                                  },
                                  { new: true },
                                  async (err, fifthResp) =>
                                    err
                                      ? res.status(500).send(err)
                                      : await Message.findByIdAndDelete(
                                          req.params.messageId,
                                          (err, lastResp) =>
                                            err
                                              ? res.status(500).send(err)
                                              : res.status(200).send({
                                                  results: lastResp,
                                                  message:
                                                    "message has been deleted",
                                                })
                                        )
                                )
                        )
                )
          )
    )
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
