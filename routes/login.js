const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// 로그인
router.post('/', loginController.login);



module.exports = router;
