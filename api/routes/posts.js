const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");
const Comment = require("../models/Comment");
const Category = require("../models/Category");

// get posts for main page or user page or getting base on categories or searching for categories


// create post

router.post("/createPost", async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      desc: req.body.desc,
      photo: req.body.photo,
      username: req.body.username,
    });

    // const unUsedCategories = [];
    const categories = req.body.categories;
    // checking for existing categories and create new ones
    await post.save(async (err, RESP) => {
      err && res.status(500).send(err);
      await Category.find({}, async (err, firstResp) => {
        if (err) res.status(500).send(err);
        else {
          const oldCatIds = [];
          const newCategories = categories.filter(
            (cat) => !firstResp.map((element) => element.name).includes(cat)
          );
          categories
            .filter((cat) =>
              firstResp.map((element) => element.name).includes(cat)
            )
            .forEach((secondCat) =>
              firstResp.map(
                (thirdCat) =>
                  thirdCat.name === secondCat && oldCatIds.push(thirdCat._id)
              )
            );
          const newCats = newCategories.map(
            (element) => new Category({ name: element })
          );
          if (newCats.length !== 0) {
            Category.insertMany(newCats, async (err, secondResp) => {
              err && res.status(500).send(err);
              const catsIds = [
                ...oldCatIds,
                ...secondResp.map((element) => element._id),
              ];
              await Post.findByIdAndUpdate(
                RESP._id,
                { $set: { categories: catsIds } },
                { new: true },
                async (err) => {
                  err && res.status(500).send(err);
                  await User.findByIdAndUpdate(
                    req.body.username,
                    { $addToSet: { posts: RESP } },
                    { new: true },
                    (err, lastResp) =>
                      err
                        ? res.status(500).send(err)
                        : res.status(200).send(RESP)
                  );
                }
              );
            });
          } else {
            await Post.findByIdAndUpdate(
              RESP._id,
              { $set: { categories: oldCatIds } },
              { new: true },
              async (err) => {
                err && res.status(500).send(err);
                await User.findByIdAndUpdate(
                  req.body.username,
                  { $addToSet: { posts: RESP } },
                  { new: true },
                  (err, lastResp) =>
                    err
                      ? res.status(500).send(err)
                      : res.status(200).send(lastResp)
                );
              }
            );
          }
        }
      })
        .clone()
        .catch(function (err) {
          res.status(500).send(err);
        });
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// // edit post

router.put("/:postId", async (req, res) => {
  try {
    const post = {
      title: req.body.title,
      desc: req.body.desc,
      photo: req.body.photo,
    };

    await Category.find({}, async (err, firstResp) => {
      if (err) res.status(500).send(err);
      else {
        const usedCatsIds = firstResp
          .filter((element) => req.body.categories.includes(element.name))
          .map((cat) => cat._id);

        const newCats = req.body.categories
          .filter(
            (element) => !firstResp.map((cat) => cat.name).includes(element)
          )
          .map((cat) => new Category({ name: cat }));

        // res.status(200).send(newCats);
        if (newCats.length !== 0) {
          await Category.insertMany(newCats, async (err, secondResp) => {
            err && res.status(500).send(err);
            const catsIds = [
              ...usedCatsIds,
              ...secondResp.map((element) => element._id),
            ];
            // res.status(200).send(catsIds);
            await Post.findByIdAndUpdate(
              req.params.postId,
              { $set: { categories: catsIds }, $set: post },
              { new: true },
              (err, thirdResp) =>
                err
                  ? res.status(500).send(err)
                  : res.status(200).send(thirdResp)
            );
          });
        } else {
          // res.status(200).send(catsIds);
          await Post.findByIdAndUpdate(
            req.params.postId,
            { $set: { categories: usedCatsIds }, $set: post },
            { new: true },
            (err, thirdResp) =>
              err ? res.status(500).send(err) : res.status(200).send(thirdResp)
          );
        }
      }
    })
      .clone()
      .catch((err) => res.status(500).send(err));
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
    console.log("00");
    await User.findOne(
      {
        posts: {
          $in: req.params.postId,
        },
      },
      async (err, firstResp) => {
        if (err) res.status(500).send(err);
        else {
          const postsIds = firstResp.posts.filter(
            (element) => !firstResp.posts.includes(req.params.postId)
          );
          await User.findByIdAndUpdate(
            firstResp._id,
            { $set: { posts: postsIds } },
            { new: true },
            async (err, secondResp) => {
              err && res.status(500).send(err);
              await Post.findByIdAndDelete(req.params.postId, (err) =>
                err
                  ? res.status(500).json(err)
                  : res
                      .status(200)
                      .send({ success: "The post has been deleted!" })
              );
            }
          );
        }
      }
    )
      .clone()
      .catch(function (err) {
        res.status(500).send(err);
      });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
