const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const pictureSchema = new Schema(
  {
    __v: { type: Number, select: false },
    pic_dir: { type: String, required: true },
    thumb_dir: { type: String, required: true },
    total_score: { type: Number, default: 0 },
    created_by: { type: Schema.Types.ObjectId, ref: "User" },
    limit: { type: Boolean, default: false },
    tags: {
      type: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
      select: false,
    },
    createdAt: Number,
    updatedAt: Number,
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

module.exports = model("Picture", pictureSchema);
