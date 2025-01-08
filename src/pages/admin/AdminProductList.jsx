import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, deleteProduct } from "@/store/products/productsSlice";
import { FaArrowsUpDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [sortConfig, setSortConfig] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;

    if (key === "Stock") {
      return direction === "asc" ? a[key] - b[key] : b[key] - a[key];
    } else {
      return direction === "asc"
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    }
  });

  const requestSort = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    toast.success("Product deleted successfully");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <Link to="/admin/dashboard">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6">
          Back to Dashboard
        </button>
      </Link>
      <div className="flex overflow-x-auto space-x-8 py-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        <h2 className="text-2xl font-bold mb-6">Products</h2>
        <Link to="/admin/create/product">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6">
            Create New Product
          </button>
        </Link>
      </div>
      <div className="flex overflow-x-auto space-x-4 py-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        <table className="min-w-full table-auto bg-white border border-gray-200">
          <thead>
            <tr>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Name <FaArrowsUpDown className="h-4 w-4 inline-block" />
              </th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => requestSort("category")}
              >
                Category <FaArrowsUpDown className="h-4 w-4 inline-block" />
              </th>
              <th className="px-4 py-2">Vehicle Type</th>
              <th
                className="px-4 py-2 cursor-pointer"
                onClick={() => requestSort("Stock")}
              >
                Stock <FaArrowsUpDown className="h-4 w-4 inline-block" />
              </th>
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">{product.brand}</td>
                <td className="px-4 py-2">{product.Stock}</td>
                <td className="px-4 py-2">
                  {product.images && product.images[0] && (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="px-4 py-2">
                  <Link to={`/admin/product/${product._id}`}>
                    <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">
                      Update
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
