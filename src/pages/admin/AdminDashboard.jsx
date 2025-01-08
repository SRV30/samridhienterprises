import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import MetaData from "../extra/MetaData";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="mx-auto px-6 py-2 mb-7">
      <MetaData title="Admin Dashboard" />
      <h2 className="text-5xl font-extrabold text-center mb-1 text-blue-500 tracking-wide">
        Admin Dashboard
      </h2>
      <h3 className="text-3xl font-semibold text-center mb-8 text-blue-700">
        Welcome, {user && user.name}!
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <Link
          to="/admin/data"
          className="dashboard-card bg-white hover:to-blue-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Website Data</h3>
        </Link>
        <Link
          to="/admin/products"
          className=" bg-white hover:to-indigo-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Create & Update Products</h3>
        </Link>
        <Link
          to="/admin/orders"
          className="dashboard-card bg-white hover:to-green-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Orders List</h3>
        </Link>
        <Link
          to="/admin/users"
          className="dashboard-card bg-white hover:to-purple-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Users List</h3>
        </Link>
        <Link
          to="/admin/payment"
          className="dashboard-card bg-white hover:to-pink-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">
            Update Payment Details (UPI & QR)
          </h3>
        </Link>
        <Link
          to="/admin/contact"
          className="dashboard-card bg-white hover:to-yellow-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Get In Touch</h3>
        </Link>
        <Link
          to="/admin/about-us"
          className="dashboard-card bg-white hover:to-red-800 shadow-lg hover:shadow-xl rounded-lg p-6 text-center transform transition-all duration-300"
        >
          <h3 className="text-xl font-semibold">Update About Details</h3>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
