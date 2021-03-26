<template>
  <v-row align="center" class="list px-3 mx-auto">
    <v-col cols="12" md="8">
      <v-text-field v-model="deviceName" label="Search by Device Name"></v-text-field>
    </v-col>

    <v-col cols="12" md="4">
      <v-btn small @click="searchDeviceName">
        Search
      </v-btn>
    </v-col>

    <v-col cols="12" sm="12">
      <v-card class="mx-auto" tile>
        <v-card-title>Devices List</v-card-title>

        <v-data-table
          :headers="headers"
          :items="devices"
          disable-pagination
          :hide-default-footer="true"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mx-2" @click="editDevice(item.id)">mdi-pencil</v-icon>
            <v-icon small class="mx-2" @click="viewDeviceAlerts(item.id)">mdi-alert</v-icon>
            <v-icon small class="mx-2" @click="deleteDevice(item.id)">mdi-delete</v-icon>
          </template>
        </v-data-table>

        <router-link to="/add" tag="v-btn">
            <v-btn small color="success" class="mx-2 my-2" @click="add">Add Device</v-btn>
        </router-link>
        <v-btn small color="error" class="mx-2 my-2" @click="removeAllDevices">
            Remove All
        </v-btn>
      
        <!-- <v-card-actions v-if="devices.length > 0">
          <v-btn small color="error" @click="removeAllDevices">
            Remove All
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import DeviceDataService from "../services/DeviceDataService";
export default {
  name: "devices-list",
  data() {
    return {
      devices: [],
      deviceName: "",
      headers: [
        { text: "Device Name", align: "start", sortable: false, value: "deviceName" },
        { text: "Last Synced", value: "lastSync", sortable: false },
        { text: "Number of Alerts", value: "noOfAlerts", sortable: false},
        { text: "Status", value: "status", sortable: false },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
  methods: {
    retrieveDevices() {
      DeviceDataService.getAll()
        .then((response) => {
          this.devices = response.data.map(this.getDisplayDevice);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveDevices();
    },

    removeAllDevices() {
      DeviceDataService.deleteAll()
        .then((response) => {
          console.log(response.data);
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    searchDeviceName() {
      DeviceDataService.findByDeviceName(this.deviceName)
        .then((response) => {
          this.devices = response.data.map(this.getDisplayDevice);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    },

    editDevice(id) {
      this.$router.push({ name: "device-details", params: { id: id } });
    },

    deleteDevice(id) {
      DeviceDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    getDisplayDevice(device) {
      return {
        id: device.id,
        deviceName: device.deviceName.length > 30 ? device.deviceName.substr(0, 30) + "..." : device.deviceName,
        lastSync: device.lastSync.length > 30 ? device.lastSync.substr(0, 30) + "..." : device.lastSync,
        noOfAlerts: device.noOfAlerts,
        status: device.alertsReviewed ? "Reviewed" : "Pending",
      };
    },
  },
  mounted() {
    this.retrieveDevices();
  },
};
</script>

<style>
.list {
  max-width: 750px;
}
</style>