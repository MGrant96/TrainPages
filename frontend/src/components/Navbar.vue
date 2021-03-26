<template>
  <nav>
    <v-app-bar text app>
      <v-app-bar-nav-icon color="deep-purple accent-4" class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase grey--text">
        <span class="font-weight-light">Crazy Train</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

       <v-btn class="mx-4" text dark color="deep-purple accent-4">
        <span>Settings</span>
      </v-btn>

      <v-btn text dark color="deep-purple accent-4">
        <span>Sign Out</span>
        <!-- <v-icon right>{{ icon.logout }}</v-icon> -->
      </v-btn> 
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list>
          <v-list-item v-for="link in links" :key="link.text" router :to="link.route" color="deep-purple accent-4">
              <v-list-item-action>
                  <v-icon>{{ link.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                  <v-list-item-title>
                      {{ link.text }}
                  </v-list-item-title>
              </v-list-item-content>
          </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>

import { mdiLogout } from '@mdi/js'; 

export default {
  data() {
    return {
      drawer: false,
      links: [
          { icon: 'mdi-desktop-classic', text:'Device List', route: '/devices' },
          { icon: 'mdi-plus-circle-outline', text: 'Add Device', route: './add' },
          { icon: 'mdi-alert', text: 'Alerts', route: './alerts' }
      ],
      icons: {
        logout: mdiLogout,
      }
    }
  },
};
</script>

<style></style>
