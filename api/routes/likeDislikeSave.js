const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// create like, dislile
// like
router.put("/like", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(
      req.body.originalPostId,
      { $addToSet: { likes: req.body.usernameId } },
      async (err, firstResp) =>
        err
          ? res.status(500).send(err)
          : await Post.findByIdAndUpdate(
              req.body.originalPostId,
              {
                $set: {
                  dislikes: firstResp.dislikes.filter(
                    (userId) => userId != req.body.usernameId
                  ),
                },
              },
              { new: true },
              async (err, secondResp) =>
                err
                  ? res.status(500).send(err)
                  : await User.findByIdAndUpdate(
                      req.body.usernameId,
                      {
                        $addToSet: { likedPosts: req.body.originalPostId },
                      },
                      (err, thirdResp) =>
                        err
                          ? res.status(500).send(err)
                          : res.status(200).send(secondResp)
                    )
            )
    )
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

// dislike
router.put("/dislike", async (req, res) => {
  try {
    await Post.findByIdAndUpdate(
      req.body.originalPostId,
      { $addToSet: { dislikes: req.body.usernameId } },
      async (err, firstResp) =>
        err
          ? res.status(500).send(err)
          : await Post.findByIdAndUpdate(
              req.body.originalPostId,
              {
                $set: {
                  likes: firstResp.likes.filter(
                    (userId) => userId != req.body.usernameId
                  ),
                },
              },
              { new: true },
              async (err, secondResp) =>
                err
                  ? res.status(500).send(err)
                  : await User.findById(
                      req.body.usernameId,
                      async (err, thirdResp) =>
                        err
                          ? res.status(500).send(err)
                          : await User.findByIdAndUpdate(
                              req.body.usernameId,
                              {
                                $set: {
                                  likedPosts: thirdResp.likedPosts.filter(
                                    (postId) =>
                                      postId != req.body.originalPostId
                                  ),
                                },
                              },
                              (err, forthResp) =>
                                err
                                  ? res.status(500).send(err)
                                  : res.status(200).send(secondResp)
                            )
                    )
            )
    )
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete like, dislile
// delete like
router.delete("/like", async (req, res) => {
  try {
    await Post.findById(req.body.originalPostId, async (err, firstResp) =>
      err
        ? res.status(500).send(err)
        : await Post.findByIdAndUpdate(
            req.body.originalPostId,
            {
              $set: {
                likes: firstResp.likes.filter(
                  (userId) => userId != req.body.usernameId
                ),
              },
            },
            { new: true },
            async (err, secondResp) =>
              err
                ? res.status(500).send(err)
                : await User.findById(
                    req.body.usernameId,
                    async (err, thirdResp) =>
                      err
                        ? res.status(500).send(err)
                        : await User.findByIdAndUpdate(
                            req.body.usernameId,
                            {
                              $set: {
                                likedPosts: thirdResp.likedPosts.filter(
                                  (postId) => postId != req.body.originalPostId
                                ),
                              },
                            },
                            (err, forthResp) =>
                              err
                                ? res.status(500).send(err)
                                : res.status(200).send(secondResp)
                          )
                  )
          )
            .clone()
            .catch((err) => res.status(500).send(err))
    )
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete dislike
router.delete("/dislike", async (req, res) => {
  try {
    await Post.findById(req.body.originalPostId, async (err, firstResp) =>
      err
        ? res.status(500).send(err)
        : await Post.findByIdAndUpdate(
            req.body.originalPostId,
            {
              $set: {
                dislikes: firstResp.dislikes.filter(
                  (userId) => userId != req.body.usernameId
                ),
              },
            },
            { new: true },
            (err, secondResp) =>
              err ? res.status(500).send(err) : res.status(200).send(secondResp)
          )
    )
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(500).send(err);
  }
});

// save and desave post

router.put("/savePost", async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.body.usernameId,
      { $addToSet: { savedPosts: req.body.originalPostId } },
      { new: true },
      (err, firstResp) =>
        err ? res.status(500).send(err) : res.status(500).send(firstResp)
    )
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

// desaveing a post

router.put("/desavePost", async (req, res) => {
  try {
    await User.findById(req.body.usernameId, async (err, firstResp) =>
      err
        ? res.status(500).send(err)
        : await User.findByIdAndUpdate(
            req.body.usernameId,
            {
              $set: {
                savedPosts: firstResp.savedPosts.filter(
                  (postId) => postId != req.body.originalPostId
                ),
              },
            },
            { new: true },
            (err, lastResp) =>
              err ? res.status(500).send(err) : res.status(200).send(lastResp)
          )
    )
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
