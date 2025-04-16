const express = require('express');
const multer = require('multer')
const { multiply } = require('../controllers/multiplication');
const {geminiApi, getResumeSummary} = require('../controllers/gemini')
const router = express.Router();
const upload = multer({ dest: 'uploads/' })
router.get('/multiply',multiply);
router.post('/gemini',upload.array('file', 12),geminiApi)
router.post('/summary',upload.array('file', 12),getResumeSummary)
module.exports = router;
