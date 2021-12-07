const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// create comment

router.post("/createComment", async (req, res) => {
  try {
    if (!req.body.isReplay) {
      const newComment = new Comment({
        username: req.body.usernameId,
        desc: req.body.desc,
        isReplay: req.body.isReplay,
        originalPost: req.body.originalPostId,
      });
      await newComment.save(async (err, firstResp) => {
        err
          ? res.status(500).send(err)
          : await Post.findByIdAndUpdate(
              req.body.originalPostId,
              { $addToSet: { comments: firstResp._id } },
              async (err, secondResp) =>
                err
                  ? res.status(500).send(err)
                  : await User.findByIdAndUpdate(
                      req.body.usernameId,
                      { $addToSet: { comments: firstResp._id } },
                      (err, thirdResp) =>
                        err
                          ? res.status(500).send(err)
                          : res.status(200).send(firstResp)
                    )
            );
      });
    } else {
      const newReplay = new Comment({
        username: req.body.usernameId,
        desc: req.body.desc,
        isReplay: req.body.isReplay,
        originalComment: req.body.originalPostId,
      });
      await newReplay.save(async (err, firstResp) => {
        err
          ? res.status(500).send(err)
          : await Comment.findByIdAndUpdate(
              req.body.originalPostId,
              { $addToSet: { replaies: firstResp._id } },
              async (err, secondResp) =>
                err
                  ? res.status(500).send(err)
                  : await User.findByIdAndUpdate(
                      req.body.usernameId,
                      { $addToSet: { comments: firstResp._id } },
                      (err, thirdResp) =>
                        err
                          ? res.status(500).send(err)
                          : res.status(200).send(firstResp)
                    )
            );
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
// update comment
router.put("/:id", async (req, res) => {
  try {
    const updatedComment = {
      desc: req.body.desc,
      isReplay: req.body.isReplay,
    };
    await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: { desc: req.body.desc } },
      async (err, firstResp) =>
        err
          ? res.status(500).send(err)
          : res.status(200).send(firstResp.isReplay)
    )
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});
// delete comment

router.delete("/:id", async (req, res) => {
  try {
    await Comment.deleteMany({ originalComment: req.params.id });

    await Comment.findById(req.params.id, async (err, firstResp) => {
      err && res.status(500).send(err);
      !firstResp.isReplay
        ? await Post.findById(firstResp.originalPost, async (err, secondResp) =>
            err
              ? res.status(500).send(err)
              : await Post.findByIdAndUpdate(
                  firstResp.originalPost,
                  {
                    $set: {
                      comments: secondResp.comments.filter(
                        (comment) => comment != req.params.id
                      ),
                    },
                  },
                  { new: true },
                  async (err, thirdResp) =>
                    err
                      ? res.status(500).send(err)
                      : await User.findById(
                          firstResp.username,
                          async (err, forthResp) =>
                            err
                              ? res.status(500).send(err)
                              : await User.findByIdAndUpdate(
                                  firstResp.username,
                                  {
                                    $set: {
                                      comments: forthResp.comments.filter(
                                        (comment) => comment != req.params.id
                                      ),
                                    },
                                  },
                                  async (err, fifthResp) =>
                                    err
                                      ? res.status(500).send(err)
                                      : await Comment.findByIdAndDelete(
                                          firstResp._id,
                                          (err, lastResp) =>
                                            err
                                              ? res.status(500).send(err)
                                              : res
                                                  .status(200)
                                                  .send(
                                                    "comment has been deleted"
                                                  )
                                        )
                                )
                        )
                )
          )
        : await Comment.findById(
            firstResp.originalComment,
            async (err, secondResp) =>
              err
                ? res.status(500).send(err)
                : await Comment.findByIdAndUpdate(
                    firstResp.originalComment,
                    {
                      $set: {
                        replaies: secondResp.replaies.filter(
                          (comment) => comment != req.params.id
                        ),
                      },
                    },
                    async (err, thirdResp) =>
                      err
                        ? res.status(500).send(err)
                        : await User.findById(
                            firstResp.username,
                            async (err, forthResp) =>
                              err
                                ? res.status(500).send(err)
                                : await User.findByIdAndUpdate(
                                    firstResp.username,
                                    {
                                      $set: {
                                        comments: forthResp.comments.filter(
                                          (comment) => comment != req.params.id
                                        ),
                                      },
                                    },
                                    async (err, fifthResp) =>
                                      err
                                        ? res.status(500).send(err)
                                        : await Comment.findByIdAndDelete(
                                            firstResp._id,
                                            (err, lastResp) =>
                                              err
                                                ? res.status(500).send(err)
                                                : res
                                                    .status(200)
                                                    .send(
                                                      "comment has been deleted"
                                                    )
                                          )
                                  )
                          )
                  )
          );
    })
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
