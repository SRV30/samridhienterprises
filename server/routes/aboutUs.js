const express = require('express');
const router = express.Router();
const aboutUsController = require('../controllers/aboutUsController');

router.get('/get/about-us', aboutUsController.getAboutUs);

router.put('/update/about-us', aboutUsController.updateAboutUs);

module.exports = router;
