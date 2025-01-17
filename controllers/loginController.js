require('dotenv').config();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 토큰생성
const generateTokens = (user) => {
  const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'});
  const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
  return { accessToken, refreshToken };
};

// 비밀번호 검증하는 함수
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (err) {
    console.error("Error comparing passwords:", err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 비밀번호 해시
    // const hashedPassword = await bcrypt.hash(password, 10);
    const params = [email];
    const user = await pool.query('SELECT * FROM tb_user WHERE user_id = $1', params);
    const chk_pw = await comparePassword(password ,user.rows[0].user_pw);
    if (chk_pw) {
      const { accessToken, refreshToken } = generateTokens(user);
    }

    // JWT 토큰 생성
    const token = jwt.sign({ id: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' });
    const result = {token: token};
    res.status(200).json(result);
    
  } catch (error) {
    res.status(400).json(error.message);
  }
};



exports.join = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // 비밀번호 해시
    // const hashedPassword = await bcrypt.hash(password, 10);
    
    res.status(200).json();
    
  } catch (error) {
    res.status(400).json(error.message);
  }
};