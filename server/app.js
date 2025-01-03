const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const errorMiddleware = require("./middleware/error");

const LOCALHOST_URL = process.env.LOCALHOST_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

app.use(helmet());
app.use(
  cors({
    origin: LOCALHOST_URL || FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    exposedHeaders: ["Authorization"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const contactRoutes = require("./routes/contactRoutes");
const aboutUs = require("./routes/aboutUs");
const paymentDetails = require("./routes/paymentDetailsRoute");
const adminRoutes = require("./routes/adminRoutes");

app.use("/api/se", product);
app.use("/api/se", user);
app.use("/api/se", order);
app.use("/api/se", contactRoutes);
app.use("/api/se", aboutUs);
app.use("/api/se", paymentDetails);
app.use("/api/se", adminRoutes);

app.use((err, req, res, next) => {
  if (err.type === "entity.too.large") {
    return res.status(413).json({
      success: false,
      message: "Payload too large. Please upload smaller files.",
    });
  }
  next(err);
});
app.use(errorMiddleware);

module.exports = app;
