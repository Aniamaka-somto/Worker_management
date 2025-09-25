const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Fullname is required"],
    trim: true,
    maxLength: 100,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    maxLength: 100,
  },
  employeeId: { type: Number, required: true },
  role: { type: String, enum: ["admin", "worker"], default: "worker" },
  isActive: { type: Boolean, required: true },
  password: { type: String, required: true },
});
module.exports = mongoose.model("Workers", WorkerSchema);
