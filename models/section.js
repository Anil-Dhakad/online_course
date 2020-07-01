const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var sectionSchema = new mongoose.Schema(
  {
    couseId: {
      type: ObjectId,
      ref: "Course",
      required: true,
    },
    sectionNo: {
      type: Number,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Section", sectionSchema);
