import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";

// Login Logic
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const foundUser = await userModel.findOne({ email });
    if (!foundUser) {
      return res.status(404).json({ success: false, msg: "User Not Found" });
    }
    
    const isMatched = await bcrypt.compare(password, foundUser.password);
    if (isMatched === false) {
      return res.status(401).json({ success: false, msg: "Invalid Password" });
    }
    
    const token = foundUser.generateToken();

    res.cookie("token", token, {
      httpOnly: true, // ✅ Secure against XSS attacks
      secure: true, // ✅ Required for cross-origin cookies in HTTPS
      sameSite: "None", // ✅ Required for cross-origin authentication
      maxAge: 3 * 24 * 60 * 60 * 1000
    });
    
    
    return res.status(200).json({ 
      success: true, 
      msg: "Login Successful", 
      id: foundUser._id, 
      token: token 
    });
  } catch (error) {
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

// Register Logic
export const register = async (req, res) => {
  const { userName, email, password } = req.body;
  const foundUser = await userModel.findOne({ email });
  if (foundUser) {
    return res.status(401).json({ err: "Email Already Exists" });
  }
  try {
    const createdUser = await userModel.create({ userName, email, password });
    const token = await createdUser.generateToken();
    res.status(201).json({ success: true, msg: "User Registered Successfully", id: createdUser._id, token });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: false, sameSite: "Lax" });
  res.json({ success: true, msg: "Logged out successfully" });
};