const worker = require("../models/worker");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { name, password, email, role } = req.body;

    // check if worker exist
    const checkWorkerExist = await worker.findOne({ $or: [{ email }] });
    if (checkWorkerExist) {
      res.status(400).json({
        success: false,
        message: "user with this email already exist",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user

    const createWorker = await worker.create({
      name,
      password: hashedPassword,
      email,
      role: role || "worker",
    });

    res.status(201).json({
      success: true,
      message: "Worker registered successfully",
      data: createWorker,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// login controller
const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findWorker = await worker.findOne({ email });
    if (!findWorker) {
      res.status(400).json("user does not exist");
    }
    // check for correct password
    const passwordCheck = await bcrypt.compare(password, findWorker.password);
    if (!passwordCheck) {
      res.status(400).json({ success: false, message: "incorrect password" });
    }

    // create bearer token
    const accesToken = jwt.sign(
      {
        workerId: findWorker._id,
        name: findWorker.name,
        role: findWorker.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "10m",
      }
    );
    res.status(200).json({
      success: true,
      message: "logged in succesfully",
      accesToken,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = { Register, Login };
