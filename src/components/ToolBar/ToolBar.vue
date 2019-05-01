<template>
  <div>
    <!-- drawer for tablet/mobile -->
    <v-navigation-drawer
      v-model="drawer"
      clipped disable-resize-watcher disable-route-watcher right app
    >
      <NavigationDrawerList />
    </v-navigation-drawer>

    <!-- toolbar -->
    <v-toolbar color="secondary" dark fixed app>
      <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:extension>
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
      </template>
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
      <v-btn v-if="$vuetify.breakpoint.mdAndUp" flat light>
        <router-link to="/stats" class="pointer d-flex subheading font-weight-light text-none grey--text text--darken-3">
          <v-icon>visibility</v-icon>
          <span class="ml-2">Sincronizacion en vivo</span>
        </router-link>
      </v-btn>
      <template v-else>
        <v-icon color="grey darken-3">notifications</v-icon>
        <v-spacer></v-spacer>
        <v-toolbar-side-icon class="grey--text text--darken-3" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
import CategoriesDropdown from './CategoriesDropdown'
import NavigationDrawerList from './NavigationDrawerList'

export default {
  components: {
    CategoriesDropdown,
    NavigationDrawerList,
  },
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
