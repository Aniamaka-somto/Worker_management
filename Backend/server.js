require("dotenv").config();
const express = require("express");
const workerRoutes = require("./routes/worker-routes");
const connectMongodb = require("./db/db");
const authRoutes = require("./routes/auth-routes");

const app = express();

connectMongodb();

// middleware
app.use(express.json());

//routes here
app.use("/api/workers", workerRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
