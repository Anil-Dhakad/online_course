var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var skillSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Skill", skillSchema);
