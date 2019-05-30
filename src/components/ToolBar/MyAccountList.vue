<template>
  <div>
    <v-list>
      <v-list-tile avatar>
        <v-list-tile-avatar>
          <img :src="user.picture" :alt="user.given_name">
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>{{ user.name }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ user.email }}</v-list-tile-sub-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon @click="logout()">
            <v-icon>power_settings_new</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-list>
      <v-list-tile disabled active-class="selected">
        <v-list-tile-action>
          <v-icon :style="{ color: 'rgba(0,0,0,.38)' }">notifications</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="subheading text-capitalize">Notificaciones</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/favoritos" active-class="selected">
        <v-list-tile-action>
          <v-icon>favorite</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="subheading text-capitalize">Favoritos</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { logout } from '../../utils/auth'

export default {
  name: 'MyAccountList',
  props: ['user'],
  methods: {
    logout,
  }
}
</script>
