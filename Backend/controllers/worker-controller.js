const { get } = require("mongoose");
const worker = require("../models/worker");

const getAllWorkers = async (req, res) => {
  try {
    const getAllWorkers = await worker.find({});
    if (getAllWorkers) {
      res.status(200).send(getAllWorkers);
    } else {
      res.json("unable to get workers");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getSingleWorker = async (req, res) => {
  const singleWorker = req.params.id;

  const getSingleWorker = await worker.findById(singleWorker);
  try {
    if (getSingleWorker) {
      res.status(200).json({
        message: "success",
        data: getSingleWorker,
      });
    } else {
      res.status(404).json(`unable to get worker with id ${singleWorker}`);
    }
  } catch (error) {
    res.send(error, "something went wrong");
  }
};

const addNewWorker = async (req, res) => {
  try {
    const newWorker = req.body;
    const addNewWorker = await worker.create(newWorker);
    if (addNewWorker) {
      console.log("added");
      res.status(200).send({
        message: "book added succesfully",
        data: addNewWorker,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateWorker = async (req, res) => {
  try {
    const selectedWorker = req.params.id;
    const updateInfo = req.body;
    const updateWorker = await worker.findByIdAndUpdate(
      selectedWorker,
      updateInfo,
      { new: true }
    );
    if (updateWorker) {
      res.status(200).json({
        message: `worker with id ${selectedWorker} has been updated successfully`,
        data: updateWorker,
      });
    } else {
      res.json({ message: "unable to make changes" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteWorker = async (req, res) => {
  try {
    const selectedWorker = req.params.id;
    const deleteWorker = await worker.findByIdAndDelete(selectedWorker);
    if (deleteWorker) {
      res
        .status(200)
        .json({ message: `${selectedWorker} deleted successfully` });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllWorkers,
  getSingleWorker,
  updateWorker,
  deleteWorker,
  addNewWorker,
};
