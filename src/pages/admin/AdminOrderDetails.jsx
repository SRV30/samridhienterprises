import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateOrderStatus } from "@/store/orders/adminOrderSlice";
import { CircularProgress, Button, Typography } from "@mui/material";
import { fetchSingleOrder } from "@/store/orders/singleOrderSlice";
import MetaData from "../extra/MetaData";

const AdminOrderDetails = () => {
  const dispatch = useDispatch();
  const { id: orderId } = useParams();
  const { loading, error, order } = useSelector((state) => state.singleOrder);
  const { isUpdated, updateError } = useSelector((state) => state.adminOrders);
  const [status, setStatus] = useState("");

  useEffect(() => {
    dispatch(fetchSingleOrder(orderId));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Order status updated successfully!");
      dispatch(fetchSingleOrder(orderId));
    }
    if (updateError) {
      toast.error(updateError);
    }
  }, [isUpdated, updateError, dispatch, orderId]);

  const updateOrderStatusHandler = () => {
    if (!status) {
      toast.warning("Please select a status to update.");
      return;
    }
    dispatch(updateOrderStatus({ orderId, status }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <MetaData title="Order Details" />
      {loading ? (
        <div className="flex justify-center items-center">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="text-red-500 text-lg text-center">
          {toast.error(error)}
        </div>
      ) : !order ? (
        <div className="text-gray-600 text-lg text-center">No order found.</div>
      ) : (
        <>
          <Link to="/admin/dashboard">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6">
              Back to Dashboard
            </button>
          </Link>
          <div className="order-content bg-white p-4 rounded-lg shadow-lg border border-gray-200">
            <Typography
              variant="h4"
              className="text-blue-600 font-semibold mb-6 text-base sm:text-lg"
            >
              Order ID: {order._id}
            </Typography>

            <Typography variant="h5" className="text-gray-800 mb-4">
              Order Status:{" "}
              <span
                className={`${
                  order.orderStatus === "Delivered"
                    ? "text-green-500"
                    : "text-yellow-500"
                } font-semibold`}
              >
                {order.orderStatus}
              </span>
            </Typography>

            {/* Update Order Status */}
            <div className="mb-1">
              <Typography variant="h6" className="text-gray-800 font-medium">
                Update Order Status:{" "}
                <select
                  className="border rounded px-4 py-2 mr-2"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  {order.orderStatus === "Processing" && (
                    <option value="Shipped">Shipped</option>
                  )}
                  {order.orderStatus === "Shipped" && (
                    <option value="Delivered">Delivered</option>
                  )}
                  {order.orderStatus === "Delivered" && (
                    <option value="Delivered">Already Delivered</option>
                  )}
                </select>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={updateOrderStatusHandler}
                >
                  Update Status
                </Button>
              </Typography>
            </div>

            {/* Shipping Information */}
            <div className="mb-2">
              <Typography variant="h6" className="text-gray-800 font-medium">
                Shipping Info:
              </Typography>
              <div className="space-y-1 mt-2">
                <p className="text-gray-600">
                  Name:{" "}
                  <span className="font-semibold">{order.user?.name}</span>
                </p>
                <p className="text-gray-600">
                  Phone: <span>{order.shippingInfo?.phoneNo}</span>
                </p>
                <p className="text-gray-600">
                  Address:{" "}
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </p>
              </div>
            </div>

            {/* Payment Information */}
            <div className="mb-2">
              <Typography variant="h6" className="text-gray-800 font-medium">
                Payment:
                <span
                  className={`ml-2 ${
                    order.paymentInfo?.status === "Succeed"
                      ? "text-green-500"
                      : "text-red-500"
                  } font-semibold`}
                >
                  {order.paymentInfo?.status === "Succeed"
                    ? "PAID"
                    : "NOT PAID"}
                </span>
              </Typography>
              <p className="text-gray-600">
                Method:{" "}
                <span className="font-semibold">
                  {order.paymentInfo?.method}
                </span>
              </p>
              <p className="text-gray-600">
                Date:{" "}
                <span className="font-semibold">
                  {new Date(order.paidAt).toLocaleString()}
                </span>
              </p>
            </div>

            {/* Ordered Items */}
            <div className="mb-6">
              <Typography variant="h6" className="text-gray-800 font-medium">
                Ordered Items:
              </Typography>
              <ul className="list-disc ml-6 space-y-3">
                {order.orderItems.map((item) => (
                  <li
                    key={item._id}
                    className="text-gray-600 flex items-center space-x-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <span className="font-semibold">{item.name}</span>
                      <p>
                        Quantity: {item.quantity} X ₹{item.price} {"  "}= ₹
                        {order.totalPrice}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Typography
              variant="h6"
              className="text-gray-800 font-semibold mb-6"
            >
              Total Price: ₹{order.totalPrice}
            </Typography>

            <div className="mt-6 text-center">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handlePrint}
              >
                Download Invoice/Receipt
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminOrderDetails;
