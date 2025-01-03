import { useDispatch, useSelector } from "react-redux";
import { removeItemsFromCart, saveShippingInfo } from "@/store/extra/cartSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import MetaData from "../extra/MetaData";
import CheckoutSteps from "./CheckoutSteps";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address || "");
  const [city, setCity] = useState(shippingInfo.city || "");
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode || "");
  const [country, setCountry] = useState(shippingInfo.country || "INDIA");
  const [phoneNo, setPhoneNo] = useState(shippingInfo?.phoneNo || "");
  const [altphoneNo, setAltPhoneNo] = useState(shippingInfo?.altphoneNo || "");
  const [state, setState] = useState(shippingInfo?.state || "");

  const handleRemoveItem = (id) => {
    dispatch(removeItemsFromCart(id));
    toast.info("Item removed from cart!");
  };

  const handleSaveShippingInfo = (e) => {
    e.preventDefault();
    if (phoneNo.length !== 10) {
      toast.warning("Phone Number should be 10 digits long");
      return;
    }
    dispatch(
      saveShippingInfo({
        address,
        city,
        pinCode,
        country,
        phoneNo,
        state,
        altphoneNo,
      })
    );
    toast.success("Shipping information saved!");
  };

  const handleCheckout = () => {
    if (!cartItems.length) {
      toast.error("Cart is empty. Add some items first!");
      return;
    }
    navigate("/order/confirm");
  };

  const calculateTotalPrice = () => {
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="container mx-auto p-6">
     <CheckoutSteps activeStep={0} />
      <MetaData title="Cart | Shipping Details" />
      <h2 className="text-3xl font-bold text-center mb-8">Your Cart</h2>

      {/* Cart Items Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="cart-items bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Items in Cart</h3>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.product}
                className="flex items-center justify-between mb-4 border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-gray-600">
                      Price: ₹{item.price} X {item.quantity}
                    </p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.product)}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-600">Your cart is empty!</p>
          )}
        </div>

        <div className="shipping-info bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
          <form onSubmit={handleSaveShippingInfo} className="mb-6">
            <div className="mb-4">
              <label className="block font-medium mb-2">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value.toUpperCase())}
                placeholder="Enter your address"
                className="w-full p-3 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value.toUpperCase())}
                placeholder="Enter your city"
                className="w-full p-3 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">PinCode</label>
              <input
                type="number"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value.toUpperCase())}
                placeholder="Enter postal code"
                className="w-full p-3 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">State</label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value.toUpperCase())}
                placeholder="Enter State"
                className="w-full p-3 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Phone Number</label>
              <input
                type="number"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value.toUpperCase())}
                placeholder="Enter phone number"
                className="w-full p-3 border rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">
                Alternate Phone Number (Optional){" "}
              </label>
              <input
                type="number"
                value={altphoneNo}
                onChange={(e) => setAltPhoneNo(e.target.value.toUpperCase())}
                placeholder="Enter phone alternative number"
                className="w-full p-3 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value.toUpperCase())}
                placeholder="Enter country"
                className="w-full p-3 border rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
            >
              Save Shipping Info
            </button>
          </form>

          {/* Total Price */}
          <div className="text-xl font-semibold mb-4">
            Total Price: ₹{calculateTotalPrice()}
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
