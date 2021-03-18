import http from "../http-common";

class DeviceDataService {
  getAll() {
    return http.get("/devices");
  }

  get(id) {
    return http.get(`/devices/${id}`);
  }

  create(data) {
    return http.post("/devices", data);
  }

  update(id, data) {
    return http.put(`/devices/${id}`, data);
  }

  delete(id) {
    return http.delete(`/devices/${id}`);
  }

  deleteAll() {
    return http.delete(`/devices`);
  }

  findByDeviceName(deviceName) {
    return http.get(`/devices?deviceName=${deviceName}`);
  }
}

export default new DeviceDataService();