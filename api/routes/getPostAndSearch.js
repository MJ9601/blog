const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");
const Comment = require("../models/Comment");
const Category = require("../models/Category");

// get post with user username
router.post("/", async (req, res) => {
  if (req.query.username && req.query.cat)
    await User.findOne({ username: req.query.username })
      .populate({
        path: "userImgs",
        model: "UserImg",
      })
      .populate({ path: "posts", model: "Post" })
      .exec(async (err, firstResp) => {
        err && res.status(500).send(err);
        await Category.findOne(
          { name: req.query.cat },
          async (err, secondResp) => {
            err
              ? res.status(500).send(err)
              : res.status(200).send({
                  username: firstResp.username,
                  userImgs: firstResp.userImgs,
                  posts: firstResp.posts.filter((post) =>
                    post.categories.includes(secondResp._id)
                  ),
                });
          }
        );
      });
  else if (req.query.username)
    await User.findOne({ username: req.query.username })
      .populate({
        path: "userImgs",
        model: "UserImg",
      })
      .populate({ path: "posts", model: "Post" })
      .exec((err, resp) => {
        err && res.status(500).send(err);
        const { password, ...others } = resp._doc;
        res.status(200).send(others);
      });
  // search
  else if (req.query.cat)
    await Category.findOne({ name: req.query.cat }, async (err, firstResp) => {
      err && res.status(500).send(err);
      await Post.find({
        catergories: {
          $in: firstResp._id,
        },
      })
        .populate({
          path: "username",
          model: "User",
          populate: { path: "userImgs", model: "UserImg" },
        })
        .exec((err, secondResp) =>
          err
            ? res.status(500).send(err)
            : res.status(200).send(
                secondResp.map((element) => ({
                  postIds: element._id,
                  title: element.title,
                  desc: element.desc,
                  author: element.username.username,
                  userImgs: element.username.userImgs,
                }))
              )
        );
    });
  else if (req.body === "")
    await Post.find({})
      .populate({
        path: "username",
        model: "User",
        populate: { path: "userImgs", model: "UserImg" },
      })
      .exec((err, secondResp) =>
        err
          ? res.status(500).send(err)
          : res.status(200).send(
              secondResp.map((element) => ({
                postIds: element._id,
                title: element.title,
                desc: element.desc,
                author: element.username.username,
                userImgs: element.username.userImgs,
              }))
            )
      );
  else {
    console.log(new Date(req.body.start));
    await Post.find({
      created_on: {
        $gte: new Date(req.body.start),
        $lt: new Date(req.body.end),
      },
    })
      .populate({
        path: "username",
        model: "User",
        populate: { path: "userImgs", model: "UserImg" },
      })
      .exec((err, secondResp) =>
        err
          ? res.status(500).send(err)
          : res.status(200).send(
              secondResp.map((element) => ({
                postIds: element._id,
                title: element.title,
                desc: element.desc,
                postDates: element.createdAt,
                author: element.username.username,
                userImgs: element.username.userImgs,
              }))
            )
      );
  }
});

// secondResp.map((element) =>
//   Object.keys(element.username)
//     .filter((key) => !Object.keys(element.username).includes("passwrod"))
//     .reduce((obj, key) => {
//       obj[key] = element.username[key];
//       return obj;
//     }, {})
// );

// get posts using categories

// router.get("/", async (req, res) => {

// });

module.exports = router;
