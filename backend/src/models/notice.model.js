const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema(
  {
    notice_Title: { type: String, required: true },
    date: {
      type: Date,
      default: Date.now,
    },
    UserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("notice", NoticeSchema, "notice");
