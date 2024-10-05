const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { login, register, verify } = require('../controller/authentication.js');
require('dotenv').config();


//POST /api/Register
router.post('/register', register);
// POST /api/login
router.post('/login', login);

router.post('/verify', verify);


module.exports = router;