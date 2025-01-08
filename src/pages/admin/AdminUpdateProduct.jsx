import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateProduct, clearErrors } from "@/store/products/productsSlice";
import { getProductDetails } from "@/store/products/productDetailsSlice";
import { categories, vehicles } from "@/pages/extra/Data";
import { toast } from "react-toastify";

const UpdateProduct = () => {
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    Stock: "",
  });

  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector((state) => state.products);
  const { product } = useSelector((state) => state.productDetails);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(getProductDetails(id));
    }

    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      toast.success("Product updated successfully!");
      navigate(0);
    }
  }, [dispatch, id, error, success, navigate]);

  useEffect(() => {
    if (product) {
      setProductData({
        name: product.name || "",
        price: product.price || "",
        description: product.description || "",
        category: product.category || "",
        brand: product.brand || "",
        Stock: product.Stock || 0,
      });
      setOldImages(product?.images?.map((image) => image?.url || image) || []);
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // If no new images are selected, keep the old images
    const updatedProductData = {
      ...productData,
      images: images.length > 0 ? images : oldImages, // Use oldImages if no new images
    };

    dispatch(updateProduct({ id, productData: updatedProductData }));
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-5 mb-5">
      <Link to="/admin/dashboard">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6">
          Back to Dashboard
        </button>
      </Link>
      <h2 className="text-3xl font-semibold text-blue-600 mb-6">
        Update Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
          />
        </div>

        {/* Product Price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
          />
        </div>

        {/* Product Description */}
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description/Product Id
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
          />
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle Type Selection */}
        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Vehicle Type
          </label>
          <select
            id="brand"
            name="brand"
            value={productData.brand}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
          >
            {vehicles.map((vehicle) => (
              <option key={vehicle} value={vehicle}>
                {vehicle}
              </option>
            ))}
          </select>
        </div>

        {/* Stock Input */}
        <div className="mb-4">
          <label
            htmlFor="stock"
            className="block text-sm font-medium text-gray-700"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            id="stock"
            name="Stock"
            value={productData.Stock}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Product Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImageChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            accept="image/*"
          />
        </div>

        {/* Image Previews */}
        <div className="flex gap-4 mb-6">
          {oldImages.map((image, index) => (
            <img
              key={index}
              src={typeof image === "string" ? image : image.url} // Check if it's an object or string
              alt="Old Product Preview"
              className="w-24 h-24 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>

        <div className="flex gap-4">
          {imagesPreview.map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Product Preview"
              className="w-24 h-24 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-500"
          } transition ease-in-out duration-200`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
