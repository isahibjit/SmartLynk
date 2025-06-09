import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const validateUser = (mode = "signup") => {
  return (req, res, next) => {
    const { fullname, email, password } = req.body;
    // Common checks for both modes
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Password length check
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    // Additional fullname check for signup
    if (mode === "signup") {
      if (!fullname) {
        return res.status(400).json({ message: "Fullname is required for signup." });
      }
      const nameRegex = /^[a-zA-Z\s]{3,}$/;
      if (!nameRegex.test(fullname)) {
        return res.status(400).json({
          message: "Fullname must be at least 3 characters and contain only letters and spaces."
        });
      }
    }

    next(); // Proceed to the next middleware or controller
  };
};
export const isAuthenticated = async (req, res,next) => {
  try {
    
    const token = req.cookies.jwt
    if (!token) return res.status(401).json({ message: "User is not logged in" })

    const decode = jwt.verify(token, process.env.JWT_SECRET)
    if (!decode) return res.status(401).json({ message: "User unauthorized, user is not authorized, invalid token" })

    const user = await User.findById(decode.userId).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })

    req.user = user

    next();
  } catch (error) {
    console.log("Error in isAuthenticated middleware: ", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

