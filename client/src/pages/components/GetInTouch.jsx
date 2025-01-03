import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitContactForm } from "@/store/extra/contactSlice";
import { toast } from "react-toastify";

const GetInTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const dispatch = useDispatch();
  const contactSubmit = useSelector((state) => state.contact);
  const { error, success, loading } = contactSubmit;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    await dispatch(submitContactForm(formData));

    if (success) {
      toast.success("Message sent successfully!");
    } else if (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <main className="flex justify-center items-center min-h-screen bg-blue-100">
        <div className="bg-white rounded-lg shadow-lg px-6 py-5 max-w-lg w-full mx-4">
          <h2 className="font-bold text-2xl mb-4 text-center text-blue-500">Contact Us</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="formGroup">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="formGroup">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="formGroup">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div className="formGroup">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows="4"
              ></textarea>
            </div>
            <button
              type="submit"
              className="inline-block w-full px-4 py-2 mt-3 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? "Submiting..." : "Submit"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default GetInTouch;
