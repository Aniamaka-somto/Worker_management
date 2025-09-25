require("dotenv").config();
const express = require("express");
const workerRoutes = require("./routes/worker-routes");
const connectMongodb = require("./db/db");

const app = express();

connectMongodb();

// middleware
app.use(express.json());

//routes here
app.use("/api/workers", workerRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
