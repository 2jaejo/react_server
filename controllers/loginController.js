require('dotenv').config();
const pool = require('../config/db');

const loginService = require('../services/loginService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const accessTokenExpiry = '10m';  // 액세스 토큰 만료 시간
const refreshTokenExpiry = '7d';  // 리프레시 토큰 만료 시간

const generateTokens = (user) => {
  const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: accessTokenExpiry,
  });

  const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: refreshTokenExpiry,
  });

  return { accessToken, refreshToken };
};


exports.login = async (req, res) => {
  try {
    // 유효성 검사 후, 사용자 정보 반환 (예시)
    const { email, password } = req.body;   
    const params = [email, password];
    const user = await pool.query('SELECT * FROM tb_user WHERE user_id = $1 AND user_pw = $2', params)[0];
    console.log(user);

    if (user) {
      const { accessToken, refreshToken } = generateTokens(user);
    }

    // JWT 토큰 생성
    const token = jwt.sign({ email: email, password: password }, SECRET_KEY, { expiresIn: '10s' });
    const result = {token: token};
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json(error.message);
  }
};
