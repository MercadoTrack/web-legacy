<template>
  <v-menu offset-y content-class="dropdown-menu" transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn flat v-on="on" color="grey darken-3" class="px-1 font-weight-light text-capitalize">
        Categorias
      </v-btn>
    </template>
    <v-list>
      <v-list-tile v-for="category in mainCategories" :key="category._id" :to="getCategoryLink(category)">
        <v-list-tile-avatar>
          <v-icon>{{ getCategoryIcon(category) }}</v-icon>
        </v-list-tile-avatar>
        <v-list-tile-content class="body-1 font-weight-light">
          <v-list-tile-title>{{ category.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => ({
    tree: [],
    icons: {
      computacion: 'computer',
      celulares: 'smartphone',
      camaras: 'camera_alt',
      electrodomesticos: 'kitchen',
      electronica: 'devices_other',
      consolas: 'videogame_asset',
    },
  }),
  computed: {
    ...mapGetters({
      mainCategories: 'meta/mainCategories',
    }),
  },
  methods: {
    getCategoryIcon (category) {
      return this.icons[this.getCategoryKey(category)]
    },
    getCategoryLink (category) {
      const categoryKey = this.getCategoryKey(category)
      return `/busqueda/${categoryKey}` // TODO: check the best url for category links
    },
    getCategoryKey ({ name }) { // TODO: take to utils or something
      return name
        .replace(/[, ].*/, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
    }
  },
}
</script>
