import { WebSocketServer } from "ws";

class WebSocketManager {
  constructor(server) {
    // 클라이언트 관리
    this.clients = [];
    // 클라이언트 구독 관리
    this.subscriptions = new Map();
  
    // 센서 데이터 예시 (임의 데이터)
    this.sensorData = {
      sensor1: () => Math.random().toFixed(1),
      sensor2: () => Math.random().toFixed(2),
      sensor3: () => Math.random().toFixed(3),
    };

    this.wss = new WebSocketServer({ server });

    this.wss.on("connection", (ws) => {
      console.log("New client connected");

      const interval = setInterval(() => {
        this.subscriptions.forEach((sensors, client) => {
          if (client.readyState === WebSocket.OPEN) {
            const dataToSend = {};
            sensors.forEach((sensor) => {
              if (this.sensorData[sensor]) {
                dataToSend[sensor] = this.sensorData[sensor]();
              }
            });
            client.send(JSON.stringify({ sensors: dataToSend }));
          }
        });
      }, 2000); // 2초마다 전송

      ws.on("message", (message) => {
        console.log(`Received: ${message}`);

        const data = JSON.parse(message);
        if (data.action && data.action === "subscribe") {
          // 클라이언트의 구독 요청 처리
          this.subscriptions.set(ws, data.sensors); // 예: { action: 'subscribe', sensors: ['sensor1', 'sensor3'] }
          ws.send(JSON.stringify({ status: 'subscribed', sensors: data.sensors }));
        }
      });

      ws.on("error", (error) => {
        console.log(`error: ${error}`);
      });

      ws.on("close", () => {
        console.log("Client disconnected");
        this.subscriptions.delete(ws);
        clearInterval(interval);
      });
    });


  }

}

export default WebSocketManager;
