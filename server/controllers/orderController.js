const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const { shippingInfo, orderItems, totalPrice, paymentInfo } = req.body;
  if (paymentInfo.method === "UPI") {
    if (!paymentInfo.Image) {
      return next(new ErrorHander("Upload the payment screenshot", 400));
    }

    paymentInfo.status = "Succeed";
  } else if (paymentInfo.method === "COD") {
    paymentInfo.Image = undefined;
    paymentInfo.status = "Pending";
  }

  if (!["COD", "UPI"].includes(paymentInfo.method)) {
    return next(new ErrorHander("Invalid payment method", 400));
  }

  const paidAt = Date.now();
  const order = await Order.create({
    shippingInfo,
    orderItems,
    totalPrice,
    paymentInfo,
    paidAt,
    user: req.user._id,
  });

  const user = await User.findById(req.user._id);

  res.status(200).json({
    success: true,
    order,
  });
});

// Get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHander("Order not found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged-in user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// Get all orders -- Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find().select("-paymentInfo");

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// Update order status -- Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this ID", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    for (const item of order.orderItems) {
      await updateStock(item.product, item.quantity);
    }
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Update product stock
async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}

// Delete order -- Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHander("Order not found with this ID", 404));
  }

  await order.deleteOne();

  res.status(200).json({
    success: true,
  });
});

// Bulk update order status
exports.bulkUpdateOrders = catchAsyncErrors(async (req, res, next) => {
  const { orderIds, status } = req.body;

  const orders = await Order.updateMany(
    { _id: { $in: orderIds } },
    { orderStatus: status },
    { new: true }
  );

  res.status(200).json({
    success: true,
    orders,
  });
});
