const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  id: { type: Number },
  Author: { type: String },
  Comment: { type: String },
  status: { type: Boolean },
});

module.exports = mongoose.model("Answer", AnswerSchema);
