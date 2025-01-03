// routes/contactRoutes.js
const express = require('express');
const { submitContactForm, getContactForms, deleteContactForms } = require('../controllers/contactController');
const router = express.Router();

router.post('/submit/contact', submitContactForm);
router.get('/see/contact', getContactForms); 
router.delete('/deleteold', deleteContactForms); 

module.exports = router;
