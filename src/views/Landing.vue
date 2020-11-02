<template>
  <v-content>
    <v-container class="mt-1 mb-1">
      <v-card :class="$vuetify.breakpoint.smAndUp ? 'pa-4' : 'py-4 px-0'">
        <v-layout row wrap>
          <v-flex
            class="pa-4"
            xs6
            md12
            v-for="category in mainCategories"
            :key="category._id"
          >
            <template v-if="$vuetify.breakpoint.smAndDown">
              <router-link
                :to="getCategoryLink(category)"
                class="mobile-wrapper px-3 text-xs-center"
              >
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-icon style="font-size: 7rem" color="primary">{{
                      getCategoryIcon(category)
                    }}</v-icon>
                  </v-flex>
                  <v-flex xs12>
                    <h3 class="subheading">{{ category.name }}</h3>
                  </v-flex>
                </v-layout>
              </router-link>
            </template>
            <div v-else class="mb-2">
              <h2 class="headline font-weight-light ml-2">
                <v-icon style="font-size: 2rem" color="primary">{{
                  getCategoryIcon(category)
                }}</v-icon>
                <span class="ml-3">{{ category.name }} </span>
                <router-link
                  :to="getCategoryLink(category)"
                  class="ml-2 subheading primary--text"
                >
                  Ver todo
                </router-link>
              </h2>
              <v-layout row class="my-2">
                <v-flex
                  xs3
                  v-for="article in category.samples"
                  :key="article.id"
                  class="pa-2"
                >
                  <LandingArticleCard :article="article" />
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import LandingArticleCard from '../components/LandingArticleCard'
import { CategoriesHelper } from '../utils'

export default {
  data: () => ({
    icons: {
      computacion: 'computer',
      celulares: 'smartphone',
      camaras: 'camera_alt',
      belleza: 'spa',
      electrodomesticos: 'kitchen',
      electronica: 'devices_other',
      consolas: 'videogame_asset',
      salud: 'local_hospital',
    },
  }),
  components: {
    LandingArticleCard,
  },
  computed: {
    ...mapGetters({
      mainCategories: 'meta/mainCategories',
    }),
  },
  methods: {
    getCategoryIcon(category) {
      const categoryKey = CategoriesHelper.getCategoryKeyName(category.name)
      return this.icons[categoryKey]
    },
    getCategoryLink(category) {
      const categoryKeyName = CategoriesHelper.getCategoryKeyName(category.name)
      return `/${categoryKeyName}`
    },
  },
}
</script>

<style lang="scss" scoped>
.mobile-wrapper {
  display: flex;
  h3 {
    display: inline-flex;
    align-items: center;
  }
}
a {
  color: inherit;
  &:hover {
    color: var(--v-primary-base) !important;
    .v-icon {
      color: var(--v-primary-base) !important;
    }
  }
}
</style>
