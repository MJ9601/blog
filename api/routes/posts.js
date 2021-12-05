const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Like = require("../models/Like");
const Dislike = require("../models/Dislike");
const Comment = require("../models/Comment");
const Category = require("../models/Category");

// get posts for main page or user page or getting base on categories or searching for categories
router.get("/", async (req, res) => {
  try {
    let posts;
    await User.findOne({ username: req.query.user })
      .populate({
        path: "userImgs",
        model: "UserImg",
      })
      .populate({ path: "posts", model: "Post" })
      .exec((err, resp) =>
        err ? res.status(500).send(err) : res.status(200).send(resp)
      );

    // const catId = await Category.findOne(
    //   { title: req.query.cat },
    //   (err, resp) => (err ? res.status(500).send(err) : resp._id)
    // )
    //   .clone()
    //   .catch((err) => res.status(500).send(err));

    // get user posts
    if (usernameId) {
      // await Post.find({ username: usernameId }, (err, resp) =>
      //   err ? res.status(500).send(err) : res.send(resp)
      // );
      // .populate({
      //   path: "username",
      //   model: "User",
      //   populate: { path: "useImgs", model: "UserImg" },
      // })
      // .exec((err, resp) => {
      //   if (err) res.status(500).send(err);
      //   else {
      //     // const { password, ...others } = resp._doc;
      //     res.status(200).send(resp);
      //   }
      // });
    } else if (usernameId && catId) {
      // // getting user posts from a category
      // await Post.find(
      //   {
      //     username: usernameId,
      //     categories: {
      //       $in: [catId],
      //     },
      //   },
      //   (err) => err && res.status(500).send(err)
      // )
      //   .populate({
      //     path: "username",
      //     model: "User",
      //     populate: { path: "useImgs", model: "UserImg" },
      //   })
      //   .exec((err, resp) => {
      //     if (err) res.status(500).send(err);
      //     else {
      //       const { password, ...others } = resp._doc;
      //       res.status(200).send(others);
      //     }
      //   });
    } else if (catId) {
      // // getting posts from a category using category search
      // await Post.find(
      //   {
      //     categories: {
      //       $in: [catId],
      //     },
      //   },
      //   (err) => err && res.status(500).send(err)
      // )
      //   .populate({
      //     path: "username",
      //     model: "User",
      //     populate: { path: "useImgs", model: "UserImg" },
      //   })
      //   .exec((err, resp) => {
      //     if (err) res.status(500).send(err);
      //     else {
      //       const { password, ...others } = resp._doc;
      //       res.status(200).send(others);
      //     }
      //   });
    } else if (req.body === "" || !req.body) {
      // // get all posts
      // await Post.find({}, (err) => err && res.status(500).send(err))
      //   .populate({
      //     path: "username",
      //     model: "User",
      //     populate: { path: "useImgs", model: "UserImg" },
      //   })
      //   .exec((err, resp) => {
      //     if (err) res.status(500).send(err);
      //     else {
      //       const { password, ...others } = resp._doc;
      //       res.status(200).send(others);
      //     }
      //   });
    } else {
      // // getting posts base on time piriod
      // const start = req.body.startDate;
      // const end = req.body.endDate;
      // await Post.find(
      //   {
      //     created_on: { $gte: new Date(start), $lt: new Date(end) },
      //   },
      //   (err) => err && res.status(500).send(err)
      // )
      //   .populate({
      //     path: "username",
      //     model: "User",
      //     populate: { path: "useImgs", model: "UserImg" },
      //   })
      //   .exec((err, resp) => {
      //     if (err) res.status(500).send(err);
      //     else {
      //       const { password, ...others } = resp._doc;
      //       res.status(200).send(others);
      //     }
      //   });
    }
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

// // get a post using its id

// router.get("/:postId", async (req, res) => {
//   try {
//     await Post.findById(
//       req.params.postId,
//       (err) => err && res.status(500).send(err)
//     )
//       .populate({ path: "comments", model: "Comment" })
//       .populate({ path: "categories", model: "Category" })
//       .populate({
//         path: "username",
//         model: "User",
//         populate: { path: "useImgs", model: "UserImg" },
//       })
//       .exec((err, resp) => {
//         if (err) res.status(500).send(err);
//         else {
//           const { password, ...others } = resp._doc;
//           res.status(200).send(others);
//         }
//       });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

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
                        : res.status(200).send(lastResp)
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
