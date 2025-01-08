import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword, clearError } from "@/store/auth/forgotPassword";
import { gsap } from "gsap";
import MetaData from "../extra/MetaData";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.password);

  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("email", email);
    if (email) {
      dispatch(forgotPassword(email));
      toast.success("Email sent successfully");
      navigate("/login");
    } else {
      toast.error("Please enter your email address");
      dispatch(clearError());
    }
  };

  useEffect(() => {
    gsap.from(".forgot-password-form", { opacity: 0, y: -30, duration: 1 });
    gsap.from(".forgot-password-button", {
      opacity: 0,
      delay: 0.5,
      y: 20,
      duration: 1,
    });
  }, []);

  return (
    <Fragment>
      <MetaData title="Forgot Password |" />
      <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-10 forgot-password-form">
          <h2 className="text-4xl font-semibold text-center text-gray-700 mb-8">
            Forgot Password
          </h2>

          <form onSubmit={forgotPasswordSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-600 mb-2"
              >
                Email Address
              </label>
              <div className="flex items-center border-b border-gray-400 py-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none text-gray-700 py-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/login" className="text-blue-500 hover:underline">
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
