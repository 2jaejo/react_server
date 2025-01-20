// websocketServer.js
const WebSocket = require('ws');

function websocketServer(server) {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws, req) => {
  
    console.log('client가 WebSocket에 연결 되었습니다.');
    console.log(req.headers);

    ws.send('WebSocket 연결.');

    // 서버에서 주기적으로 데이터 전송
    const interval = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        const timestamp = new Date().toISOString();
        ws.send(`${timestamp}`);
      }
    }, 2000);

    ws.on('message', (msg) => {
      console.log(`message: ${msg}`);
    });

    ws.on('close', () => {
      console.log('client 연결 종료.');
      clearInterval(interval);
    });
    
  });

  return wss;
}

module.exports = websocketServer;
