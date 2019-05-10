<template>
  <v-content>
    <v-container>
      <div v-for="category in categoriesWithSamples" :key="category._id" class="mb-5">
        <h2 class="display-1 grey--text text--darken-3 font-weight-light">{{ category.name }}</h2>
        <v-layout row wrap class="my-2">
          <v-flex v-for="article in category.samples" :key="article.id" xs3 class="pa-2">
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
        http.get(`/articles?limit=8&skip=0&category=${category._id}&pretty=true`).then(res => {
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
