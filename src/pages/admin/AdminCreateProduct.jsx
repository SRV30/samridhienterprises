import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "@/store/products/productsSlice";
import { categories, vehicles } from "@/pages/extra/Data";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const NewProduct = () => {
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    Stock: "",
  });
  const { loading } = useSelector((state) => state.products);

  const dispatch = useDispatch();

  useEffect(() => {
    // Check if all fields are filled to enable the submit button
    const isFormValid =
      productData.name &&
      productData.price &&
      productData.description &&
      productData.category &&
      productData.brand &&
      productData.Stock &&
      images.length > 0; // Ensure images are uploaded

    setIsFormValid(isFormValid);
  }, [productData, images]);

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([]); // Clear previous images
    setImagesPreview([]); // Clear previous image previews

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

    if (!isFormValid) {
      toast.error("Please fill all fields");
      return;
    }

    const productDataWithImages = {
      ...productData,
      images: images.length > 0 ? images : [],
    };

    dispatch(createProduct(productDataWithImages))
      .then(() => {
        toast.success("Product created successfully!");
        setProductData({
          name: "",
          price: "",
          description: "",
          category: "",
          brand: "",
          Stock: "",
        });
        setImages([]);
        setImagesPreview([]);
      })
      .catch((error) => {
        toast.error(
          error.message || "An error occurred while creating the product."
        );
      });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl mt-5 mb-5">
      <Link to="/admin/dashboard">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-6">
          Back to Dashboard
        </button>
      </Link>
      <h2 className="text-3xl font-semibold text-blue-500 mb-6">
        Create New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
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
            placeholder="Enter product name"
          />
        </div>
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
            placeholder="Enter product price"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description/ProductId
          </label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
            className="mt-2 block w-full p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-indigo-500 transition ease-in-out duration-200"
            required
            placeholder="Enter product description"
          />
        </div>

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
            <option value="" disabled selected>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

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
            <option value="" disabled selected>
              Select Vehicle Type
            </option>
            {vehicles.map((vehicle) => (
              <option key={vehicle} value={vehicle}>
                {vehicle}
              </option>
            ))}
          </select>
        </div>

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
            placeholder="Enter the product quantity"
          />
        </div>

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
            required
          />
        </div>

        <div className="flex gap-4 mb-6">
          {imagesPreview.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Preview ${index}`}
              className="w-24 h-24 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 transition ease-in-out duration-200 disabled:bg-gray-400"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
};

export default NewProduct;
