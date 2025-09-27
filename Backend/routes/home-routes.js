const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

router.get("/home", authMiddleware, (req, res) => {
  const { name, workerId, role } = req.userInfo;

  res.json({
    message: "welcome to the home page",
    body: { _id: workerId, username: name, role: role },
  });
});

module.exports = router;
