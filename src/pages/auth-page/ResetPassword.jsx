import { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CiUnlock, CiLock } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { clearError, resetPassword } from "@/store/auth/forgotPassword";
import { toast } from "react-toastify";
import { gsap } from "gsap";
import MetaData from "../extra/MetaData";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();

  const { error, success, loading } = useSelector((state) => state.password);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success) {
      toast.success("Password updated successfully");
      navigate("/login");
    }

    gsap.from(".resetPasswordBox", {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".resetPasswordForm", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".resetPasswordBtn", {
      opacity: 0,
      scale: 0.5,
      delay: 0.5,
      duration: 1,
      ease: "back.out(1.7)",
    });
  }, [dispatch, error, success, navigate, token]);

  return (
    <Fragment>
      <MetaData title="Reset Password | " />
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="resetPasswordBox bg-white shadow-2xl rounded-xl p-8 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
            Update Password
          </h2>
          <form
            className="resetPasswordForm space-y-6"
            onSubmit={resetPasswordSubmit}
          >
            <div className="mb-4 flex items-center border-b border-gray-300 pb-2">
              <CiUnlock className="text-gray-500 text-2xl mr-2" />
              <input
                type="password"
                placeholder="New Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div className="mb-4 flex items-center border-b border-gray-300 pb-2">
              <CiLock className="text-gray-500 text-2xl mr-2" />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <button
              type="submit"
              className={`resetPasswordBtn w-full py-3 px-4 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none transition duration-200 ${
                loading ? "cursor-wait bg-blue-300" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ResetPassword;
