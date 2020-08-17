const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  password: { type: String, required: true, select: false },
  avatar_url: { type: String },
  gender: { type: String, enum: ["男", "女", "其他"], default: "其他" },
  headline: { type: String },
  age: { type: Number, default: 0, select: false },
  locations: { type: [{ type: String }], select: false },
  business: { type: String, select: false },
  verified: { type: Boolean, default: false },
  level: { type: String, enum: ["guest", "vip", "admin"], default: "guest" },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    select: false,
  },
});

module.exports = model("User", userSchema);
