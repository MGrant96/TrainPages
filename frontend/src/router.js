import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/devices",
      name: "devices",
      component: () => import("./components/DevicesList")
    },
    {
      path: "/devices/:id",
      name: "device-details",
      component: () => import("./components/Device")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddDevice")
    },
    {
      path: "/alerts",
      name: "alerts",
      component: () => import("./components/AlertsList")
    },
    
  ]
});