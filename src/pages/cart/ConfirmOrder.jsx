import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import MetaData from "../extra/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { IoCashOutline, IoQrCodeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { createOrder, resetOrderState } from "@/store/orders/orderSlice";
import { fetchPaymentDetails } from "@/store/extra/paymentDetailsSlice";
import whatsappimg from "../../assets/whatsapp.png";
import { FaArrowAltCircleUp } from "react-icons/fa";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { paymentDetails } = useSelector((state) => state.paymentDetails) || {};
  const { loading, error, success } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [isWhatsappClicked, setIsWhatsappClicked] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const totalPrice = subtotal;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = async () => {
    if (
      !shippingInfo ||
      !shippingInfo.phoneNo ||
      !shippingInfo.pinCode ||
      !shippingInfo.country ||
      !shippingInfo.state ||
      !shippingInfo.city ||
      !shippingInfo.address
    ) {
      toast.error("Please fill out all shipping information.");
      return;
    }

    if (!user || !user.name || !user.email) {
      toast.error("Please ensure user information is complete.");
      return;
    }

    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }

    if (paymentMethod === "UPI" && !isWhatsappClicked) {
      toast.error("Please click on WhatsApp and share the payment proof.");
      return;
    }

    const orderData = {
      shippingInfo,
      orderItems: cartItems,
      totalPrice,
      paymentInfo: {
        method: paymentMethod,
        Image: paymentMethod === "UPI" ? "screenshot-url" : undefined,
      },
    };

    dispatch(createOrder(orderData));
  };

  const handleWhatsappClick = () => {
    setIsWhatsappClicked(true);
    toast.success("Payment proof request sent on WhatsApp!");
  };

  useEffect(() => {
    dispatch(fetchPaymentDetails());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("Order placed successfully!");
      dispatch(resetOrderState());
      navigate("/success");
    }
    if (error) {
      toast.error(error);
      dispatch(resetOrderState());
    }
  }, [success, error, dispatch, cartItems, navigate]);

  return (
    <>
      <MetaData title="Confirm Order" />
      <CheckoutSteps activeStep={1} />
      <div className="container mx-auto py-8">
        {/* Shipping Info */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <Typography variant="h6" className="text-lg font-semibold mb-4">
            Shipping Info
          </Typography>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="font-medium">Name:</p>
              <span>{user.name}</span>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Phone:</p>
              <span>{shippingInfo.phoneNo}</span>
            </div>
            <div className="flex justify-between">
              <p className="font-medium">Address:</p>
              <span>{address}</span>
            </div>
          </div>
        </div>

        {/* Cart Items */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <Typography variant="h6" className="text-lg font-semibold mb-4">
            Your Cart Items:
          </Typography>
          <div className="space-y-4">
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product} className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt="Product"
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <Link
                    to={`/product/${item.product}`}
                    className="text-blue-500 hover:underline"
                  >
                    {item.name}
                  </Link>{" "}
                  <span className="text-gray-700">
                    {item.quantity} X ₹{item.price} ={" "}
                    <b>₹{item.price * item.quantity}</b>
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Typography variant="h6" className="text-lg font-semibold mb-4">
            Order Summary
          </Typography>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <p className="font-medium">Subtotal:</p>
              <span>₹{subtotal}</span>
            </div>
          </div>

          <div className="flex justify-between font-semibold text-xl mb-4">
            <p>Total:</p>
            <span>₹{totalPrice}</span>
          </div>

          {/* Payment Method Selection */}
          <div className="mb-8">
            <Typography variant="h6" className="text-lg font-semibold mb-4">
              Select Payment Method
            </Typography>
            <div className="space-y-4 mt-4">
              <div className="flex items-center text-2xl">
                <input
                  type="radio"
                  id="COD"
                  name="paymentMethod"
                  value="COD"
                  className="mr-2"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                />
                <label
                  htmlFor="COD"
                  className="text-gray-700 flex items-center gap-3"
                >
                  Cash on Delivery <IoCashOutline />
                </label>
              </div>

              <div className="flex items-center text-2xl">
                <input
                  type="radio"
                  id="UPI"
                  name="paymentMethod"
                  value="UPI"
                  className="mr-2"
                  checked={paymentMethod === "UPI"}
                  onChange={() => setPaymentMethod("UPI")}
                />
                <label
                  htmlFor="UPI"
                  className="text-gray-700 flex items-center gap-5"
                >
                  UPI/QR Code <IoQrCodeOutline />
                </label>
              </div>
            </div>
          </div>

          {paymentMethod === "UPI" && paymentDetails && (
            <div className="bg-gray-50 p-6 rounded-lg shadow-md space-y-6">
              {/* UPI Details Section */}
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700 mb-2">
                  UPI ID:
                </p>
                <p className="text-xl font-bold text-blue-600">
                  {paymentDetails.upiId}
                </p>
                <img
                  src={paymentDetails.qrCode}
                  alt="QR Code"
                  className="w-40 h-40 mx-auto mt-4 border-2 border-blue-400 rounded-lg"
                />
              </div>

              {/* WhatsApp Prompt Section */}
              <div className="bg-red-100 p-4 rounded-lg shadow-inner text-center">
                <p className="text-red-600 font-semibold text-lg">
                  Please send payment proof on WhatsApp before placing your
                  order.
                </p>
                <a
                  href={`https://wa.me/${paymentDetails.whatsappNo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsappClick}
                  className="inline-flex items-center gap-3 mt-4 bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                >
                  <img
                    src={whatsappimg}
                    alt="Chat on WhatsApp"
                    className="w-6 h-6"
                  />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          )}
          <br />
          {paymentMethod === "UPI" && !isWhatsappClicked && (
            <div className="flex items-center justify-center">
              <FaArrowAltCircleUp className="text-4xl text-red-500 flex items-center justify-center mb-4" />
            </div>
          )}
          <button
            onClick={proceedToPayment}
            className={`w-full py-3 rounded-lg transition duration-300 ${
              loading || (paymentMethod === "UPI" && !isWhatsappClicked)
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
            disabled={
              loading || (paymentMethod === "UPI" && !isWhatsappClicked)
            }
            title={
              paymentMethod === "UPI" && !isWhatsappClicked
                ? "You need to send payment proof on WhatsApp first."
                : ""
            }
          >
            {loading ? "Processing..." : "Proceed To Payment"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
