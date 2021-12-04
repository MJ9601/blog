const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");
const Comment = require("../models/Comment");

// get posts for main page or user page or getting base on categories or searching for categories
router.post("/", async (req, res) => {
  try {
    let posts;
    const usernameId = await User.find(
      { username: req.query.user },
      (err, resp) => (err ? res.status(500).send(err) : resp._id)
    );
    const catId = await Category.find({ title: req.query.cat }, (err, resp) =>
      err ? res.status(500).send(err) : resp._id
    );

    // get user posts
    if (usernameId) {
      posts = await Post.find(
        { username: usernameId },
        (err) => err && res.status(500).send(err)
      )
        .populate({ path: "username", model: "User" ,populate:{path:'useImgs'} })
        .exec((err, resp) => {
          if (err) res.status(500).send(err);
          else {
            const { password, ...others } = resp._doc;
            res.status(200).send(others);
          }
        });
    } else if (usernameId && catId) {
      // getting user posts from a category
      posts = await Post.find(
        {
          username: usernameId,
          categories: {
            $in: [catId],
          },
        },
        (err) => (err ? res.status(500).send(err) : res.status(200).send(posts))
      );
    } else if (catId) {
      // getting posts from a category using category search
      posts = await Post.find(
        {
          categories: {
            $in: [catId],
          },
        },
        (err) => (err ? res.status(500).send(err) : res.status(200).send(posts))
      );
    } else {
      // getting posts base on time piriod
      const start = req.body.startDate;
      const end = req.body.endDate;
      posts = await Post.find(
        {
          created_on: { $gte: new Date(start), $lt: new Date(end) },
        },
        (err) => (err ? res.status(500).send(err) : res.status(200).send(posts))
      );
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

// get a post using its id

router.get("/:postId", async (req, res) => {
  try {
    const targetPost = await Post.findById(req.params.postId, (err) =>
      err ? res.status(500).send(err) : res.status(200).send(targetPost)
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

// create post

router.post("/createPost", async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      desc: req.body.desc,
      photo: req.body.photo,
      username: [req.body.userId],
    });

    await post.save((err, resp) =>
      err ? res.status(500).send(err) : res.status(200).send(resp)
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

// edit post

router.put("/:postId", async (req, res) => {
  try {
    const updatedPost = {
      title: req.body.title,
      desc: req.body.desc,
      photo: req.body.photo,
    };
    await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: updatedPost },
      { new: true },
      (err, resp) =>
        err ? res.status(500).json(err) : res.status(200).json(resp)
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

// delete post

router.delete("/:postId", async (req, res) => {
  try {
    await Like.deleteMany({ originalPost: req.body.postId });
    await Dislike.deleteMany({ originalPost: req.body.postId });
    await Comment.deleteMany({ originalPost: req.body.postId });

    await Post.findByIdAndDelete(req.params.postId, (err) =>
      err
        ? res.status(500).json(err)
        : res.status(200).send({ success: "The post has been deleted!" })
    );
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
