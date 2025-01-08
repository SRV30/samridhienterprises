import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth/auth";
import { FaShoppingCart } from "react-icons/fa";
import { IoChevronDownCircleOutline, IoSearch } from "react-icons/io5";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { toast } from "react-toastify";
import gsap from "gsap";

const Header = () => {
  const { isAuthenticated, user, error } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const cartRef = useRef(null);

  const logoRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    gsap.from(logoRef.current, {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: "power3.out",
    });
    gsap.from(menuRef.current, {
      duration: 1,
      x: 50,
      opacity: 0,
      delay: 0.5,
      ease: "power3.out",
    });
    gsap.from(cartRef.current, {
      duration: 1,
      scale: 0,
      opacity: 0,
      delay: 1,
      ease: "elastic.out(1, 0.5)",
    });

    // setCartCount(newCount);
    // setCartPrice(newPrice);
  }, []);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    toast.success("Logged out successfully!");
    navigate("/");

    if (error) {
      toast.error("Error logging out!");
    }
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="text-sm md:text-3xl font-bold text-blue-400 hover:text-blue-500"
          ref={logoRef}
        >
          Samridhi Enterprises
        </Link>

        <form className="search-box flex" onSubmit={searchSubmitHandler}>
          <input
            type="text"
            placeholder="Search here..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="border rounded-l px-2 py-1 md:w-64 w-16"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded-r"
          >
            <IoSearch className="hover:size-5 size-4" />
          </button>
        </form>

        <div className="flex items-center space-x-4" ref={menuRef}>
          {isAuthenticated ? (
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex items-center gap-x-2 px-3 py-2 text-sm font-medium text-blue-400 bg-white border rounded-md shadow-sm hover:bg-blue-500 hover:text-white mx-1">
                <span>Welcome, {user?.name || "User"}</span>
                <IoChevronDownCircleOutline
                  className="text-blue-500 hover:text-white"
                  size={32}
                />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                {user?.role === "admin" && (
                  <MenuItem>
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Admin Dashboard
                    </Link>
                  </MenuItem>
                )}
                <MenuItem>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Account
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-sm text-red-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          ) : (
            <>
              <Link
                to="/login"
                className="text-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white mx-1"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hidden md:inline-block text-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white"
              >
                Signup
              </Link>
            </>
          )}

          <div className="flex items-center text-blue-500" ref={cartRef}>
            <a href="/cart">
              <FaShoppingCart size={24} />
            </a>
            <p className="ml-2 text-sm md:text-base">
              <span className="font-bold">{cartItems.length} Items</span> | ₹
              {cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
              )}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
