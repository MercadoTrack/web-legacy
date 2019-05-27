<template>
  <v-content>
    <v-container>
      <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>

      <v-card v-else elevation=0>
        <v-layout row wrap>

          <v-flex xs12>
            <ArticleBreadcrumb :categoryId="article.category_id" />
            <v-divider></v-divider>
          </v-flex>

          <v-flex xs12 md8 style="align-items: center; display: flex;">
            <ArticleCarousel :images="article.images" />
          </v-flex>

          <v-flex xs12 md4 pa-4 class="border-l">
            <span class="display-1">{{ article.title }}</span>
            <ArticleInfo :article="article" :mlArticle="mlArticle" :mlSeller="mlSeller" />
          </v-flex>

          <v-flex xs12>
            <v-divider></v-divider>
          </v-flex>

          <v-flex xs12 class="pa-4">
            <span class="headline">Características</span>
            <ArticleAttributes :attributes="mlArticle.attributes" />
          </v-flex>

          <v-flex xs12>
            <v-divider></v-divider>
          </v-flex>

          <v-flex xs12 md8 pa-4 class="border-r">
            <Chart :history="article.history" />
          </v-flex>

          <v-flex xs12 md4 pa-4>
            <span class="headline">Historial de precios</span>
            <ArticlePriceHistory :article="article" :mlArticle="mlArticle" />
          </v-flex>

        </v-layout>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import http from '../http.js'
import Chart from '../components/Chart'
import axios from 'axios'
import {
  ArticleCarousel,
  ArticlePriceHistory,
  ArticleInfo,
  ArticleAttributes,
  ArticleBreadcrumb
} from '../components/ArticleView'

export default {
  components: {
    Chart,
    ArticleCarousel,
    ArticlePriceHistory,
    ArticleInfo,
    ArticleAttributes,
    ArticleBreadcrumb
  },
  data: () => ({
    loading: true,
    article: null,
    mlSeller: null,
    mlArticle: null,
  }),
  async mounted () {
    const id = this.$route.params.id
    const promises = [ http.get(`articles/${id}`), http.get(`articles/ml/${id}`) ]
    try {
      const [ mtRes, mlRes ] = await Promise.all(promises)
      this.article = mtRes.data
      this.mlArticle = mlRes.data
      const sellerRes = await axios.get(`https://api.mercadolibre.com/users/${this.article.seller_id}`)
      this.mlSeller = sellerRes.data
      this.loading = false
    } catch (err) {
      console.log(err)
      this.$store.commit('snackbar/articleNotFound')
      this.$router.push('/')
    }
  },
}
</script>

<style scoped>
.border-r {
  border-right: 1px solid rgba(0,0,0,.12);
}

.border-l {
  border-left: 1px solid rgba(0,0,0,.12);
}

</style>
