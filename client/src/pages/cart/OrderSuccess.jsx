import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const OrderSuccess = () => {
  return (
    <div className="container mx-auto py-20 flex flex-col items-center text-center">
      {/* Success Icon */}
      <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-full shadow-lg mb-6 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          className="w-16 h-16"
        >
          <path d="M9.9 18.3L3.5 11.8l1.4-1.4 5 5 8-8 1.4 1.4z" />
        </svg>
      </div>

      {/* Success Message */}
      <Typography
        variant="h4"
        className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4"
      >
        Order Placed Successfully!
      </Typography>
      <Typography variant="body1" className="text-lg text-gray-600 mb-6">
        Thank you for your order! Your order is being processed and will be
        delivered soon.
      </Typography>

      {/* Button */}
      <Link
        to="/"
        className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-300 mt-5"
      >
        Go to Home
      </Link>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 w-full h-48 "></div>
    </div>
  );
};

export default OrderSuccess;
