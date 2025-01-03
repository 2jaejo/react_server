const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware 설정
app.use(cors()); // CORS 허용
app.use(bodyParser.json()); // JSON 요청 본문 파싱
app.use(bodyParser.urlencoded({ extended: true })); // URL-encoded 요청 본문 파싱

// 라우트 예제
app.get("/", (req, res) => {
  res.send("Express 서버가 정상적으로 작동 중입니다!");
});

// REST API 엔드포인트 예제
let data = [
  { id: 1, name: "React" },
  { id: 2, name: "Express" },
  { id: 3, name: "Node.js" },
];

// GET: 모든 데이터 조회
app.get("/api/items", (req, res) => {
  res.json(data);
});

// POST: 새로운 데이터 추가
app.post("/api/items", (req, res) => {
  const newItem = {
    id: data.length + 1,
    name: req.body.name,
  };
  data.push(newItem);
  res.status(201).json(newItem);
});

// PUT 요청: 데이터를 수정하는 API
app.put('/api/items', (req, res) => {
    const { id, name } = req.body; // 요청 본문에서 name 가져옴
    // 데이터 배열에서 해당 id를 가진 객체 찾기
    const item = data.find((item) => item.id === parseInt(id));
    if (!item) {
      // 데이터가 존재하지 않으면 404 응답
      return res.status(404).json({ message: `Item with id ${id} not found` });
    }
    // 데이터 수정
    item.name = name;
    // 수정된 데이터 응답
    res.json({ message: `Item with id ${id} has been updated`, updatedItem: item });
});

// DELETE: 특정 데이터 삭제
app.delete("/api/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  data = data.filter((item) => item.id !== id);
  res.status(204).send(); // No Content
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
