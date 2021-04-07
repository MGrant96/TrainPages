import Vue from "vue";
import Router from "vue-router";
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: "/devices",
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