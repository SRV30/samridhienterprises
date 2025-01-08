import { clearError, updateUserRole } from "@/store/auth/profile";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useParams } from "react-router-dom";
import { gsap } from "gsap";
import MetaData from "../extra/MetaData";

const AdminUpdateUser = () => {
  const dispatch = useDispatch();
  const { id: userId } = useParams();
  const { isUpdated, error, loading } = useSelector((state) => state.profile);

  const [role, setRole] = useState("");

  const handleUpdateRole = (e) => {
    e.preventDefault();
    const userData = { role };
    dispatch(updateUserRole({ id: userId, userData }));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (isUpdated) {
      toast.success("User role updated successfully!");
    }

    gsap.fromTo(
      ".updateUserRole",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, [dispatch, error, isUpdated]);

  return (
    <div>
      <MetaData title="Update User Role" />

      <div className="updateUserRole flex justify-center items-center h-screen bg-gray-100">
        <form
          onSubmit={handleUpdateRole}
          className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        >
          <Link to="/admin/dashboard">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6">
              Back to Dashboard
            </button>
          </Link>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Update User Role
          </h2>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-600 mb-2"
              htmlFor="role"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300 focus:outline-none"
            >
              <option value="">Choose Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded-md text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition-colors"
            }`}
          >
            {loading ? "Updating..." : "Update Role"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpdateUser;
