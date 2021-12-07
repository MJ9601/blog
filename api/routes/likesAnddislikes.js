const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Category = require("../models/Category");

// create like, dislile
// like
router.post("/like", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
});

// dislike
router.post("/dislike", async (req, res) => {
  try {
  } catch (error) {
    res.status(500).send(error);
  }
});

// delete like, dislile

module.exports = router;
