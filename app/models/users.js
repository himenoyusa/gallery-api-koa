const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    __v: { type: Number, select: false },
    name: { type: String, required: true },
    password: { type: String, required: true, select: false },
    avatar_url: String,
    gender: { type: String, enum: ["男", "女", "其他"], default: "其他" },
    headline: String,
    age: { type: Number, default: 0, select: false },
    locations: { type: [{ type: String }], select: false },
    business: { type: String, select: false },
    verified: { type: Boolean, default: false },
    level: { type: String, enum: ["guest", "vip", "admin"], default: "guest" },
    following: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      select: false,
    },
    followPics: {
      type: [{ type: Schema.Types.ObjectId, ref: "Picture" }],
      select: false,
    },
    createdAt: { type: Number, select: false },
    updatedAt: { type: Number, select: false },
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

module.exports = model("User", userSchema);
