import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchAllOrders,
  deleteOrder,
  clearErrors,
} from "@/store/orders/adminOrderSlice";
import { toast } from "react-toastify";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import MetaData from "../extra/MetaData";

const AdminOrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    error,
    orders: myOrders = [],
  } = useSelector((state) => state.adminOrders);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const deleteOrderHandler = (orderId) => {
    dispatch(deleteOrder(orderId));
    toast.success("Order deleted successfully");
    navigate(0);

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <MetaData title="Orders List" />
      <Typography
        variant="h4"
        className="text-4xl font-bold text-center text-blue-600 mb-12"
      >
        Orders List
      </Typography>

      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="text-red-500 text-lg text-center">
          {toast.error(error)}
        </div>
      ) : myOrders.length === 0 ? (
        <div className="text-gray-600 text-lg text-center">
          You have no orders yet.
        </div>
      ) : (
        <>
          <Link to="/admin/dashboard">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6">
              Back to Dashboard
            </button>
          </Link>
          <div className="flex overflow-x-auto space-x-4 py-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
            <table className="w-full border-collapse border border-gray-300 rounded-lg">
              <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <tr>
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">
                    Order ID
                  </th>
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">
                    Items
                  </th>
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">
                    Status
                  </th>
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">
                    Total Price
                  </th>
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {myOrders.map((order, index) => (
                  <tr
                    key={order._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-100 transition-colors duration-300`}
                  >
                    <td className="border border-gray-300 px-6 py-4 text-gray-700 font-mono">
                      {order._id}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">
                      {order.orderItems.length} items
                    </td>
                    <td
                      className={`border border-gray-300 px-6 py-4 font-semibold ${
                        order.orderStatus === "Delivered"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.orderStatus}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-gray-700">
                      ₹{order.totalPrice}
                    </td>
                    <td className="border border-gray-300 px-6 py-4 text-center space-x-4">
                      <Link
                        to={`/admin/order/${order._id}`}
                        className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded shadow-sm transition-colors"
                      >
                        <CiEdit className="mr-2 text-lg" />
                        Edit/Get Details
                      </Link>
                      <button
                        onClick={() => deleteOrderHandler(order._id)}
                        className="inline-flex items-center px-5 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded shadow-sm transition-colors"
                      >
                        <MdDelete className="mr-2 text-lg" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrderList;
