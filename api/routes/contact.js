const router = require("express").Router();
const User = require("../models/User");
const Message = require("../models/Message");
const bcrypt = require("bcrypt");

// handeling forget password

router.put("/", async (req, res) => {
  try {
    await User.findOneAndUpdate({ username: req.query.username });
  } catch (err) {
    res.status(500).send(err);
  }
});

// contact section

module.exports = router;
