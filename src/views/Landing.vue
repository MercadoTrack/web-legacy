<template>
  <v-content>
    <v-container>
      <div v-for="category in categoriesWithSamples" :key="category._id" class="mb-5">
        <h2 class="headline grey--text text--darken-3 font-weight-light pl-2">{{ category.name }}</h2>
        <v-layout row class="my-2">
          <v-flex xs3 v-for="article in category.samples" :key="article.id" class="pa-2">
            <v-card hover>
              <router-link :to="`/article/${article.id}`">
                <v-img :src="getArticleImg(article)" contain height="200px"></v-img>
              </router-link>
            </v-card>
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import http from '../http'

export default {
  data: () => ({
    categoriesWithSamples: []
  }),
  computed: {
    ...mapGetters({
      mainCategories: 'meta/mainCategories',
    }),
  },
  methods: {
    getArticleImg (article) {
      const fallback = 'https://http2.mlstatic.com/resources/frontend/statics/img-not-available/1.0.0/V.jpg'
      return article.images[0] || fallback
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
