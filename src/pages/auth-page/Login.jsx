import { loginUser } from "@/store/auth/auth";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import gsap from "gsap";
import MetaData from "../extra/MetaData";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (isAuthenticated) {
      toast.success("Login successful");
      navigate(redirect);
    }

    gsap.from(".login-form", { opacity: 0, y: -30, duration: 1 });
    gsap.from(".login-button", { opacity: 0, delay: 0.5, y: 20, duration: 1 });
  }, [isAuthenticated, error, navigate, redirect]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <MetaData title="Login" />
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={loginSubmit} className="login-form space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                <span className="cursor-pointer" onClick={handleTogglePassword}>
                  {showPassword ? <IoEyeOff /> : <IoEye />}
                </span>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="login-button w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="flex justify-between mb-2 mt-4">
          <Link to="/password/forgot" className="text-blue-500 text-sm">
            Forgot Password?
          </Link>
          <Link to="/signup" className="text-blue-500 text-sm">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
