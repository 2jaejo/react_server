const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const PORT = require('./config/serverConfig').DEFAULT_PORT;
const app = express();
const authenticateToken = require('./utils/authToken'); 
const webSocketServer = require('./utils/websocketServer');

// Middleware 설정
app.use(cors({
  credentials: true
})); // CORS, 서버는 클라이언트가 보낸 쿠키를 포함한 요청을 수락하도록 허용
app.use(cookieParser());
app.use(bodyParser.json()); // JSON 요청 본문 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 요청 본문 파싱
app.use(authenticateToken.unless({
  path: [
    { url: '/auth/login', methods: ['POST'] }, 
    { url: '/auth/join', methods: ['POST'] },
  ]
})); // 인증 제외

// 서버 실행
const server = app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});


// 웹소켓
webSocketServer(server);


// 라우트 연결
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const itemRouter = require('./routes/item');

app.use('/', indexRouter);
app.use('/auth', loginRouter);
app.use('/users', userRouter);
app.use('/api/items', itemRouter);


