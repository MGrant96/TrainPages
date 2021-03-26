<template>
  <div class="submit-form mt-3 mx-auto">
    <p class="headline">Add Device</p>

    <div v-if="!submitted">
      <v-form ref="form" lazy-validation>
        <v-text-field
          v-model="device.deviceName"
          :rules="[(v) => !!v || 'Device name is required']"
          label="Device Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="device.lastSync"
          :rules="[(v) => !!v || 'Last Synced is required']"
          label="Last Synced in for YYYY-MM-DD"
          required
        ></v-text-field>

        <v-text-field
          v-model="device.noOfAlerts"
          :rules="[(v) => !!v || 'Number of Alerts is required']"
          label="Number of Alerts?"
          required
        ></v-text-field> 
          
        <!-- faultsReviewed: Boolean -->
        <v-switch
          color="deep-purple accent-4"
          v-model="device.alertsReviewed"
          label="Alerts Reviewed?"
        ></v-switch> 

        </v-form>

      <v-btn color="primary" class="mt-3" @click="saveDevice">Submit</v-btn>
    </div>

    <div v-else>
      <v-card class="mx-auto">
        <v-card-title>
          Submitted successfully!
        </v-card-title>

        <v-card-subtitle>
          Click the button to add new Device.
        </v-card-subtitle>

        <v-card-actions>
          <v-btn color="success" @click="newDevice">Add</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import DeviceDataService from "../services/DeviceDataService";

export default {
  name: "add-device",
  data() {
    return {
      device: {
        id: null,
        deviceName: "",
        lastSync: "",
        noOfAlerts: 0,
        alertsReviewed: false
      },
      submitted: false,
    };
  },
  methods: {
    saveDevice() {
      var data = {
        deviceName: this.device.deviceName,
        lastSync: this.device.lastSync,
        noOfAlerts: this.device.noOfAlerts,
        alertsReviewed: this.device.alertsReviewed
      };

      DeviceDataService.create(data)
        .then((response) => {
          this.device.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newDevice() {
      this.submitted = false;
      this.device = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
}
</style>