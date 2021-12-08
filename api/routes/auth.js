const router = require("express").Router();
const UserImg = require("../models/UserImg");
const SocialMedia = require("../models/SocialMedia");
const bcrypt = require("bcrypt");
const UserInfo = require("../models/UserInfo");
const User = require("../models/User");


// registeration

router.post("/register", async (req, res) => {
  try {
    (!req.body || req.body === "") && res.status(500).json({ err: "update body" });

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
      isPrivate: req.body.isPrivate,
    });

    await newUser
      .save(async (err, newUser) => {
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
                        await newUserImgs.save(async (err, newUserImgs) => {
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


// login

router.post('/login', async (req, res) => {
  try {
    (!req.body || req.body === "") &&
      res.status(500).send({ error: "fill the body" });
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).send({ error: "Wrong Credentials" });

    const passValidation = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !passValidation && res.status(400).send({ error: "Wrong Credentials" });

    const { password, ...others} = user._doc;
    res.status(200).send(others); 
    
  } catch (error) {
    res.status(500).send({error: error})
  }

})

module.exports = router;
