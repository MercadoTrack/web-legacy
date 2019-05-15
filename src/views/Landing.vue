<template>
  <Intro v-if="showIntro" :dismiss="dismissIntro"/>
  <v-content v-else>
    <v-container class="mt-4">
      <v-layout v-if="loading" row>
        <v-flex xs12 d-flex mb-3 class="overflow-hidden">
          <v-progress-circular color="primary" indeterminate height="2"></v-progress-circular>
        </v-flex>
      </v-layout>
      <div v-else v-for="category in categoriesWithSamples" :key="category._id" class="mb-5">
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
      </div>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Intro from './Intro'
import http from '../http'
import LandingArticleCard from '../components/LandingArticleCard'
import { CategoriesHelper } from '../utils'

export default {
  data: () => ({
    loading: true,
    categoriesWithSamples: []
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
    getCategoryLink (category) {
      const categoryKeyName = CategoriesHelper.getCategoryKeyName(category.name)
      return `/${categoryKeyName}`
    },
    populateCategoriesWithSamples (mainCategories) {
      this.loading = true
      const promises = mainCategories.map((category) => {
        // TODO: this should be in vuex somewhere better done
        return http.get(`/articles?limit=4&skip=0&category=${category._id}&pretty=true`)
          .then(res => {
            this.categoriesWithSamples.push({
              ...category,
              samples: res.data.page
            })
          })
      })
      Promise.all(promises).then(() => {
        this.loading = false
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
