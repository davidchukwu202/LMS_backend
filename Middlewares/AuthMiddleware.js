const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerify= async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.json({ status: false, message: "User not found" });
    }

    return res.json({ status: true, user: user.username });
  } catch (error) {
    console.error("User verification error:", error);
    return res.status(500).json({ status: false, message: "Internal server error" });
  }
};

module.exports.isLoggedIn = (req, res, next) => {
  if(req.user){
    next()
  } else {
    res.sendStatus(401);
  }
};

// module.exports = isLoggedIn;