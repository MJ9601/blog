const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

// followeing
router.post("/following", async (req, res) => {
  try {
    await User.findById(req.body.profileOwnerId, async (err, firstResp) => {
      err && res.status(500).send(err);
      !firstResp.isPrivate
        ? await User.findByIdAndUpdate(
            req.body.requesterId,
            { $addToSet: { followings: req.body.profileOwnerId } },
            { new: true },
            async (err, secondResp) =>
              err
                ? res.status(500).send(err)
                : await User.findByIdAndUpdate(
                    req.body.profileOwnerId,
                    { $addToSet: { followers: req.body.requesterId } },
                    (err, thirdResp) =>
                      err
                        ? res.status(500).send(err)
                        : res.status(200).send(secondResp)
                  )
          )
        : await User.findByIdAndUpdate(
            req.body.profileOwnerId,
            {
              $addToSet: { requests: req.body.requesterId },
            },
            (err, secondResp) =>
              err
                ? res.status(500).send(err)
                : res.status(200).send("request has been sent")
          );
    })
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(500).send(err);
  }
});
// unfollowing

router.post("/unfollowing", async (req, res) => {
  try {
    await User.findById(req.body.profileOwnerId, async (err, firstResp) =>
      err
        ? res.status(500).send(err)
        : await User.findByIdAndUpdate(
            req.body.profileOwnerId,
            {
              $set: {
                followers: firstResp.followers.filter(
                  (userId) => userId != userTargetId
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
  } catch (err) {
    res.status(500).send(err);
  }
});
// blocking
router.post("/blocking", async (req, res) => {
  try {
    await User.findById(req.body.profileOwnerId, async (err, firstResp) =>
      err
        ? res.status(500).send(err)
        : await User.findByIdAndUpdate(
            req.body.profileOwnerId,
            {
              $set: {
                followers: firstResp.followers.filter(
                  (userId) => userId != req.body.userTargetId
                ),
                followings: firstResp.followings.filter(
                  (userId) => userId != req.body.userTargetId
                ),
                requests: firstResp.requests.filter(
                  (userId) => userId != req.body.userTargetId
                ),
              },
              $addToSet: { blockedUsers: userTargetId },
            },
            { new: true },
            async (err, secondResp) =>
              findById(req.body.userTargetId, async (err, thirdResp) =>
                err
                  ? res.status(500).send(err)
                  : await User.findByIdAndUpdate(
                      req.body.userTargetId,
                      {
                        $set: {
                          followers: thirdResp.followers.filter(
                            (userId) => userId != req.body.profileOwnerId
                          ),
                          followings: thirdResp.followings.filter(
                            (userId) => userId != req.body.profileOwnerId
                          ),
                          requests: thirdResp.requests.filter(
                            (userId) => userId != req.body.profileOwnerId
                          ),
                        },
                      },
                      (err, lastResp) =>
                        err
                          ? res.status(500).send(err)
                          : res.status(200).send(secondResp)
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
// unblocking
router.post("/unblocking", async (req, res) => {
  try {
    await User.findById(req.body.profileOwnerId, async (err, firstResp) =>
      err
        ? res.status(500).send(err)
        : await User.findByIdAndUpdate(
            req.body.profileOwnerId,
            {
              $set: {
                blockedUsers: firstResp.blockedUsers.filter(
                  (userId) => userId != userTargetId
                ),
              },
            },
            { new: true },
            (err, lastResp) =>
              err ? res.status(500).send(err) : res.status(200).send(lastResp)
          )
    );
  } catch (err) {
    res.status(500).send(err);
  }
});
// accepting request
// denying request
router.post("/handleRequest", async (req, res) => {
  try {
    await User.findById(req.body.profileOwnerId, async (err, firstResp) =>
      err
        ? res.status(500).send(err)
        : await User.findByIdAndUpdate(
            req.body.profileOwnerId,
            {
              $set: {
                requests: firstResp.requests.filter(
                  (userId) => userId != req.body.userTargetId
                ),
              },
            },
            { new: true },
            (err, secondResp) => {
              err && res.status(500).send(err);
              !req.body.isAccepted
                ? res.status(200).send({
                    userprofile: secondResp,
                    message: "request has been denyed!",
                  })
                : await User.findByIdAndUpdate(
                    req.body.profileOwnerId,
                    { $addToSet: { followers: req.body.userTargetId } },
                    { new: true },
                    async (err, thirdResp) =>
                      err
                        ? res.status(500).send(err)
                        : await User.findById(
                            req.body.userTargetId,
                            async (err, forthResp) =>
                              err
                                ? res.status(500).send(err)
                                : await User.findByIdAndUpdate(
                                    req.body.userTargetId,
                                    {
                                      $addToSet: { followings: firstResp._id },
                                    },
                                    { new: true },
                                    (err, lastResp) =>
                                      err
                                        ? res.status(500).send(err)
                                        : res.status(200).send({
                                            userProfile: secondResp,
                                            message:
                                              "request has been accepted",
                                          })
                                  )
                          )
                  );
            }
          )
    )
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
