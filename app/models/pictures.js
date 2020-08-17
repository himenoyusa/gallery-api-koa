const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  __v: { type: Number, select: false },
  pic_dir: { type: String, required: true },
  thumb_dir: { type: String, required: true },
  total_score: { type: Number, default: 0 },
  created_by: { type: String, required: true },
  limit: { type: Boolean, default: false },
});

module.exports = model("Picture", userSchema);
