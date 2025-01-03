import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyOrders } from "@/store/orders/orderSlice";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    orders: myOrders = [],
  } = useSelector((state) => state.order); // Default to an empty array

  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);

  return (
    <div className="container mx-auto py-12 px-4">
      <Typography
        variant="h4"
        className="text-3xl font-bold text-center text-blue-500 mb-8"
      >
        My Orders
      </Typography>

      {loading ? (
        <div className="text-blue-500 text-lg text-center animate-pulse">
          Loading...
        </div>
      ) : error ? (
        <div className="text-red-500 text-lg text-center">{error}</div>
      ) : myOrders.length === 0 ? (
        <div className="text-gray-600 text-lg text-center">
          You have no orders yet.
        </div>
      ) : (
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 rounded-md mt-4">
          <table className="w-full border-collapse border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-6 py-3 text-left">
                  Order ID
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left">
                  Items
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left">
                  Status
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left">
                  Total Price
                </th>
                <th className="border border-gray-300 px-6 py-3 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {myOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="border border-gray-300 px-6 py-3 text-gray-700">
                    {order._id}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-gray-700">
                    {order.orderItems.length} items
                  </td>
                  <td
                    className={`border border-gray-300 px-6 py-3 font-semibold ${
                      order.orderStatus === "Delivered"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.orderStatus}
                  </td>
                  <td className="border border-gray-300 px-6 py-3 text-gray-700">
                    ₹{order.totalPrice}
                  </td>
                  <td className="border border-gray-300 px-6 py-3">
                    <Link
                      to={`/order/${order._id}`}
                      className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
