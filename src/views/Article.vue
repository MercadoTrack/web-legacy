<template>
  <v-content>
    <ContributingModal :show.sync="showContributingModal" />

    <v-container>
      <v-fade-transition mode="out-in">
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
              <div>
                <h1 class="display-1 d-inline">{{ article.title }}</h1>
                <figure class="d-inline-flex ml-2 pointer" @click="toggleFavorite">
                  <v-icon v-if="isFavorite" medium color="primary">favorite</v-icon>
                  <v-icon v-else medium color="primary">favorite_border</v-icon>
                </figure>
              </div>
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
                <!-- <span class="body-1 font-weight-light grey--text">({{ article.history.length - 1 }})</span> -->
              </h2>
              <ArticlePriceHistory :article="article" :mlArticle="mlArticle" />
            </v-flex>

          </v-layout>
        </v-card>
      </v-fade-transition>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import api from '../api'
import Chart from '../components/Chart'
import { login } from '../utils/auth'
import {
  ArticleCarousel,
  ArticlePriceHistory,
  ArticleInfo,
  ArticleAttributes,
  ArticleBreadcrumb,
  ContributingModal,
} from '../components/ArticleView'

export default {
  components: {
    Chart,
    ArticleCarousel,
    ArticlePriceHistory,
    ArticleInfo,
    ArticleAttributes,
    ArticleBreadcrumb,
    ContributingModal,
  },
  data: () => ({
    isFavorite: false,
    loading: true,
    article: null,
    mlSeller: null,
    mlArticle: null,
    expandAttributes: false,
    showContributingModal: false,
  }),
  metaInfo () {
    if (!this.article) return
    const title = `${this.article.title} - ${this.$options.filters.priceFilter(this.article.price)}`
    return {
      title: `${title} en MercadoTrack`,
    }
  },
  computed: {
    ...mapGetters({
      authenticating: 'auth/authenticating',
      isAuthenticated: 'auth/isAuthenticated',
      favorites: 'auth/favorites'
    })
  },
  methods: {
    ...mapMutations({
      updateFavorites: 'auth/updateFavorites'
    }),
    async fetch () {
      const id = this.$route.params.id
      const promises = [ api.getOrFollowArticle(id), api.getMlArticle(id) ]
      try {
        const [ mtRes, mlRes ] = await Promise.all(promises)
        this.article = mtRes.data
        this.mlArticle = mlRes.data
        this.showContributingModal = Boolean(mtRes.justFollowed)
        const sellerRes = await api.getMlSeller(this.article.seller_id)
        this.mlSeller = sellerRes.data
        this.loading = false
      } catch (err) {
        if (err.response && err.response.status === 403) {
          this.showContributingModal = true // todo check for error
        } else {
          this.$store.commit('snackbar/articleNotFound')
          this.$router.push('/')
        }
      }
    },
    async toggleFavorite (event) {
      event.stopPropagation()
      if (!this.isAuthenticated) {
        login(this.article.id)
      } else {
        this.isFavorite = !this.isFavorite
        const { data: favorites } = await api.toggleFavorite(this.article.id)
        this.updateFavorites(favorites) // this should be an action probably
      }
    }
  },
  async mounted () {
    this.loading = true
    const interval = setInterval(() => { // sorry but it's late
      if (!this.authenticating) {
        clearInterval(interval)
        this.fetch()
        this.$watch('isAuthenticated', () => this.fetch())
      }
    }, 100)
  },
  watch: {
    '$route.params': {
      async handler () {
        this.loading = true
        await this.fetch()
        if (this.article) {
          this.isFavorite = this.favorites.includes(this.article.id)
        }
      }
    },
    favorites (favorites) {
      if (!this.article) return
      this.isFavorite = favorites.includes(this.article.id)
    },
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

.history {
  display: flex;
  align-items: center;
}

</style>
