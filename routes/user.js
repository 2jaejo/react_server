// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// 로그인
router.post('/login', userController.login);

// 사용자 목록 가져오기
router.get('/', userController.getAllUsers);

// 특정 사용자 가져오기
router.get('/:id', userController.getUserById);

// module.exports = router;

export default router; 
