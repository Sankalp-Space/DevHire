const express = require('express');
const router = express.Router();
const { registerUser,loginUser } = require('../controllers/user.controller');

const { registerValidation, validate } = require('../middleware/validate');

router.post('/register',registerValidation,  validate,  registerUser);
router.post('/login', loginUser);

module.exports = router;