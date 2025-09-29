
const loginInput = (req, res, next) => {
  const { username, password } = req.body;
  
  // Check thiếu thông tin
  if (!username || !password) {
    return res.status(400).json({ 
      message: "Vui lòng nhập đầy đủ thông tin" 
    });
  }

  if (isNaN(username)) {
    return res.status(400).json({
        message: "Tài khoản chỉ bao gồm số"
    });
  }

  if (username.length != 10) {
    return res.status(400).json({
        message: "Tài khoản có 10 chữ số"
    });
  }

  // Check độ dài password
  if (password.length < 8 || password.length > 16) {
    return res.status(400).json({ 
      message: "Mật khẩu phải từ 8 đến 16 ký tự" 
    });
  }

  // Check format password
  const passwordRegex = /^[a-z0-9]+$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 
      message: "Mật khẩu chỉ được chứa chữ thường và số" 
    });
  }

  // Tất cả validation OK → next()
  next();
};


const forgotPasswordInput = (req, res, next) => {
  const { email, phone } = req.body;

  if (!email || !phone) {
    return res.status(401).json({
      message: 'Vui lòng nhập đầy đủ email và số điện thoại'
    });
  }
    
    // Validation email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({
        message: 'Email không hợp lệ'
      });
    }
    
    // Validation phone format (VN)
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    if (!phoneRegex.test(phone)) {
      return res.status(401).json({
        message: 'Số điện thoại không hợp lệ'
      });
    }

    next();
}

const resetPasswordInput = (req, res, next) => {
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword) {
    return res.status(401).json({
      message: "Vui lòng nhập đầy đủ mật khẩu và xác nhận mật khẩu!"
    });
  }

  if (password !== confirmPassword) {
    return res.status(401).json({
      message: "Mật khẩu xác nhận không khớp!"
    });
  }

  next();
}

const registerInput = (req, res, next) => {
  const { email, phone, password, confirmPassword } = req.body;

  if (!email || !phone || !password || !confirmPassword) {
    return res.status(401).json({
      message: "Vui lòng nhập đầy đủ thông tin!"
    });
  }

  if (password !== confirmPassword) {
    return res.status(401).json({
      message: "Mật khẩu xác nhận không khớp"
    });
  }

  next();
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "Token không tồn tại" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ message: "Token không tồn tại" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // lưu thông tin user vào req
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token không hợp lệ hoặc hết hạn" });
  }
};

module.exports = { loginInput, forgotPasswordInput, resetPasswordInput, registerInput, verifyToken };