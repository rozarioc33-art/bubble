import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
        console.log("Authorization header:", req.headers.authorization);
        token = req.headers.authorization.split(" ")[1];

        console.log("Extracted token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log("Decoded:", decoded);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
        return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();

    } catch (err) {
      console.log("JWT ERROR:", err.message);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
};
