<template>
  <v-card>
    <v-list>
      <v-list-group
        v-for="category in items"
        :key="category.name"
        :prepend-icon="categoryName(category.icon)"
        no-action
      >
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ category.name }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <!--<v-list-tile
          v-for="subCategory in item.subCategory"
          :key="subCategory"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ subCategory.name }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-icon>{{ subCategory.icon }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>-->
      </v-list-group>
    </v-list>
  </v-card>
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
  methods: {
    categoryName(name) {
      return this.icons[name]
    }
  },
  computed: {
    ...mapGetters({
      categories: 'meta/categories',
      mainCategories: 'meta/mainCategories',
    }),
    category () {
      return this.categories
    },
    parentCategory () {
      return this.category
    },
    items () {
      const categories = []

      this.mainCategories.forEach(mc => {
        categories.push({
          name: mc.name,
          id: mc._id,
          icon: mc.name.replace(/[, ].*/, '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(),
        })
      })
      console.log(categories)
      return categories
    },
  },
}
</script>
