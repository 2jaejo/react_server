const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'your_jwt_secret_key';

exports.login = (req, res) => {
  try {
    const { email, password } = req.body;   
    // 유저 정보 비교


    // JWT 토큰 생성
    const token = jwt.sign({ email: email, password: password }, SECRET_KEY, { expiresIn: '10s' });
    const result = {token: token};
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.getAllUsers = (req, res) => {
  const users = userService.getUsers();
  res.json(users);
};

exports.getUserById = (req, res) => {
  const userId = req.params.id;
  const user = userService.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
