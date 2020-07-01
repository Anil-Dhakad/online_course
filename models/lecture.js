const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var lectureSchema = new mongoose.Schema(
  {
    sectionId: {
      type: ObjectId,
      ref: "Section",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    video: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lecture", lectureSchema);
