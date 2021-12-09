const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const MailSender = require("./sendMail");
const {
  remotebuildexecution,
} = require("googleapis/build/src/apis/remotebuildexecution");

// handeling forget password

router.put("/", async (req, res) => {
  try {
    const newPass = Math.floor(
      Math.random() * (Math.pow(10, 6) - Math.pow(10, 5)) + Math.pow(10, 5)
    );
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(newPass.toString(), salt);

    await User.findOneAndUpdate(
      { username: req.query.username },
      { $set: { password: hashedPass } },
      { new: true },
      async (err, resp) =>
        err
          ? res.status(500).send(err)
          : await MailSender({
              senderAddress: "BlogAway",
              recieverAddress: resp.email,
              subject: "Changing password",
              mailText: `This mail has been sent due to your request for changing your account password, your new password is '${newPass}'`,
              mailHtml: `<h1> This mail has been sent due to your request for changing your account password,</h1> <h2> your new password is</h2> <h1><b> '${newPass}'</b></h1>`,
            }).then(res.status(200).send("email sent ..."))
    )
      .clone()
      .catch((err) => res.status(500).send(err));
  } catch (err) {
    res.status(500).send(err);
  }
});

// contact section
router.post("/contactUs", async (req, res) => {
  try {
    const mail = await MailSender({
      senderAddress: req.body.email,
      recieverAddress: "mj.khodadadi.1996@gmail.com",
      subject: req.body.subject,
      mailText: req.body.text,
      mailHtml: `<h5> ${req.body.fullname}  ${req.body.subject} </h5> <h4><b> '${req.body.text}'</b></h4> <h6> ${req.body.email} </h6>`,
    });
    res.status(200).send(mail);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
