import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/auth-page/Login";
import SignupPage from "./pages/auth-page/Signup";
import UserProfile from "./pages/auth-page/UserProfile";
import Header from "./pages/components/Header";
import Footer from "./pages/components/Footer";
import Home from "./pages/components/Home";
import ProductsList from "./pages/products/ProductPage";
import ProductDetails from "./pages/products/ProductDetails";
import ProtectedRoute from "./pages/extra/ProtectedRoute";
import GetInTouch from "./pages/components/GetInTouch";
import AboutUsPage from "./pages/components/AboutUsPage";
import UpdateProfile from "./pages/auth-page/UpdateProfile";
import UpdatePassword from "./pages/auth-page/UpdatePassword";
import ForgotPassword from "./pages/auth-page/ForgotPassword";
import ResetPassword from "./pages/auth-page/ResetPassword";
import CartPage from "./pages/cart/CartPage";
import ConfirmOrder from "./pages/cart/ConfirmOrder";
import OrderSuccess from "./pages/cart/OrderSuccess";
import MyOrders from "./pages/orders/MyOrders";
import OrderDetails from "./pages/orders/OrderDetails";
import { useSelector } from "react-redux";
import Dashboard from "./pages/admin/AdminDashboard";
import AdminData from "./pages/admin/AdminData";
import ProductList from "./pages/admin/AdminProductList";
import NewProduct from "./pages/admin/AdminCreateProduct";
import UpdateProduct from "./pages/admin/AdminUpdateProduct";
import AdminOrderList from "./pages/admin/AdminOrderList";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import AdminUsersList from "./pages/admin/AdminUserList";
import AdminUpdateUser from "./pages/admin/AdminUpdateUser";
import AdminContact from "./pages/admin/AdminGetInTouch";
import AboutUsAdmin from "./pages/admin/AdminAboutUs";
import PaymentDetailsAdmin from "./pages/admin/AdminPaymentDetails";
import NotFound from "./pages/extra/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <>
      <ToastContainer position="top-center" />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:keyword" element={<ProductsList />} />
        <Route path="/search" />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/contact" element={<GetInTouch />} />
        <Route path="/about-us" element={<AboutUsPage />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/me/update"
          element={
            <ProtectedRoute>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/password/update"
          element={
            <ProtectedRoute>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        <Route path="/cart" element={<CartPage />} />
        <Route
          path="/success"
          element={
            <ProtectedRoute>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/confirm"
          element={
            <ProtectedRoute>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order/:orderId"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        
        {isAuthenticated && user.role === "admin" && (
          <>
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute isAdmin={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/data"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AdminData />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute isAdmin={true}>
                  <ProductList />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/create/product"
              element={
                <ProtectedRoute>
                  <NewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/product/:id"
              element={
                <ProtectedRoute>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <AdminOrderList />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/order/:id"
              element={
                <ProtectedRoute>
                  <AdminOrderDetails />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminUsersList />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/user/:id"
              element={
                <ProtectedRoute>
                  <AdminUpdateUser />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/payment"
              element={
                <ProtectedRoute>
                  <PaymentDetailsAdmin />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/contact"
              element={
                <ProtectedRoute>
                  <AdminContact />
                </ProtectedRoute>
              }
            />
            <Route
              isAdmin={true}
              path="/admin/about-us"
              element={
                <ProtectedRoute>
                  <AboutUsAdmin />
                </ProtectedRoute>
              }
            />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
