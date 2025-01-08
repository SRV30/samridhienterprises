/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/products/productsSlice";
import { categories, vehicles } from "@/pages/extra/Data";
import { Link } from "react-router-dom";
import MetaData from "../extra/MetaData";
import { CircularProgress } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState({
    keyword: "",
    currentPage: 1,
    price: [0, 10000],
    category: "",
    brand: "",
  });

  const handleSearch = () => {
    dispatch(getAllProducts(debouncedSearch));
  };

  useEffect(() => {
    handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  return (
    <div className="container mx-auto px-8 py-12 bg-white">
      <MetaData title="Home | Samridhi Enterprises" />
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-400">
          Welcome to Samridhi Enterprises!
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Your one-stop solution for premium automobile parts with unmatched
          customer service.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-500 mb-6">
          Browse Our Categories
        </h2>
        <div className="relative">
          <div
            id="category-scroll"
            className="flex overflow-x-auto space-x-4 py-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
          >
            {Array.isArray(categories) &&
              categories.map((category, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg text-center flex-shrink-0 hover:bg-blue-100 transition-transform duration-300 transform hover:scale-105"
                >
                  <button
                    onClick={() => {
                      setCategory(category);
                      setDebouncedSearch((prev) => ({ ...prev, category }));
                    }}
                    className="font-semibold text-lg"
                  >
                    {category}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Browse Vehicle List Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-500 mb-6">
          Vehicle List
        </h2>
        <div className="relative">
          <div
            id="subcategory-scroll"
            className="flex overflow-x-auto space-x-4 py-2 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200"
          >
            {Array.isArray(vehicles) &&
              vehicles.map((brand, index) => (
                <div
                  key={index}
                  className="border p-4 rounded-lg text-center flex-shrink-0 hover:bg-blue-100 transition-transform duration-300 transform hover:scale-105"
                >
                  <button
                    onClick={() => {
                      setBrand(brand);
                      setDebouncedSearch((prev) => ({ ...prev, brand }));
                    }}
                    className="font-semibold text-lg"
                  >
                    {brand}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-blue-500 mb-6">
          Our Products
        </h2>
        {loading ? (
          <div className="flex justify-center items-center"><CircularProgress  /></div>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.isArray(products) &&
              products.map((product) => (
                <div
                  key={product._id}
                  className="border p-4 rounded-lg hover:bg-blue-100 transition-transform duration-300 transform hover:scale-105"
                >
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.images[0]?.url}
                      alt={product.name}
                      className="w-full h-48 object-cover mb-4 rounded-lg"
                    />
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-gray-600 text-sm mt-2">
                      Category: {product.category}
                    </p>
                    <p className="text-gray-600 text-sm mt-2">
                      Vehicle Type: {product.brand}
                    </p>
                    <p className="font-semibold text-lg text-blue-500 mt-2">
                      ₹{product.price}
                    </p>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-12">
        <h3 className="text-3xl font-semibold text-blue-500 mb-4">
          Explore Our Products
        </h3>
        <p className="text-lg text-gray-600 mb-6">
          Browse through our vast selection of premium automobile parts. Find
          exactly what you need with ease.
        </p>
        <a
          href="/products"
          className="inline-block px-6 py-3 bg-blue-500 text-white font-bold text-lg rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
          Shop Now
        </a>
      </div>
    </div>
  );
};

export default Home;
