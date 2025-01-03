const mongoose = require("mongoose");

const paymentDetailsSchema = new mongoose.Schema({
  upiId: {
    type: String,
    required: true,
  },
  qrCode: {
    type: String, 
    required: true,
  },
  whatsappNo: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PaymentDetails", paymentDetailsSchema);