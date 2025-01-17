require('dotenv').config();
const pool = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 토큰생성
const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user.user_id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: process.env.ACCESS_TOKEN_EXPIRES});
  const refreshToken = jwt.sign({ id: user.user_id }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: process.env.REFRESH_TOKEN_EXPIRES});
  return { accessToken, refreshToken };
};


// 비밀번호 검증
const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (err) {
    console.error("Error comparing passwords:", err);
  }
};

// 미들웨어에서 토큰 검증
exports.validate = (req, res) => {
  console.log("validate");
  res.status(200).send();
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 비밀번호 해시
    // const hashedPassword = await bcrypt.hash(password, 10);
    const params = [email];
    const user = await pool.query('SELECT * FROM tb_user WHERE user_id = $1', params);
    const chk_pw = await comparePassword(password ,user.rows[0].user_pw);
    console.log(chk_pw);
    if (chk_pw) {
      const { accessToken, refreshToken } = generateTokens(user);
      const result = {token: accessToken};

      // HTTP-Only 쿠키에 리프레시 토큰 저장
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,       // JavaScript로 접근 불가
        // secure: process.env.NODE_ENV === 'production', // HTTPS 환경에서만 사용
        sameSite: 'strict',   // SameSite 설정
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7일간 유효
      });
      res.status(200).json(result);
    }
    else{
      throw new Error("비밀번호를 확인하세요.");
    }
    
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie('refreshToken'); // 리프레시 토큰 쿠키 제거
    return res.status(200).json({ message: '로그아웃 성공.' });
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