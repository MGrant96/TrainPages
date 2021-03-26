module.exports = mongoose => {
  var schema = mongoose.Schema(
        {
          deviceName: String,
          lastSync: Date,
          noOfAlerts: Number,
          alertsReviewed: Boolean
        },
        { timestamps: true }
    );
 
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
    const Devices = mongoose.model("devices", schema);
    return Devices;
  };