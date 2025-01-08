import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser } from "@/store/auth/profile";
import { clearError, getAllUser } from "@/store/auth/allUsers";
import { toast } from "react-toastify";
import MetaData from "../extra/MetaData";

const AdminUsersList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.getUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    dispatch(getAllUser());

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (deleteError) {
      toast.error(deleteError);
      dispatch(clearError());
    }

    if (isDeleted) {
      toast.success(message);
      navigate("/admin/users");
    }
  }, [dispatch, error, deleteError, isDeleted, message, navigate]);

  return (
    <Fragment>
      <MetaData title={`ALL USERS - Admin`} />
      

      <div className="container mx-auto px-6 py-12">
      <Link to="/admin/dashboard">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6">
          Back to Dashboard
        </button>
      </Link>
        <h2 className="text-4xl font-extrabold text-center text-blue-600 mb-8 mt-7">
          All Users
        </h2>

        {Array.isArray(users) && users.length === 0 ? (
          <p className="text-center text-lg text-gray-500">
            No users available
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(users) &&
              users.map((user) => (
                <div
                  key={user._id}
                  className="user-card bg-white p-6 shadow-lg rounded-xl flex flex-col space-y-4 hover:shadow-2xl transition-all duration-300"
                >
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                      {user.name}
                    </h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-400 capitalize">
                      {user.role}
                    </p>
                  </div>
                  <div className="flex space-x-4 mt-4">
                    <Link
                      to={`/admin/user/${user._id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm font-medium"
                    >
                      Update
                    </Link>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors duration-300 text-sm font-medium"
                      onClick={() => deleteUserHandler(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default AdminUsersList;
