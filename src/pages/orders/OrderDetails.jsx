import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleOrder } from "@/store/orders/singleOrderSlice";
import { useParams } from "react-router-dom";
import { Typography, Button, CircularProgress } from "@mui/material";
import MetaData from "../extra/MetaData";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const { loading, error, order } = useSelector((state) => state.singleOrder);

  useEffect(() => {
    dispatch(fetchSingleOrder(orderId));
  }, [dispatch, orderId]);

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
        <div className="text-red-500 text-lg text-center">{error}</div>
      ) : !order ? (
        <div className="text-gray-600 text-lg text-center">No order found.</div>
      ) : (
        <div className="order-content bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          {/* Order ID */}
          <Typography
            variant="h4"
            className="text-blue-600 font-semibold mb-6 text-base sm:text-lg"
          >
            Order ID: {order && order._id}
          </Typography>

          {/* Order Status */}
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

          {/* Shipping Information */}
          <div className="mb-2">
            <Typography variant="h6" className="text-gray-800 font-medium">
              Shipping Info:
            </Typography>
            <div className="space-y-1 mt-2">
              <div>
                <p className="text-gray-600">
                  Name:{" "}
                  <span className="text-gray-800 font-semibold">
                    {order.user?.name}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  Phone:{" "}
                  <span className="text-gray-800">
                    {order.shippingInfo?.phoneNo}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-600">
                  Address:{" "}
                  <span className="text-gray-800">
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="mb-2">
            <Typography variant="h6" className="text-gray-800 font-medium">
              Payment:
              <p
                className={`text-xl ${
                  order.paymentInfo?.status === "Succeed"
                    ? "text-green-500"
                    : "text-red-500"
                } font-semibold`}
              >
                {order.paymentInfo?.status === "Succeed" ? "PAID" : "NOT PAID"}
              </p>
            </Typography>
            <div className="space-y-4 mt-2">
              <div>
                <p className="text-gray-600">
                  Method:{" "}
                  <span className="text-gray-800 font-semibold">
                    {order.paymentInfo?.method}
                  </span>
                </p>
              </div>

              <div className="">
                <p className="text-gray-600">
                  Date:{" "}
                  <span className="text-gray-800 font-semibold">
                    {new Date(order.paidAt).toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
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
                      Quantity: {item.quantity} X ₹{item.price}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Typography variant="h6" className="text-gray-800 font-semibold mb-6">
            Total Price: ₹{order.totalPrice}
          </Typography>

          <div className="mt-6 text-center print-btn">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handlePrint} // Call print when clicked
              className="px-6 py-3 rounded-lg text-white font-semibold"
            >
              Download Invoice/Receipt
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetails;
