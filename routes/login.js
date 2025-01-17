const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// validate
router.get('/validate', loginController.validate);

// 로그인
router.post('/login', loginController.login);

// 로그아웃
router.post('/logout', loginController.logout);

module.exports = router;
