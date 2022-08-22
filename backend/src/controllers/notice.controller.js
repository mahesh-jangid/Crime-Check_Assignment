const express = require("express");
const router = express.Router();

const Notice = require("../models/notice.model.js");

router.get("/all", async (req, res) => {
  try {
    const post = await Notice.find().populate("UserId").lean().exec();
    // const post = await Notice.find().populate("UserId").exec();
    console.log(post);
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});
router.post("/create", async (req, res) => {
  try {
    const post = await Notice.create(req.body);
    return res.status(200).send(post);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = router;
