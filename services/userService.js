// 임시 사용자 데이터
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
];

exports.getUsers = () => {
  return users;
};

exports.getUserById = (id) => {
  return users.find((user) => user.id === parseInt(id, 10));
};