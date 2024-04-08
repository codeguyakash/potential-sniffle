import jwt from "jsonwebtoken";


const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Invalid or missing token format" });
    }

    const tokenValue = token.split(" ")[1];
    const user = jwt.verify(tokenValue,process.env.SECRET_KEY);
    req.userId = user.id;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

export { auth };
