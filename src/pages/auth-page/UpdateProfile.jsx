import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, clearError, clearSuccess } from "@/store/auth/profile";
import { toast } from "react-toastify";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import MetaData from "../extra/MetaData";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.profile);

  const { user: authUser } = useSelector((state) => state.auth);

  const [name, setName] = useState(authUser?.name || "");
  const [email, setEmail] = useState(authUser?.email || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({ name, email }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
    if (success) {
      toast.success("Profile updated successfully!");
      dispatch(clearSuccess());
      navigate("/profile");
    }

    gsap.from(".updateProfile form", {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power4.out",
    });

    gsap.from(".updateProfile h2", {
      opacity: 0,
      x: -50,
      duration: 1.2,
      ease: "power4.out",
    });
  }, [dispatch, error, success, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 updateProfile">
      <MetaData title="Update Profile" />
      <h2 className="text-3xl font-bold text-center mb-6">Update Profile</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label className="block text-lg font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-md"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-md"
            placeholder="Enter your email"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
