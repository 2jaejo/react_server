// 임시 사용자 데이터
const users = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Charlie', age: 35 },
];

const userService = {
  getUsers: () => {
    return users;
  },
  getUserById: (id) => {
    return users.find((user) => user.id === parseInt(id, 10));
  },
};

export default userService;

// export const getUsers = () => {
//   return users;
// };

// export const getUserById = (id) => {
//   return users.find((user) => user.id === parseInt(id, 10));
// };