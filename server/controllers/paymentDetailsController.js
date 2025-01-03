const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const PaymentDetails = require("../models/paymentDetailsModel.js");

exports.getPaymentDetails = catchAsyncErrors(async (req, res) => {
  const paymentDetails = await PaymentDetails.findOne();
  res.status(200).json(paymentDetails);
});

exports.updatePaymentDetails = catchAsyncErrors(async (req, res) => {
  const { upiId, qrCode, whatsappNo } = req.body;

  let paymentDetails = await PaymentDetails.findOne();

  if (!paymentDetails) {
    paymentDetails = new PaymentDetails({ upiId, qrCode, whatsappNo });
  } else {
    paymentDetails.upiId = upiId;
    paymentDetails.qrCode = qrCode;
    paymentDetails.whatsappNo = whatsappNo;
  }

  await paymentDetails.save();

  res.status(200).json({
    success: true,
    paymentDetails,
  });
});
