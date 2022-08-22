const express = require("express");
const { body, validationResult } = require("express-validator");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const users = await User.find().lean().exec();
    res.status(200).send(users);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(500).send({ error: "Fields can not be empty" });
    }

    const user = await User.findOne({ name: name });

    if (!user) {
      return res.status(500).send({ error: "User does not exist" });
    } else {
      if (user.name == name) {
        return res.status(200).send({
          name: user.name,
          _id: user._id,
          isLoggedIn: true,
          status: "Login Success",
        });
      } else {
        return res.status(500).send({ error: "Invalid credentials provided" });
      }
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.post(
  "/register",
  body("name", "username should not contain special words").isAlphanumeric(
    "en-IN",
    { ignore: " " }
  ),
  // Basic check
  body("password", "Invalid password").notEmpty().isLength({ min: 5 }),
  async (req, res) => {
    {
      try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const user = await User.create({
          name: req.body.name,
          password: bcrypt.hashSync(req.body.password, 8),
        });
        return res.status(200).send(user);
      } catch (err) {
        return res.status(500).send(err.message);
      }
    }
  }
);

module.exports = router;
