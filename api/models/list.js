const mongoose = require("mongoose");

const listSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  dateCreated: { type: String, required: true },
  monthCreated: { type: String, required: true },
  categories: [],
  items: [],
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("List", listSchema);
