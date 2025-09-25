const express = require("express");
const {
  getAllWorkers,
  getSingleWorker,
  updateWorker,
  deleteWorker,
  addNewWorker,
} = require("../controllers/worker-controller");

const router = express.Router();

router.get("/workers", getAllWorkers);
router.get("/workers/:id", getSingleWorker);
router.post("/add", addNewWorker);
router.put("/update/:id", updateWorker);
router.delete("/delete/:id", deleteWorker);

module.exports = router;
