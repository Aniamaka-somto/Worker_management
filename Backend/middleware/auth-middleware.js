const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  console.log("auth middleware was called");

  //don't exactly know what this is for but im just gonna cram
  const authHeader = req.headers["authorization"];

  //verify token if user doesnt have token then the user insnt logged in so no access
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "access denied",
    });
  }

  try {
    //decodes token and assigns it to res.userInfo which was later referenced in the admin middleware
    const decodeTokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodeTokenInfo);
    req.userInfo = decodeTokenInfo;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
