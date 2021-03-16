const db = require("../models");
const Device = db.devices;

// Create and Save a new Device
exports.create = (req, res) => {
    // Validate request
    if (!req.body.deviceName) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a device
    const device = new Device({
      deviceName: req.body.deviceName,
      lastSync: req.body.lastSync,
      noOfFaults: req.body.noOfFaults,
      faultsReviewed: req.body.faultsReviewed ? req.body.faultsReviewed : false
    });
  
    // Save device in the database
    device
      .save(device)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding Device."
        });
      });
  };

// Retrieve all devices from the database.
exports.findAll = (req, res) => {
    const deviceName = req.query.deviceName;
    var condition = deviceName ? { deviceName: { $regex: new RegExp(deviceName), $options: "i" } } : {};
  
    Device.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving devices."
        });
      });
  };

// Find a single device with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Device.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Device with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Device with id=" + id });
      });
  };

// Update a device by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    Device.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Device with id=${id}. Maybe Device was not found!`
          });
        } else res.send({ message: "Device was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Device with id=" + id
        });
      });
  };

// Delete a device with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Device.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Device with id=${id}. Maybe Device was not found!`
          });
        } else {
          res.send({
            message: "Device was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Device with id=" + id
        });
      });
  };

// Delete all devices from the database.
exports.deleteAll = (req, res) => {
    Device.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Device were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Device."
        });
      });
  };

// Find all published devices
exports.findAllPublished = (req, res) => {
    Device.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Devices."
        });
      });
  };