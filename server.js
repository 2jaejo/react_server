// const express = require("express");
// const cors = require("cors");
// const cookieParser = require('cookie-parser');
// const bodyParser = require("body-parser");
// const PORT = require('./config/serverConfig').DEFAULT_PORT;
// // import WebSocket from 'ws';
// const authenticateToken = require('./utils/authToken');
// const WebSocketManager = require('./utils/webSocketManager');
// // const OPCUAClientModule = require('./utils/opcuaClientModule');
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { DEFAULT_PORT } from './config/serverConfig.js';  // 구조 분해 할당
import authenticateToken from './utils/authToken.js';  // default export로 추정

import { WebSocketServer } from 'ws';
import { OPCUAClient, AttributeIds } from 'node-opcua';
import WebSocketManager from './utils/webSocketManager.js';  // default export의 경우
import OPCUAClientModule from './utils/opcuaClientModule.js';  // 사용하려는 경우 추가

// 라우트 연결
// const indexRouter = require('./routes/index');
// const loginRouter = require('./routes/login');
// const userRouter = require('./routes/user');
// const itemRouter = require('./routes/item');
import indexRouter from './routes/index.js';
import loginRouter from './routes/login.js';
import userRouter from './routes/user.js';
import itemRouter from './routes/item.js';



const app = express();
const PORT = DEFAULT_PORT;

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

app.use('/', indexRouter);
app.use('/auth', loginRouter);
app.use('/users', userRouter);
app.use('/api/items', itemRouter);


// WebSocketManager 생성
const wsm = new WebSocketManager(server);

// 종료 시 클라이언트 연결 해제
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  // await opcuaClientModule.close();
  process.exit(0);
});


// OPC UA 서버의 엔드포인트 URL
const endpointUrl = "opc.tcp://localhost:8087/abhopcua/server/"; // 예시 서버 주소
// OPC UA 클라이언트 싱글톤 인스턴스 생성
const opcuaClient = OPCUAClientModule.getInstance();
await opcuaClient.connect(endpointUrl);



