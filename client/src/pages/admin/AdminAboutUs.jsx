import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutUs, updateAboutUs } from "@/store/extra/aboutUsSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AboutUsAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { aboutUs, loading, error } = useSelector((state) => state.aboutUs);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    photoLink: "",
    address: "",
    mapLink: "",
  });

  useEffect(() => {
    dispatch(fetchAboutUs());
  }, [dispatch]);

  useEffect(() => {
    if (aboutUs) {
      setFormData({
        name: aboutUs.name || "",
        phone: aboutUs.phone || "",
        whatsapp: aboutUs.whatsapp || "",
        photoLink: aboutUs.photoLink || "",
        address: aboutUs.address || "",
        mapLink: aboutUs.mapLink || "",
      });
    }
  }, [aboutUs]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, phone, whatsapp } = formData;
    if (!name || !phone || !whatsapp) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    dispatch(updateAboutUs(formData))
      .then(() => toast.success("About Us information updated successfully!"))
      .catch(() => toast.error("Failed to update About Us information."));

    navigate(0);
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error)
    return <div className="text-center text-lg text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-5xl font-extrabold text-blue-600 mb-4">
          Admin Panel - About Us
        </h2>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-2xl border-t-4 border-blue-600">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your business name"
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter phone number"
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-medium text-gray-700">
                  WhatsApp
                </label>
                <input
                  type="text"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter WhatsApp number"
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Photo Link
                </label>
                <input
                  type="text"
                  name="photoLink"
                  value={formData.photoLink}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter photo URL"
                  required
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter address"
                  required
                />
              </div>

              <div>
                <label className="block text-xl font-medium text-gray-700">
                  Map Link
                </label>
                <input
                  type="text"
                  name="mapLink"
                  value={formData.mapLink}
                  onChange={handleChange}
                  className="w-full p-4 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter map link"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              type="submit"
              className="w-full px-6 py-4 bg-blue-600 text-white text-xl font-semibold rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              {loading ? "Updating..." : "Update About Us"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AboutUsAdmin;
