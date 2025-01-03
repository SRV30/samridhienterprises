const express = require("express");
const { getAdminData } = require("../controllers/adminController");
const router = express.Router();

router.get("/admin/data", getAdminData);

module.exports = router;
