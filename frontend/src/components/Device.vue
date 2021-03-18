<template>
  <div v-if="currentDevice" class="edit-form py-3">
    <p class="headline">Edit Device</p>

    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="currentDevice.deviceName"
        :rules="[(v) => !!v || 'Device Name is required']"
        label="Device Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="currentDevice.lastSync"
        :rules="[(v) => !!v || 'Last Sync is required']"
        label="Last Sync"
        required
      ></v-text-field>

      <label><strong>Status:</strong></label>
      {{ currentDevice.reviewed ? "Reviewed" : "Pending" }}

      <v-divider class="my-5"></v-divider>

      <v-btn v-if="currentDevice.reviewed"
        @click="updateReviewed(false)"
        color="primary" small class="mr-2"
      >
        Review again
      </v-btn>

      <v-btn v-else
        @click="updateReviewed(true)"
        color="primary" small class="mr-2"
      >
        Reviewed
      </v-btn>

      <v-btn color="error" small class="mr-2" @click="deleteDevice">
        Delete
      </v-btn>

      <v-btn color="success" small @click="updateDevice">
        Update
      </v-btn>
    </v-form>

    <p class="mt-3">{{ message }}</p>
  </div>

  <div v-else>
    <p>Please click on a Device...</p>
  </div>
</template>

<script>
import DeviceDataService from "../services/DeviceDataService";
export default {
  name: "device",
  data() {
    return {
      currentDevice: null,
      message: "",
    };
  },
  methods: {
    getDevice(id) {
      DeviceDataService.get(id)
        .then((response) => {
          this.currentDevice = response.data;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateReviewed(status) {
      var data = {
        id: this.currentDevice.id,
        deviceName: this.currentDevice.deviceName,
        lastSync: this.currentDevice.lastSync,
        reviewed: status,
      };
      DeviceDataService.update(this.currentDevice.id, data)
        .then((response) => {
          this.currentDevice.reviewed = status;
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },
    updateDevice() {
      DeviceDataService.update(this.currentDevice.id, this.currentDevice)
        .then((response) => {
          console.log(response.data);
          this.message = "The device was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },
    deleteDevice() {
      DeviceDataService.delete(this.currentDevice.id)
        .then((response) => {
          console.log(response.data);
          this.$router.push({ name: "devices" });
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.getDevice(this.$route.params.id);
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>