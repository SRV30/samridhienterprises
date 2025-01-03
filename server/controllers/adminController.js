const User = require("../models/userModel");
const Product = require("../models/productModel");
const Order = require("../models/orderModel");

exports.getAdminData = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();

    const productsCount = await Product.countDocuments();

    const ordersCount = await Order.countDocuments();

    const earnings = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalEarnings: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const formattedEarnings = earnings.map((item) => ({
      month: new Date(0, item._id - 1).toLocaleString("default", {
        month: "long",
      }),
      amount: item.totalEarnings,
    }));

    res.json({
      usersCount,
      productsCount,
      ordersCount,
      earnings: formattedEarnings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
