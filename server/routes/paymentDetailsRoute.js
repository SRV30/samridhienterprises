const express = require("express");
const {
  getPaymentDetails,
  updatePaymentDetails,
} = require("../controllers/paymentDetailsController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/get/paymentDetails").get(isAuthenticatedUser, getPaymentDetails);
router.route("/update/paymentDetails").put(isAuthenticatedUser, authorizeRoles("admin"), updatePaymentDetails);

module.exports = router;