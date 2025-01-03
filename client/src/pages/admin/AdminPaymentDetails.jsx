import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPaymentDetails,
  updatePaymentDetails,
  resetPaymentDetailsState,
} from "@/store/extra/paymentDetailsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PaymentDetailsAdmin = () => {
  const dispatch = useDispatch();
  const { paymentDetails, loading, error, success } = useSelector(
    (state) => state.paymentDetails
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    upiId: "",
    qrCode: "",
    whatsappNo: "",
  });

  useEffect(() => {
    dispatch(fetchPaymentDetails());
    return () => {
      dispatch(resetPaymentDetailsState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (paymentDetails) {
      setFormData({
        upiId: paymentDetails.upiId || "",
        qrCode: paymentDetails.qrCode || "",
        whatsappNo: paymentDetails.whatsappNo || "",
      });
    }
  }, [paymentDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { upiId, qrCode, whatsappNo } = formData;
    if (!upiId || !qrCode || !whatsappNo) {
      toast.error("Please fill in all the fields.");
      return;
    }

    dispatch(updatePaymentDetails(formData))
      .then(() => toast.success("Payment details updated successfully!"))
      .catch(() => toast.error("Failed to update payment details."));

    navigate(0);
  };

  if (loading) return <div className="text-center text-xl">Loading...</div>;
  if (error)
    return <div className="text-center text-xl text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-extrabold text-blue-500 mb-4">
          Payment Details
        </h2>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-blue-400">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-xl font-medium text-gray-700">
                UPI ID
              </label>
              <input
                type="text"
                name="upiId"
                value={formData.upiId}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your UPI ID"
                required
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700">
                QR Code URL
              </label>
              <img
                src={formData.qrCode}
                alt="QR Code"
                className="w-40 h-40 mx-auto mt-2 mb-2 border-2 border-blue-400 rounded-lg"
              />
              <input
                type="text"
                name="qrCode"
                value={formData.qrCode}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Enter QR Code URL"
                required
              />
            </div>

            <div>
              <label className="block text-xl font-medium text-gray-700">
                WhatsApp Number
              </label>
              <input
                type="text"
                name="whatsappNo"
                value={formData.whatsappNo}
                onChange={handleChange}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Enter WhatsApp number"
                required
              />
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="w-full px-6 py-4 bg-blue-500 text-white text-xl font-semibold rounded-xl hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              {loading ? "Updating..." : "Update Payment Details"}
            </button>
          </div>
        </form>

        {success && !loading && (
          <div className="mt-4 text-center text-green-500">
            Payment details updated successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetailsAdmin;
