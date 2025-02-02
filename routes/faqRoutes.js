const express = require('express');
const { handlePostFaq, handleGetFaq } = require('../controllers/faqController');

const router =  express.Router();


router.get('/listFaq',handleGetFaq);
router.post('/postFaq',handlePostFaq)


module.exports = router;