import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, isAdmin }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin === true && user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
