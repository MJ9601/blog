const router = require("express").Router();
const UserImg = require("../modules/UserImg");
const SocialMedia = require("../modules/SocialMedia");
const bcrypt = require("bcrypt");
const UserInfo = require("../modules/UserInfo");
const User = require("../modules/User");

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  const { password, ...others } = user._doc;
  res.status(200).send(others);
});

// update profile

router.put("/:id", async (req, res) => {
  try {
    (!req.body || req.body === "") &&
      res.status(500).json({ err: "update body" });

    const user = await User.findById(req.params.id);
    !(user._id == req.body.id) &&
      res.status(401).send({ error: "You can't edit this account" });

    const passValidation = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !passValidation && res.status(401).send({ error: "Password is Wrong!" });

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.newpassword, salt);

    const userId = user._id;
    const userImgsId = user.userImgs[0];
    const userInfosId = user.userInfos[0];
    const userInfo = await UserInfo.findById(userInfosId);
    const userSocialMediaId = userInfo.socialMedias[0];

    const updateUserImgs = {
      avatarImg: req.body.avatarImg,
      homeImg: req.body.homeImg,
      backgroundImg: req.body.backgroundImg,
    };

    const updateSocialMedia = {
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      tiwtter: req.body.tiwtter,
      pinterest: req.body.pinterest,
    };

    const updateUserInfo = {
      fullname: req.body.fullname,
      aboutMe: req.body.aboutMe,
      career: req.body.career,
      passions: req.body.passions,
    };
    const updateUser = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    };
    await UserInfo.findByIdAndUpdate(
      userInfosId,
      { $set: updateUserInfo },
      async (err) => {
        if (err) res.status(502).send(err);
        else {
          await SocialMedia.findByIdAndUpdate(
            userSocialMediaId,
            { $set: updateSocialMedia },
            async (err) => {
              if (err) res.status(502).send(err);
              else {
                await UserImg.findByIdAndUpdate(
                  userImgsId,
                  { $set: updateUserImgs },
                  async (err) => {
                    if (err) res.status(500).send(err);
                    else {
                      await User.findByIdAndUpdate(
                        userId,
                        { $set: updateUser },
                        async (err) => {
                          if (err) res.status(500).send(err);
                          else {
                            const { password, ...others } = user._doc;
                            res.status(502).json({ success: others });
                          }
                        }
                      )
                        .clone()
                        .catch(function (err) {
                          res.status(500).send(err);
                        });
                    }
                  }
                )
                  .clone()
                  .catch(function (err) {
                    res.status(500).send(err);
                  });
              }
            }
          )
            .clone()
            .catch(function (err) {
              res.status(500).send(err);
            });
        }
      }
    )
      .clone()
      .catch(function (err) {
        res.status(500).send(err);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

// remove profile
router.delete("/:id", async (req, res) => {
  try {
    (!req.body || req.body === "") &&
      res.status(500).json({ err: "update body" });

    const user = await User.findById(req.params.id);
    !(user._id == req.body.id) &&
      res.status(401).send({ error: "You can't edit this account" });

    console.log(user);
    const passValidation = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !passValidation && res.status(401).send({ error: "Password is Wrong!" });
    console.log("000000000");

    const userId = user._id;
    const userImgsId = user.userImgs[0];
    const userInfosId = user.userInfos[0];
    const userInfo = await UserInfo.findById(userInfosId);
    const userSocialMediaId = userInfo.socialMedias[0];

    await UserInfo.findByIdAndDelete(userInfosId, async (err) => {
      if (err) res.status(502).send(err);
      else {
        await SocialMedia.findByIdAndDelete(userSocialMediaId, async (err) => {
          if (err) res.status(502).send(err);
          else {
            await UserImg.findByIdAndDelete(userImgsId, async (err) => {
              if (err) res.status(500).send(err);
              else {
                await User.findByIdAndDelete(userId, async (err) => {
                  if (err) res.status(500).send(err);
                  else {
                    res.status(200).send({
                      success: "profile successfully deleted",
                    });
                  }
                })
                  .clone()
                  .catch(function (err) {
                    res.status(500).send(err);
                  });
              }
            })
              .clone()
              .catch(function (err) {
                res.status(500).send(err);
              });
          }
        })
          .clone()
          .catch(function (err) {
            res.status(500).send(err);
          });
      }
    })
      .clone()
      .catch(function (err) {
        res.status(500).send(err);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
