import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearError, clearSuccess } from "@/store/auth/profile";
import {
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import MetaData from "../extra/MetaData";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = (setter) => {
    setter((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassword({ oldPassword, newPassword, confirmPassword }));
  };

  useEffect(() => {
    gsap.from(".updatePasswordBox", {
      opacity: 0,
      y: -30,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".textField", {
      opacity: 0,
      y: 20,
      stagger: 0.2,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".updatePasswordBtn", {
      opacity: 0,
      scale: 0.5,
      delay: 0.5,
      duration: 1,
      ease: "back.out(1.7)",
    });

    if (success) {
      toast.success("Password updated successfully!");
      navigate("/profile");
      dispatch(clearSuccess());
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [success, error, dispatch, navigate]);

  return (
    <Box
      className="updatePasswordBox"
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 15,
        mb: 15,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "background.paper",
      }}
    >
      <MetaData title="Update Password" />
      <Typography variant="h5" gutterBottom>
        Update Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Old Password"
          type={showOldPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          required
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePasswordVisibility(setShowOldPassword)}
                  edge="end"
                >
                  {showOldPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="textField"
        />
        <TextField
          label="New Password"
          type={showNewPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => togglePasswordVisibility(setShowNewPassword)}
                  edge="end"
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="textField"
        />
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() =>
                    togglePasswordVisibility(setShowConfirmPassword)
                  }
                  edge="end"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          className="textField"
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          disabled={loading}
          className="updatePasswordBtn"
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Update Password"
          )}
        </Button>
      </form>
    </Box>
  );
};

export default UpdatePassword;
