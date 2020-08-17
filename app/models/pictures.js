const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const pictureSchema = new Schema({
  __v: { type: Number, select: false },
  pic_dir: { type: String, required: true },
  thumb_dir: { type: String, required: true },
  total_score: { type: Number, default: 0 },
  created_by: { type: Schema.Types.ObjectId, ref: "User" },
  limit: { type: Boolean, default: false },
  tags: { type: [{ type: Schema.Types.ObjectId, ref: "Tag" }] },
});

module.exports = model("Picture", pictureSchema);
