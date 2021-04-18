const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  id: { type: Number },
  Author: { type: String },
  Title: { type: String },
  Description: { type: String },
});

module.exports = mongoose.model("Project", ProjectSchema);
