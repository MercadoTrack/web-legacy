<template>
  <div>
    <MyAccountList v-if="isAuthenticated" :user="user" />
    <v-list-tile v-else active-class="selected">
      <v-list-tile-action>
        <v-icon color="primary">person</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title class="subheading text-capitalize" @click="login()">
          Ingresar
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>

    <v-divider></v-divider>

    <v-list class="font-weight-light">
      <v-list-tile disabled active-class="selected">
        <v-list-tile-action>
          <!-- color="orange darken-2" -->
          <v-icon color="gray">whatshot</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="subheading text-capitalize"
            >Ofertas</v-list-tile-title
          >
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile disabled active-class="selected">
        <v-list-tile-action>
          <!-- color="cyan darken-4" -->
          <v-icon color="gray">verified_user</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="subheading text-capitalize"
            >Vendedores destacados</v-list-tile-title
          >
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/stats" active-class="selected">
        <v-list-tile-action>
          <v-icon color="primary">sync</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="subheading text-capitalize"
            >Sincronizacion en vivo</v-list-tile-title
          >
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile to="/nosotros" active-class="selected">
        <v-list-tile-action>
          <v-icon color="primary">new_releases</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title class="subheading text-capitalize"
            >Quiénes somos</v-list-tile-title
          >
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MyAccountList from './MyAccountList'
import { login } from '../../utils/auth'

export default {
  components: { MyAccountList },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      isAuthenticated: 'auth/isAuthenticated',
    }),
  },
  methods: {
    login,
  },
}
</script>

<style lang="scss" scoped>
.selected .subheading {
  font-weight: 400;
}
.subheading {
  font-weight: 300;
}
</style>
