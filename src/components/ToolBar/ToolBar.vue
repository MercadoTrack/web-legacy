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
    <v-toolbar color="secondary" dark fixed app height="56" extension-height="48">
      <template v-if="$vuetify.breakpoint.mdAndUp" v-slot:extension>
        <v-container class="py-0 ma-auto toolbar-container">
          <CategoriesDropdown />
          <v-btn flat disabled light color="grey darken-3" class="px-1 font-weight-light text-capitalize">
            Ofertas
          </v-btn>
          <v-btn flat disabled light color="grey darken-3" class="px-1 font-weight-light text-capitalize">
            Vendedores destacados
          </v-btn>
          <v-btn flat disabled light color="grey darken-3" class="px-1 font-weight-light text-capitalize">
            Últimos agregados
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn flat color="grey darken-3">
            <router-link to="/favorites" class="pointer d-flex font-weight-light text-none grey--text text--darken-3">
              Favoritos
            </router-link>
          </v-btn>
          <v-btn flat disabled light color="grey darken-3" class="px-1 font-weight-light text-capitalize">
            Notificaciones
          </v-btn>
          <v-btn flat disabled light color="grey darken-3" class="px-1 font-weight-light text-capitalize">
            Mi cuenta
          </v-btn>
        </v-container>
      </template>
      <v-container class="py-0 ma-auto toolbar-container">
        <v-toolbar-title :class="`${$vuetify.breakpoint.smAndDown ? 'mr-3' : 'ml-3 mr-4'}`">
          <router-link to="/" class="d-flex">
            <img height="50" src="../../assets/mtrack_icon.svg" alt="Icono MercadoTrack">
          </router-link>
        </v-toolbar-title>
        <v-text-field
          height="40"
          append-icon="search"
          label="Buscar"
          v-model="query"
          @keyup.enter="search()"
          @click:append="search()"
          flat solo clearable hide-details light
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn v-if="$vuetify.breakpoint.mdAndUp" flat light>
          <router-link to="/stats" class="pointer d-flex font-weight-light text-none grey--text text--darken-3">
            <v-icon>visibility</v-icon>
            <span class="ml-2">Sincronizacion en vivo</span>
          </router-link>
        </v-btn>
        <template v-else>
          <v-btn flat disabled light fab small>
            <v-icon medium color="grey darken-3">notifications</v-icon>
          </v-btn>
          <v-toolbar-side-icon class="grey--text text--darken-3" @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        </template>
      </v-container>
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
    query: '',
  }),
  methods: {
    search () {
      this.$store.dispatch('search/global', this.query)
    }
  },
  mounted () {
    this.query = this.$route.query.q || ''
  }
}
</script>

<style lang="scss" scoped>
.v-text-field {
  max-width: 40%; /* TODO: hacer algo con v-spacer o flex */
}

.toolbar-container {
  // fixed width container inside toolbar - https://github.com/vuetifyjs/vuetify/issues/5085
  display: flex;
  align-items: center;
  flex-grow: initial;
}
</style>
