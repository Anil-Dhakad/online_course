var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
