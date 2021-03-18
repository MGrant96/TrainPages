<template>
  <v-app>
    <v-app-bar app color="deep-purple accent-4"
      dark>
      <div class="d-flex align-center mr-2">
        Edge Device Manager
      </div>
      <v-spacer></v-spacer>

      <v-btn to="/devices" text>
        Device List
      </v-btn>

      <v-btn to="/add" text>
        Add a Device
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
