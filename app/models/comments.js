const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const commentSchema = new Schema(
  {
    __v: { type: Number, select: false },
    content: { type: String, required: true },
    commenter: { type: Schema.Types.ObjectId, ref: "User", required: true },
    picture_id: { type: String, required: true },
    createdAt: Number,
    updatedAt: Number,
  },
  {
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
  }
);

module.exports = model("Comment", commentSchema);
