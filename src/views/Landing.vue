<template>
  <v-content>
    <v-container>
      <div v-for="category in categoriesWithSamples" :key="category._id" class="mb-5">
        <h2 class="font-weight-light">{{ category.name }}</h2>
        <v-layout row wrap class="my-2">
          <v-flex v-for="article in category.samples" :key="article.id" xs3 class="pa-2" @click="goToArticle(article)">
            <v-card hover>
              <v-img :src="getArticleImg(article)" contain height="200px"></v-img>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon>favorite</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>share</v-icon>
                </v-btn>
              </v-card-actions>
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
    goToArticle (article) {
      this.$router.push(`/article/${article.id}`)
    },
    getArticleImg (article) {
      const fallback = 'https://http2.mlstatic.com/resources/frontend/statics/img-not-available/1.0.0/V.jpg'
      return article.images[0] || fallback
    },
    populateCategoriesWithSamples (mainCategories) {
      mainCategories.forEach((category) => {
        http.get(`/articles?limit=8&skip=0&category=${category._id}`).then(res => {
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
