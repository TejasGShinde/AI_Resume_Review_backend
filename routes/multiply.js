const express = require('express');
const multer = require('multer')
const { multiply } = require('../controllers/multiplication');
const {geminiApi} = require('../controllers/gemini')
const router = express.Router();
const upload = multer({ dest: 'uploads/' })
router.get('/multiply',multiply);
router.post('/gemini',upload.array('file', 12),geminiApi)
module.exports = router;
