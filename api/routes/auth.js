const router = require("express").Router();
const UserImg = require("../modules/UserImg");
const SocialMedia = require("../modules/SocialMedia");
const bcrypt = require("bcrypt");
const UserInfo = require("../modules/UserInfo");
const User = require("../modules/User");

router.post("/register", async (req, res) => {
  try {
    if (!req.body || req.body === "")
      res.status(500).json({ err: "update body" });
    console.log(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUserImgs = new UserImg({
      avatarImg: req.body.avatarImg,
      homeImg: req.body.homeImg,
      backgroundImg: req.body.backgroundImg,
    });

    const newSocialMedia = new SocialMedia({
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      tiwtter: req.body.tiwtter,
      pinterest: req.body.pinterest,
    });

    const newUserInfo = new UserInfo({
      fullname: req.body.fullname,
      aboutMe: req.body.aboutMe,
      career: req.body.career,
      passions: req.body.passions,
    });
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    // const userImg = await newUserImgs.save();
    // const userImgId = await userImg._id;
    // console.log(...userImgId);
    // res.send(userImg);
    await newUserImgs.save(async (err, newUserImgs) => {
      if (err) res.status(500).json(err);
      else {
        await newSocialMedia.save(async (err, newSocialMedia) => {
          if (err) res.status(500).json(err);
          else {
            await newUserInfo.save(async (err, newUserInfo) => {
              if (err) res.status(500).json(err);
              else {
                await UserInfo.findByIdAndUpdate(
                  newUserInfo._id,
                  {
                    socialMedias: newSocialMedia._id,
                  },
                  async (err, resp) => {
                    if (err) res.status(500).json(err);
                    else {
                      await newUser.save(async (err, newUser) => {
                        if (err) res.status(500).json(err);
                        else {
                          await User.findByIdAndUpdate(
                            newUser._id,
                            {
                              userImgs: newUserImgs._id,
                              userInfos: newUserInfo._id,
                            },
                            (err, response) =>
                              err
                                ? res.status(500).send(err)
                                : res.status(200).send(response)
                          );
                        }
                      });
                    }
                  }
                );
              }
            });
          }
        });
      }
    });

    // const newUser = new User({});
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
