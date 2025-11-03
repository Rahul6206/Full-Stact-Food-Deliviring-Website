import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    const token = req.cookies?.token || (authHeader && authHeader.replace("Bearer ", ""));

    // ✅ Make sure token exists and is a string
    if (!token || typeof token !== "string" || token.trim() === "") {
      return res.status(401).json({ message: "Unauthorized, no valid token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();

  } catch (error) {
    console.error("isAuthenticated middleware error:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(500).json({ message: "Internal server error" });
  }
};
