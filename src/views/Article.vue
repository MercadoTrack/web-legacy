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
            <h2 class="display-1">{{ article.title }}</h2>
            <ArticleInfo :article="article" :mlArticle="mlArticle" :mlSeller="mlSeller" />
          </v-flex>

          <v-flex xs12>
            <v-divider></v-divider>
          </v-flex>

          <v-flex xs12 class="pa-4">
              <h2 class="headline pointer d-inline-block" @click="expandAttributes = !expandAttributes">
                <span>Características</span>
                <v-icon color="grey darken-4" v-if="expandAttributes">keyboard_arrow_up</v-icon>
                <v-icon color="grey darken-4" v-else>keyboard_arrow_down</v-icon>
              </h2>
              <v-expand-transition>
                <div v-show="expandAttributes">
                  <ArticleAttributes :attributes="mlArticle.attributes" />
                </div>
              </v-expand-transition>
          </v-flex>

          <v-flex xs12>
            <v-divider></v-divider>
          </v-flex>

          <v-flex xs12 md8 pa-4 class="border-r">
            <Chart :history="article.history" />
          </v-flex>

          <v-flex xs12 md4 pa-4>
            <h2 class="headline history">
              <span class="mr-1">Historial de precios</span>
              <span class="body-1 font-weight-light grey--text">({{ article.history.length - 1 }})</span>
            </h2>
            <ArticlePriceHistory :article="article" :mlArticle="mlArticle" />
          </v-flex>

        </v-layout>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import api from '../api'
import Chart from '../components/Chart'
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
    expandAttributes: false,
  }),
  methods: {
    async fetch () {
      this.loading = true
      const id = this.$route.params.id
      const promises = [ api.getArticle(id), api.getMlArticle(id) ]
      try {
        const [ mtRes, mlRes ] = await Promise.all(promises)
        this.article = mtRes.data
        this.mlArticle = mlRes.data
        const sellerRes = await api.getMlSeller(this.article.seller_id)
        this.mlSeller = sellerRes.data
        this.loading = false
      } catch (err) {
        console.log(err)
        this.$store.commit('snackbar/articleNotFound')
        this.$router.push('/')
      }
    }
  },
  watch: {
    '$route.params': {
      immediate: true, // acts like mounted
      handler () {
        this.fetch()
      }
    }
  }
}
</script>

<style scoped>
.border-r {
  border-right: 1px solid rgba(0,0,0,.12);
}

.border-l {
  border-left: 1px solid rgba(0,0,0,.12);
}

.history {
  display: flex;
  align-items: center;
}

</style>
