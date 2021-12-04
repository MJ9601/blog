const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");
const Comment = require("../models/Comment");
const Category = require("../models/Category");

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
      await Post.find(
        { username: usernameId },
        (err) => err && res.status(500).send(err)
      )
        .populate({
          path: "username",
          model: "User",
          populate: { path: "useImgs", model: "UserImg" },
        })
        .exec((err, resp) => {
          if (err) res.status(500).send(err);
          else {
            const { password, ...others } = resp._doc;
            res.status(200).send(others);
          }
        });
    } else if (usernameId && catId) {
      // getting user posts from a category
      await Post.find(
        {
          username: usernameId,
          categories: {
            $in: [catId],
          },
        },
        (err) => err && res.status(500).send(err)
      )
        .populate({
          path: "username",
          model: "User",
          populate: { path: "useImgs", model: "UserImg" },
        })
        .exec((err, resp) => {
          if (err) res.status(500).send(err);
          else {
            const { password, ...others } = resp._doc;
            res.status(200).send(others);
          }
        });
    } else if (catId) {
      // getting posts from a category using category search
      await Post.find(
        {
          categories: {
            $in: [catId],
          },
        },
        (err) => err && res.status(500).send(err)
      )
        .populate({
          path: "username",
          model: "User",
          populate: { path: "useImgs", model: "UserImg" },
        })
        .exec((err, resp) => {
          if (err) res.status(500).send(err);
          else {
            const { password, ...others } = resp._doc;
            res.status(200).send(others);
          }
        });
    } else {
      // getting posts base on time piriod
      const start = req.body.startDate;
      const end = req.body.endDate;
      await Post.find(
        {
          created_on: { $gte: new Date(start), $lt: new Date(end) },
        },
        (err) => err && res.status(500).send(err)
      )
        .populate({
          path: "username",
          model: "User",
          populate: { path: "useImgs", model: "UserImg" },
        })
        .exec((err, resp) => {
          if (err) res.status(500).send(err);
          else {
            const { password, ...others } = resp._doc;
            res.status(200).send(others);
          }
        });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

// get a post using its id

router.get("/:postId", async (req, res) => {
  try {
    await Post.findById(
      req.params.postId,
      (err) => err && res.status(500).send(err)
    )
      .populate({ path: "comments", model: "Comment" })
      .populate({ path: "categories", model: "Category" })
      .populate({
        path: "username",
        model: "User",
        populate: { path: "useImgs", model: "UserImg" },
      })
      .exec((err, resp) => {
        if (err) res.status(500).send(err);
        else {
          const { password, ...others } = resp._doc;
          res.status(200).send(others);
        }
      });
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
    const unUsedCategories = [];
    const categoryIds = [];

    // checking for existing categories
    req.body.categories.forEach(async (cat) => {
      await Category.find({ name: cat }, (err, resp) =>
        err ? unUsedCategories.push(cat) : categoryIds.push(cat._id)
      );
    });

    // create new categoreis
    const newCategories = unUsedCategories.map(
      async (cat) => new Category({ $set: cat })
    );

    // save post and categories and refer categories to post
    await post.save(async (err, firstResp) => {
      if (err) res.status(500).send(err);
      else {
        await Category.insertMany(newCategories, async (err, secondResp) => {
          if (err) res.status(500).send(err);
          else {
            categoryIds = [...categoryIds, ...secondResp._id];
            await Post.findByIdAndUpdate(
              firstResp._id,
              { categories: categoryIds },
              (err, lastResp) =>
                err ? res.status(500).send(err) : res.status(200).send(lastResp)
            );
          }
        });
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// edit post

router.put("/:postId", async (req, res) => {
  try {
    const updatedCategoriesIds = req.body.categories.map(async (cat) => {
      await Category.find({ name: cat }, async (err, firstResp) => {
        if (firstResp) firstResp._id;
        else {
          const newCat = new Category(cat);
          await newCat.save((err, secondResp) =>
            err ? res.status(500).json(err) : secondResp._id
          );
        }
      });
    });

    const updatedPost = {
      title: req.body.title,
      desc: req.body.desc,
      photo: req.body.photo,
    };
    await Post.findByIdAndUpdate(
      req.params.postId,
      { $set: updatedPost },
      { new: true },
      async (err, firstResp) => {
        if (err) res.status(500).json(err);
        else {
          await Post.findByIdAndUpdate(
            firstResp._id,
            {
              categories: { $set: updatedCategoriesIds },
            },
            { new: true },
            (err, secondResp) =>
              err ? res.status(500).send(err) : res.status(500).send(secondResp)
          );
        }
      }
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
