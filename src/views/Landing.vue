<template>
  <Intro v-if="showIntro" :dismiss="dismissIntro"/>
  <v-content v-else>
    <v-container class="mt-4">
      <div v-for="category in mainCategories" :key="category._id" class="mb-5">
        <template v-if="$vuetify.breakpoint.smAndDown">
          <router-link :to="getCategoryLink(category)" class="mobile-wrapper pl-3">
            <h3 class="subheading font-weight-light">{{ category.name }}</h3>
            <v-icon class="ml-3" x-large>{{ getCategoryIcon(category) }}</v-icon>
          </router-link>
        </template>
        <template v-else>
          <h2 class="headline font-weight-light ml-2">
            {{ category.name }}
            <router-link :to="getCategoryLink(category)" class="ml-2 subheading">
              Ver todo
            </router-link>
          </h2>
          <v-layout row class="my-2">
            <v-flex xs3 v-for="article in category.samples" :key="article.id" class="pa-2">
              <LandingArticleCard :article="article" />
            </v-flex>
          </v-layout>
        </template>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Intro from './Intro'
import LandingArticleCard from '../components/LandingArticleCard'
import { CategoriesHelper } from '../utils'

export default {
  data: () => ({
    icons: {
      computacion: 'computer',
      celulares: 'smartphone',
      camaras: 'camera_alt',
      electrodomesticos: 'kitchen',
      electronica: 'devices_other',
      consolas: 'videogame_asset',
    },
  }),
  components: {
    Intro,
    LandingArticleCard,
  },
  computed: {
    ...mapGetters({
      showIntro: 'intro/show',
      mainCategories: 'meta/mainCategories',
    }),
  },
  methods: {
    ...mapMutations({
      dismissIntro: 'intro/dismiss',
    }),
    getCategoryIcon (category) {
      const categoryKey = CategoriesHelper.getCategoryKeyName(category.name)
      return this.icons[categoryKey]
    },
    getCategoryLink (category) {
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
