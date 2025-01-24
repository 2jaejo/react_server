// const userService = require('../services/userService');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

import userService from '../services/userService.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const SECRET_KEY = 'your_jwt_secret_key';

const userController = {
  join: async (req, res) => {
    try {
      const result = await userService.join(req);
      res.status(201).json(result);
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // 비밀번호 해시
      // const hashedPassword = await bcrypt.hash(password, 10);
      const params = [email];
      const user = await userService.getUserById(params);
      const chk_pw = await bcrypt.compare(password ,user.user_pw);
      console.log(chk_pw);
      if (chk_pw) {
        const token = jwt.sign({ email: email, password: password }, SECRET_KEY, { expiresIn: '10s' });
        const result = {token: token};
        res.status(200).json(result);
      }
      else{
        throw new Error("비밀번호를 확인하세요.");
      }
      
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
  getAllUsers: async (req, res) => {
    const users = await userService.getUsers();
    res.json(users);
  },
  getUserById: async (req, res) => {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  },
}

export default userController;

// export const login = (req, res) => {
//   try {
//     const { email, password } = req.body;   
//     // 유저 정보 비교


//     // JWT 토큰 생성
//     const token = jwt.sign({ email: email, password: password }, SECRET_KEY, { expiresIn: '10s' });
//     const result = {token: token};
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(400).json(error.message);
//   }
// };

// export const getAllUsers = (req, res) => {
//   const users = userService.getUsers();
//   res.json(users);
// };

// export const getUserById = (req, res) => {
//   const userId = req.params.id;
//   const user = userService.getUserById(userId);

//   if (user) {
//     res.json(user);
//   } else {
//     res.status(404).json({ message: 'User not found' });
//   }
// };
