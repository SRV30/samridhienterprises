import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "@/store/products/productDetailsSlice";
import { toast } from "react-toastify";
import { addItemsToCart } from "@/store/extra/cartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [dispatch, id]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const productImages = product?.images || [];

  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      toast.error("Products are out of stock");
      return;
    }
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) {
      toast.error("Quantity can't be less than 1");
      return;
    }
    setQuantity(quantity - 1);
  };

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= product.Stock) {
      toast.error("Products are out of stock");
      setQuantity(product.Stock);
    } else if (value < 1) {
      toast.error("Quantity can't be less than 1");
      setQuantity(1);
    } else {
      setQuantity(value);
    }
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % productImages.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + productImages.length) % productImages.length
    );
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  const addToCartHandler = (id, quantity) => {
    try {
      if (!id || quantity < 1) {
        toast.error("Invalid product or quantity.");
        return;
      }

      console.log("Adding to Cart - ID:", id, "Quantity:", quantity);
      dispatch(addItemsToCart({ id, quantity }));
      toast.success("Item added to Cart");
    } catch (error) {
      console.error("Add to Cart Error:", error);
      toast.error("Failed to add item to cart");
    }
  };

  return (
    <div className="product-details">
      <div className="container mx-auto p-6 md:p-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Images Section */}
          <div className="md:w-1/2 relative">
            {/* Main Image */}
            <img
              src={productImages[currentSlide]?.url}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg object-cover"
            />
            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {productImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`w-3 h-3 rounded-full ${
                    currentSlide === index ? "bg-blue-600" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
            {/* Image Navigation */}
            {productImages.length > 1 && (
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 flex space-x-4">
                <button
                  onClick={handlePrevSlide}
                  className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition"
                >
                  Prev
                </button>
                <button
                  onClick={handleNextSlide}
                  className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-blue-800 hover:text-blue-600 transition duration-300">
              {product.name}
            </h2>
            <p className="text-2xl mt-2 font-semibold text-gray-800">
              ₹{product.price}
            </p>
            <p className="mt-2 text-lg font-medium text-gray-600 hover:text-blue-600 cursor-pointer transition duration-200">
              Category:{" "}
              <span className="font-normal text-gray-500">
                {product.category}
              </span>
            </p>
            <p className="mt-2 text-lg font-medium text-gray-600 hover:text-blue-600 cursor-pointer transition duration-200">
              Vehicle Type:{" "}
              <span className="font-normal text-gray-500">{product.brand}</span>
            </p>
            <div className="mt-4 p-4 border-l-4 border-blue-500 rounded-lg shadow-md">
              <p className="text-lg text-gray-700">{product.description}</p>
            </div>
            <p className="text-lg font-medium text-gray-800">
              Status:
              <b
                className={`${
                  product?.Stock < 1 ? "text-red-600" : "text-green-600"
                } transition-colors duration-300`}
              >
                <span className={`mr-2`}>
                  {product?.Stock < 1 ? (
                    <i className="fas fa-exclamation-circle text-red-600"></i>
                  ) : (
                    <i className="fas fa-check-circle text-green-600"></i>
                  )}
                </span>
                {product?.Stock < 1 ? "Out of Stock" : "In Stock"}
              </b>
            </p>

            <div className="mt-6 flex items-center space-x-4">
              <button
                onClick={decreaseQuantity}
                className="bg-blue-500 text-white py-2 px-4  rounded-full hover:bg-blue-600 transition"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-16 text-center p-2 border border-gray-300 rounded-md"
                min="1"
                max={product.Stock}
              />
              <button
                onClick={increaseQuantity}
                className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
              disabled={product.Stock < 1}
              onClick={() => addToCartHandler(id, quantity)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
