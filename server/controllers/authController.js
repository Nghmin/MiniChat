
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "your_secret_key";


// Đường dẫn file JSON
const userFilePath = path.join(__dirname, "../models/Users.json");

// Hàm đọc users
const readUsers = () => {
  try {
    return JSON.parse(fs.readFileSync(userFilePath, "utf-8"));
  } catch (err) {
    return [];
  }
};

// Hàm ghi users
const writeUsers = (users) => {
  fs.writeFileSync(userFilePath, JSON.stringify(users, null, 2), "utf-8");
};

function createConversation(userId, content = "Xin chào bạn !") {
  const now = new Date().toISOString();
  
  return {
    id: "ctc_1",
    type: "personal",
    members: [
      "global-id", // ID mặc định toàn hệ thống
      userId
    ],
    last_message: {
      content: content,
      sender: "global-id",
      timestamp: now,
      message_type: "text"
    },
    created_at: now,
    updated_at: now,
    active: true
  };
}

function saveConversation(userId, content) {
  const conversation = createConversation(userId, content);

  // đường dẫn tới models/chatList.json (ra ngoài controllers, rồi vào models)
  const filePath = path.join(__dirname, "../models/chatList.json");

  // đảm bảo thư mục models tồn tại
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // nếu file đã có thì đọc ra trước
  let chatList = [];
  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      if (raw.trim().length > 0) {
        chatList = JSON.parse(raw);
      }
    } catch (err) {
      console.error("Lỗi đọc chatList.json:", err);
      chatList = [];
    }
  }

  // thêm cuộc trò chuyện mới vào list
  chatList.push(conversation);

  // ghi lại file JSON
  fs.writeFileSync(filePath, JSON.stringify(chatList, null, 2), "utf-8");

  console.log("✅ Đã ghi vào chatList.json thành công!");
}


const login = (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).json({ message: "Sai tài khoản hoặc mật khẩu" });
  }

  const tokenJWT = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "7d" } // token hết hạn 7 ngày
  );

  // Trả về client thông tin user + token
  res.json({
    message: "Đăng nhập thành công",
    user: { 
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      fullname: user.fullname,
      gender: user.gender,
      birthday: user.birthday,
    },
    token: tokenJWT
  });
};

const forgotPassword = (req, res) => {
  const { email, phone } = req.body;
  const users = readUsers();

  const user = users.find(u => u.email === email && u.username === phone);
  if (!user) {
    return res.status(401).json({ message: "Email hoặc tài khoản không chính xác" });
  }

  res.json({ message: "Xác nhận thành công" });
};

const resetPassword = (req, res) => {
  const { phone, email, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.username === phone && u.email === email);
  if (!user) {
    return res.status(401).json({ message: "Không tìm thấy người dùng" });
  }

  user.password = password;
  writeUsers(users); // Lưu lại JSON

  res.json({ message: "Đổi mật khẩu thành công" });
};

const register = (req, res) => {
  const { email, phone, password } = req.body;
  const users = readUsers();

  const existingUser = users.find(u => u.email === email || u.username === phone);
  if (existingUser) {
    return res.status(401).json({ message: "Tài khoản hoặc email đã tồn tại" });
  }

  const newUser = {
    id: uuidv4(),
    username: phone,
    email: email,
    password: password,
    avatar: null,
    fullname: null,
    gender: null,
    birthday: null,
    createdAt: new Date(),
  };

  users.push(newUser);
  writeUsers(users); // Lưu lại JSON

  console.log("User mới:", newUser);
  res.json({ message: "Đăng ký thành công" });
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Đăng xuất thành công" });
}

const updateProFile = (req, res) => {
  const { fullname, gender, birthday, username } = req.body;

  console.log(fullname);
  console.log(gender);
  console.log(birthday);
  console.log(username);

  // Nếu có file mới thì lấy path, không thì dùng ảnh mặc định
  const profileImage = req.file
    ? `/uploads/${req.file.filename}`
    : "/uploads/default-avatar.png"; // ảnh mặc định

  console.log(profileImage);
  const users = readUsers();
  
  const user = users.find(u => u.username === username);

  user.avatar = profileImage;
  user.fullname = fullname;
  user.gender = gender;
  user.birthday = birthday;

  writeUsers(users);

  saveConversation(user.id, "Xin chào bạn !");

  const tokenJWT = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: "7d" } // token hết hạn 7 ngày
  );

  res.json({
    message: "Đăng nhập thành công",
    user: { 
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      fullname: user.fullname,
      gender: user.gender,
      birthday: user.birthday,
    },
    token: tokenJWT
  });
};


module.exports = {
  login,
  forgotPassword,
  resetPassword,
  register,
  logout,
  updateProFile,
};








