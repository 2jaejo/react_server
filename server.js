const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = require('./config/serverConfig').DEFAULT_PORT;
const app = express();


// Middleware 설정
app.use(cors()); // CORS 허용
app.use(bodyParser.json()); // JSON 요청 본문 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 요청 본문 파싱

// 서버 실행
const server = app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});

// 웹소켓
const WebSocket = require("ws");
const wss = new WebSocket.Server({server});
wss.on('connection', (ws, req) => {
  console.log("client가 WebSocket에 연결 되었습니다.");
  console.log(req.headers);

  ws.send('WebSocket 연결.');
  // 서버에서 데이터 전송
  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      const timestamp = new Date().toISOString();
      ws.send(`${timestamp}`);
    }
  }, 2000);

  ws.on('message',(msg) => {
    console.log(`message: ${msg}`);
  });

  ws.on('close', () => {
    console.log('client 연결 종료.');
    clearInterval(interval);
  });

});


// 라우트 연결
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const itemRouter = require('./routes/item');

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/api/items', itemRouter);


