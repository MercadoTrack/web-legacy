<template>
  <v-content>
    <v-container class="mt-4">
      <div v-for="category in categoriesWithSamples" :key="category._id" class="mb-5">
        <h2 class="headline font-weight-light ml-2">
          <router-link :to="getCategoryLink(category)" class="grey--text text--darken-3 category-link">
            {{ category.name }}
          </router-link>
        </h2>
        <v-layout row class="my-2">
          <v-flex xs3 v-for="article in category.samples" :key="article.id" class="pa-2">
            <LandingArticleCard :article="article" />
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import http from '../http'
import LandingArticleCard from '../components/LandingArticleCard'
import { CategoriesHelper } from '../utils'

export default {
  data: () => ({
    categoriesWithSamples: []
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
    getCategoryLink (category) {
      const categoryKeyName = CategoriesHelper.getCategoryKeyName(category.name)
      return `/${categoryKeyName}`
    },
    populateCategoriesWithSamples (mainCategories) {
      mainCategories.forEach((category) => {
        http.get(`/articles?limit=4&skip=0&category=${category._id}&pretty=true`).then(res => {
          this.categoriesWithSamples.push({
            ...category,
            samples: res.data.page
          })
        })
      })
    }
  },
  watch: {
    mainCategories (mainCategories) {
      this.populateCategoriesWithSamples(mainCategories)
    }
  },
  mounted () {
    if (this.mainCategories) {
      this.populateCategoriesWithSamples(this.mainCategories)
    }
  }
}
</script>

<style lang="scss" scoped>
.category-link:hover {
  color: var(--v-primary-base) !important;
}
</style>
