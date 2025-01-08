import { useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminData } from "@/store/extra/adminDataSlice";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import MetaData from "../extra/MetaData";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

const AdminData = () => {
  const dispatch = useDispatch();
  const { loading, error, usersCount, productsCount, ordersCount, earnings } =
    useSelector((state) => state.adminData);

  useEffect(() => {
    dispatch(fetchAdminData());
  }, [dispatch]);

  const earningsData = {
    labels: earnings?.map((item) => item.month) || [],
    datasets: [
      {
        label: "Earnings",
        data: earnings?.map((item) => item.amount) || [],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.1,
      },
    ],
  };

  const productSalesData = {
    labels: earnings?.map((item) => item.month) || [],
    datasets: [
      {
        label: "Product Sales",
        data: productsCount || [],
        fill: false,
        backgroundColor: "rgb(153, 102, 255)",
        borderColor: "rgba(153, 102, 255, 0.2)",
        tension: 1.0,
      },
    ],
  };

  const usersData = {
    labels: earnings.map((item) => item.month) || [],
    datasets: [
      {
        label: "Users",
        data: [usersCount || 0],
        fill: false,
        backgroundColor: "rgb(255, 159, 64)",
        borderColor: "rgba(255, 159, 64, 0.2)",
        tension: 0.1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{toast.error(error)}</div>;
  }

  return (
    <div className="min-h-screen p-6">
    <MetaData title="Admin Data" />
      <Link to="/admin/dashboard">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6">
          Back to Dashboard
        </button>
      </Link>
      <h2 className="text-2xl font-bold mb-6">Admin Data Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Link to="/admin/users">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">
              {usersCount || 0}
            </p>
          </div>
        </Link>

        <Link to="/admin/products">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Total Products</h3>
            <p className="text-3xl font-bold text-green-600">
              {productsCount || 0}
            </p>
          </div>
        </Link>

        <Link to="/admin/orders">
          <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Total Orders</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {ordersCount || 0}
            </p>
          </div>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6">
        <h3 className="text-xl font-semibold mb-4">Earnings vs Months</h3>
        <Line data={earningsData} options={{ responsive: true }} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6">
        <h3 className="text-xl font-semibold mb-4">Product Sales vs Months</h3>
        <Line data={productSalesData} options={{ responsive: true }} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-6">
        <h3 className="text-xl font-semibold mb-4">Users vs Months</h3>
        <Line data={usersData} options={{ responsive: true }} />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
        <h3 className="text-xl font-semibold mb-4">Earnings Summary</h3>
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left">Month</th>
              <th className="text-left">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((item, index) => (
              <tr key={index}>
                <td>{item.month}</td>
                <td>₹{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminData;
