import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "@/store/products/productsSlice";
// import { addToCart, addToWishlist } from "@/store/cart/cartSlice"; // Example cart actions
import { gsap } from "gsap";
import { categories, vehicles } from "@/pages/extra/Data";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error, productsCount = 0, filteredProductsCount = 0 } =
    useSelector((state) => state.products);  // Default empty array for products and 0 for counts

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [priceRange, setPriceRange] = useState([0, 10000]);

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);

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
    const timeoutId = setTimeout(() => {
      setDebouncedSearch({
        keyword,
        currentPage,
        price: priceRange,
        category,
        brand,
      });
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [keyword, currentPage, priceRange, category, brand]);

  useEffect(() => {
    handleSearch();
  }, [debouncedSearch]);

  useEffect(() => {
    if (products.length > 0) {
      setTimeout(() => {
        gsap.fromTo(
          ".product-card",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.2 }
        );
      }, 100);
    }
  }, [products]);

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (
        !e.target.closest(".category-dropdown") &&
        !e.target.closest(".brand-dropdown")
      ) {
        setShowCategoryDropdown(false);
        setShowBrandDropdown(false);
      }
    };
    document.addEventListener("click", closeDropdowns);
    return () => document.removeEventListener("click", closeDropdowns);
  }, []);

  if (loading)
    return (
      <div className="text-center text-xl font-semibold text-blue-500">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-xl font-semibold text-red-500">
        Error: {error}
      </div>
    );

  return (
    <div className="product-card container mx-auto p-8 bg-gray-50 rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">
        Product List
      </h2>

      <div className="flex flex-wrap gap-6 mb-8">
        {/* Category Dropdown */}
        <div className="relative w-64 category-dropdown">
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            placeholder="Search Categories"
            className="p-3 border border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:ring-2"
          />
          {showCategoryDropdown && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
              {categories
                .filter((cat) =>
                  cat.toLowerCase().includes(category.toLowerCase())
                )
                .map((cat) => (
                  <li
                    key={cat}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setCategory(cat);
                      setShowCategoryDropdown(false);
                    }}
                  >
                    {cat}
                  </li>
                ))}
              <li
                className="p-2 hover:bg-red-100 cursor-pointer text-red-500"
                onClick={() => setCategory("")}
              >
                Clear Category Filter
              </li>
            </ul>
          )}
        </div>

        {/* Brand Dropdown */}
        <div className="relative w-64 brand-dropdown">
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            onClick={() => setShowBrandDropdown(!showBrandDropdown)}
            placeholder="Search Brands"
            className="p-3 border border-gray-300 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-500 transition-all duration-200 hover:ring-2"
          />
          {showBrandDropdown && (
            <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto z-10">
              {vehicles
                .filter((b) => b.toLowerCase().includes(brand.toLowerCase()))
                .map((b) => (
                  <li
                    key={b}
                    className="p-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setBrand(b);
                      setShowBrandDropdown(false);
                    }}
                  >
                    {b}
                  </li>
                ))}
              <li
                className="p-2 hover:bg-red-100 cursor-pointer text-red-500"
                onClick={() => setBrand("")}
              >
                Clear Vehicles Filter
              </li>
            </ul>
          )}
        </div>

        {/* Price Range Filter */}
        <div className="flex flex-col w-64">
          <label className="text-sm font-semibold text-gray-700">
            Price Range
          </label>
          <div className="flex items-center justify-between">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-20 p-2 border rounded-lg"
            />
            <span className="mx-2">to</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-20 p-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Product List */}
      {products.length > 0 ? (
        <div>
          <div className="text-sm mb-4 text-center text-gray-700">
            Showing {filteredProductsCount} of {productsCount} products
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                className="product-card bg-white p-6 border border-gray-200 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                key={product._id}
              >
                <img
                  src={product.images[0]?.url || '/path/to/placeholder-image.jpg'}
                  alt={product.name}
                  className="w-full h-56 object-cover rounded-lg mb-6"
                />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Brand/Product Id: {product.description}
                </p>
                <p className="text-sm text-gray-700">
                  Category: {product.category}
                </p>
                <p className="text-sm text-gray-700">
                  Vehicles Types: {product.brand}
                </p>
                <p className="text-lg font-bold text-blue-600 mt-4">
                  ₹{product.price}
                </p>
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => dispatch(addToCart(product))}
                >
                  Add to Cart
                </button>
                <button
                  className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 ml-2"
                  onClick={() => dispatch(addToWishlist(product))}
                >
                  Add to Wishlist
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-xl text-gray-500">
          No products found
        </div>
      )}
    </div>
  );
};

export default ProductList;
