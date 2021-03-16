const { kStringMaxLength } = require("buffer");

module.exports = mongoose => {
    const Devices = mongoose.model(
      "tutorial",
      mongoose.Schema(
        {
          deviceName: String,
          lastSync: Date,
          noOfFaults: Integer
        },
        { timestamps: true }
      )
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
    const Devices = mongoose.model("devices", schema);
    return Devices;
  };