const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const connectDatabase = require("./config/database");
const errorMiddleware = require("./middleware/error");

// Initialize the app
const app = express();

// Environment Variables
const LOCALHOST_URL = process.env.LOCALHOST_URL;
const FRONTEND_URL = process.env.FRONTEND_URL;

// Middleware
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

// Error Handling for Payload Too Large
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

// Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Database Connection
connectDatabase();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Start the Server
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});

// Handle Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.error(`Error: ${err.message}`);
  console.error(`Shutting down the server due to Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
