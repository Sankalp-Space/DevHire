const express = require('express');
const router = express.Router();
const  { verifyToken } = require('../middleware/auth');

const { applyToJob, getApplications } = require('../controllers/application.controller');

router.post('/applications', verifyToken, applyToJob);
router.get('/applications', verifyToken, getApplications);

module.exports = router;
