import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRole } from "@/store/profileSlice";
import { toast } from "react-toastify";

const UpdateUserRole = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);
  const [formData, setFormData] = useState({
    userId: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.userId || !formData.role) {
      toast.error("All fields are required!");
      return;
    }
    dispatch(updateUserRole({ id: formData.userId, userData: { role: formData.role } }))
      .then(() => toast.success("User role updated successfully!"))
      .catch(() => toast.error("Failed to update user role!"));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Update User Role</h2>
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-lg font-medium">User ID</label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
            placeholder="Enter User ID"
          />
        </div>
        <div className="mb-4">
          <label className="block text-lg font-medium">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border rounded-md"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
        >
          {loading ? "Updating..." : "Update Role"}
        </button>
      </div>
    </div>
  );
};

export default UpdateUserRole;
