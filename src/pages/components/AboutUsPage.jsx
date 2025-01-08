import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAboutUs } from "@/store/extra/aboutUsSlice";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";

const AboutUsPage = () => {
  const dispatch = useDispatch();
  const { aboutUs, loading, error } = useSelector((state) => state.aboutUs);

  useEffect(() => {
    dispatch(fetchAboutUs());
  }, [dispatch]);

  if (loading) return <div className="flex justify-center items-center"><CircularProgress /></div>;
  if (error)
    return <div className="text-center text-lg text-red-500">{toast.error(error)}</div>;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col items-center py-12">
      <div className="text-center mb-8">
        <h2 className="text-5xl font-extrabold text-blue-500">About Us</h2>
      </div>

      {aboutUs && (
        <div className="max-w-4xl w-full bg-white p-8 rounded-3xl shadow-xl transform transition hover:scale-105 duration-300">
          <div className="flex flex-col md:flex-row items-center">
            <img
              src={aboutUs.photoLink}
              alt="About Us"
              className="w-64 h-64 object-cover rounded-full shadow-lg mb-6 md:mb-0 md:mr-8"
            />
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-blue-500 mb-2">
                {aboutUs.name}
              </h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong>Phone:</strong> {aboutUs.phone}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mt-2">
                <strong>WhatsApp:</strong> {aboutUs.whatsapp}
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mt-4">
                <strong>Address:</strong> {aboutUs.address}
              </p>
              <a
                href={aboutUs.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 text-lg text-blue-600 font-semibold hover:text-blue-800 hover:underline transition duration-200"
              >
                🌍 View Location on Map
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutUsPage;
