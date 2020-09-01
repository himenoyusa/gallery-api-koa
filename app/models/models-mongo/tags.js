const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const tagSchema = new Schema({
  __v: { type: Number, select: false },
  tag: { type: String, required: true },
  avatar_url: String,
});

module.exports = model("Tag", tagSchema);
