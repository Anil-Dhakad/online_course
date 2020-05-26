var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var courseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    skills: {
      type: Array,
      ref: "Skill",
      default: [],
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    photo: {
      type: String,
      trim: true,
      required: true,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
