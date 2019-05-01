<template>
  <div>
    <!-- drawer for tablet/mobile -->
    <v-navigation-drawer
      v-model="drawer"
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
            <v-icon color="secondary darken-1">notifications</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="subheading font-weight-light text-capitalize">Notificaciones</v-list-tile-title>
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
      <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:extension>
        <v-container class="ma-auto pa-0" style="display: flex;">
          <CategoriesDropdown />
          <v-btn flat color="grey darken-3" class="px-1 subheading font-weight-light text-capitalize">
            Ofertas
          </v-btn>
          <v-btn flat color="grey darken-3" class="px-1 subheading font-weight-light text-capitalize">
            Vendedores destacados
          </v-btn>
          <v-btn flat color="grey darken-3" class="px-1 subheading font-weight-light text-capitalize">
            Últimos agregados
          </v-btn>
          <v-spacer></v-spacer>
          <router-link to="/favorites" tag="span" class="pointer">
            <v-btn flat color="grey darken-3" class="px-1 subheading font-weight-light text-capitalize">
              Favoritos
            </v-btn>
          </router-link>
          <v-btn flat color="grey darken-3" class="px-1 subheading font-weight-light text-capitalize">
            Notificaciones
          </v-btn>
          <v-btn flat color="grey darken-3" class="px-1 subheading font-weight-light text-capitalize">
            Mi cuenta
          </v-btn>
        </v-container>
      </template>
      <v-container class="ma-auto pa-0" style="display: flex;">
        <v-toolbar-title :class="`${$vuetify.breakpoint.xs ? 'mr-3' : 'mx-4'}`">
          <router-link to="/">
            <img height="50" src="../../assets/mtrack_icon.svg" alt="Icono MercadoTrack">
          </router-link>
        </v-toolbar-title>
        <v-text-field
          class="my-1"
          append-icon="search"
          label="Buscar"
          v-model="searchText"
          @keyup.enter="search()"
          @click:append="search()"
          flat solo clearable hide-details light
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" flat color="grey darken-3" class="subheading font-weight-light text-none">
          <router-link to="/stats" tag="span" class="pointer">
            <span class="mr-2">Mira el estado de MercadoTrack en vivo</span>
          </router-link>
          <v-icon>visibility</v-icon>
        </v-btn>
        <template v-if="$vuetify.breakpoint.smAndDown">
          <v-icon color="grey darken-3">notifications</v-icon>
          <v-spacer></v-spacer>
          <v-toolbar-side-icon class="grey--text text--darken-3" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        </template>
      </v-container>
    </v-toolbar>
  </div>
</template>

<script>
import CategoriesDropdown from './CategoriesDropdown'

export default {
  components: { CategoriesDropdown },
  data: () => ({
    drawer: false,
    searchText: '',
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
