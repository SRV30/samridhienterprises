const mongoose = require("mongoose");

const aboutUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  whatsapp: { type: String, required: true },
  photoLink: { type: String },
  address: { type: String },
  mapLink: { type: String },
});

module.exports = mongoose.model("AboutUs", aboutUsSchema);
