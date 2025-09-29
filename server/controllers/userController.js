
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";

const userFilePath = path.join(__dirname, "../models/Users.json");

// Hàm đọc users
const readUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
  } catch (err) {
    return [];
  }
};

const uuidFunction = (req, res) => {
    const { username } = req.body;
    const users = readUsers() || [];

    const user = users.find(u => u.username == username);
    res.json({ 
        message: "Thanh Cong",
        userId: user.id,
    })
};

const uuidFunction1 = (req, res) => {
  const { datax } = req.body; // datax = userId
  const users = readUsers(); // array of users

  const user = users.find(u => u.id === datax);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // destructuring để loại bỏ email và createdAt
  const { email, createdAt, ...userInfo } = user;

  res.json({ 
    message: "Success",
    userInfo
  });
};

const uuidFunction2 = (req, res) => {
  const { data } = req.body;
  const users = readUsers();

  const user = users.find(u => u.id === data);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    message: "Success",
    avatar: user.avatar,
    fullname: user.fullname,
    gender: user.gender
  });
};

module.exports = {
    uuidFunction,
    uuidFunction1,
    uuidFunction2
}