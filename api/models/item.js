const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: { type: String, required: true },
  name: { type: String, required: true },
  note: { type: String, default: null },
  image: { type: String, default: null },
});

module.exports = mongoose.model("Item", itemSchema);
