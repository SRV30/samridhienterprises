import { getSingleDetail } from "@/store/auth/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import profile from "@/assets/profile.png";

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      dispatch(getSingleDetail());
    }
  }, [dispatch, isAuthenticated, navigate]);

  // GSAP animations for profile card
  useEffect(() => {
    gsap.from(".profile-card", {
      opacity: 0,
      y: -100,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from(".profile-btn", {
      opacity: 0,
      x: -100,
      stagger: 0.3,
      duration: 1.2,
      ease: "power3.out",
    });
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to fetch user details: {error}
      </div>
    );
  }

  // Function to format the "Joined On" date
  const formatJoinedDate = (createdAt) => {
    if (!createdAt) return "N/A";
    const date = new Date(createdAt);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    return `${date.toLocaleDateString()} (${diffInDays} days ago)`;
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-8">
      <div className="profile-card bg-white shadow-2xl rounded-3xl p-8 w-full max-w-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
        {/* Profile Image */}
        <div className="flex justify-center mb-6">
          <img
            src={profile}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg"
          />
        </div>

        {/* User Information */}
        <h1 className="text-3xl font-semibold text-center mb-4 text-blue-600">
          {user?.name || "User"}!
        </h1>
        <p className="text-gray-600 text-center mb-4 text-lg">
          Email: <span className="font-medium">{user?.email}</span>
        </p>
        <p className="text-gray-600 text-center mb-4 text-lg">
          Role: <span className="font-medium">{user?.role || "N/A"}</span>
        </p>
        <p className="text-gray-600 text-center mb-6 text-lg">
          Joined On:{" "}
          <span className="font-medium">
            {formatJoinedDate(user?.createdAt)}
          </span>
        </p>

        {/* Buttons for User Actions */}
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => navigate("/me/update")}
            className="profile-btn bg-blue-500 text-white py-2 px-6 rounded-lg transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
          >
            Edit Profile
          </button>
          <button
            onClick={() => navigate("/password/update")}
            className="profile-btn bg-blue-500 text-white py-2 px-6 rounded-lg transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
          >
            Change Password
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <button
            onClick={() => navigate("/my-orders")}
            className="profile-btn bg-blue-500 text-white py-2 px-6 rounded-lg transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:to-teal-600 transition-all duration-300"
          >
            My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
