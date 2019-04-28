<template>
  <div>
    <!-- drawer for tablet/mobile -->
    <v-navigation-drawer
      v-model="drawer"
      width="250"
      clipped disable-resize-watcher disable-route-watcher right app
    >
      <v-list>
        <v-list-tile @click="() => {}">
          <v-list-tile-action>
            <v-icon color="orange darken-2">whatshot</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading font-weight-light text-capitalize">Ofertas</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="() => {}">
          <v-list-tile-action>
            <v-icon color="cyan darken-4">verified_user</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading font-weight-light text-capitalize">Vendedores destacados</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="() => {}">
          <v-list-tile-action>
            <v-icon color="primary">sync</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading font-weight-light text-capitalize">Sincronizacion en vivo</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="() => {}">
          <v-list-tile-action>
            <v-icon color="red darken-2">favorite</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading font-weight-light text-capitalize">Favoritos</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="() => {}">
          <v-list-tile-action>
            <v-icon color="indigo darken-2">person</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading font-weight-light text-capitalize">Mi cuenta</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- toolbar -->
    <v-toolbar color="secondary" dark fixed app>
      <v-spacer v-if="$vuetify.breakpoint.mdAndUp"></v-spacer>
      <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:extension>
        <v-spacer></v-spacer>
        <v-btn flat color="grey darken-3" class="subheading font-weight-light text-capitalize">
          <!-- TODO hacer dropdown -->
          Categorias
        </v-btn>
        <v-btn flat color="grey darken-3" class="subheading font-weight-light text-capitalize">
          Ofertas
        </v-btn>
        <v-btn flat color="grey darken-3" class="subheading font-weight-light text-capitalize">
          Vendedores destacados
        </v-btn>
        <v-btn flat color="grey darken-3" class="subheading font-weight-light text-capitalize">
          Sincronizacion en vivo
        </v-btn>
        <v-btn flat color="grey darken-3" class="subheading font-weight-light text-capitalize">
          Favoritos
        </v-btn>
        <v-spacer></v-spacer>
      </template>
      <v-toolbar-title :class="`${$vuetify.breakpoint.xs ? 'mr-3' : 'mr-4 ml-4'}`">
        <router-link to="/">
          <img height="50" src="../assets/mtrack_icon.svg" alt="Icono MercadoTrack">
        </router-link>
      </v-toolbar-title>
      <v-text-field
        append-icon="search"
        label="Buscar"
        v-model="searchText"
        @keyup.enter="search()"
        @click:append="search()"
        flat solo clearable hide-details light
      ></v-text-field>
      <v-spacer></v-spacer>
      <template v-if="$vuetify.breakpoint.smAndDown">
        <v-icon color="grey darken-3">notifications</v-icon>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="grey--text text--darken-3" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </template>
      <template v-else>
        <div class="mr-5">
          <v-btn flat color="grey darken-3" class="ml-3 subheading font-weight-light text-capitalize">
            Notificaciones
            <v-icon color="grey darken-3">notifications</v-icon>
          </v-btn>
          <v-btn flat color="grey darken-3" class="ml-3 subheading font-weight-light text-capitalize">
            Mi cuenta
            <v-icon color="grey darken-3">person</v-icon>
          </v-btn>
        </div>
        <v-spacer></v-spacer>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    searchText: ''
  }),
  methods: {
    async search () {
      // should trigger an action and connect with Search component
      if (!this.searchText) this.$router.push('/')
      else this.$router.push(`/busqueda?titulo=${this.searchText}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-text-field {
  max-width: 50%; /* TODO: hacer algo con v-spacer o flex */
}
</style>
