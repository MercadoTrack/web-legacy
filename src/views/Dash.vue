<template>
  <v-container>
    <v-layout mt-3 mb-3 px-2 wrap>
      <v-flex xs12 sm6 md4 xl3>
        <v-text-field solo hide-details v-model="searchText" label="Buscar" @click:append="search" clearable append-icon="search"></v-text-field>
      </v-flex>
      <v-flex xs12 v-if="totalArticles">
        <h3 class="subheading text-xs-right font-weight-light grey--text lighten-1">Mostrando {{ totalArticles }} articulos</h3>
      </v-flex>
    </v-layout>
    <v-divider class="mb-3"></v-divider>
    <v-layout wrap>
      <template v-if="articles">
        <v-flex xs12 sm6 md4 xl3 pa-2 v-for="article in articles" :key="article.id">
          <ArticleCard :article="article" />
        </v-flex>
      </template>
      <template v-else-if="searching">
        <v-flex xs12 d-flex mb-3 class="overflow-hidden">
          <v-progress-circular color="primary" indeterminate height="2"></v-progress-circular>
        </v-flex>
      </template>
      <v-flex xs12 mt-2>
        <v-layout justify-center>
          <v-pagination :length="totalPages" :total-visible="paginationTotalVisible" v-model="page" :disabled="searching" @input="paginate"></v-pagination>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import axios from 'axios'
import ArticleCard from '../components/ArticleCard.vue'

const limit = 30

export default {
  name: 'dash',
  components: { ArticleCard },
  data: () => ({
    searchText: '',
    articles: null,
    searching: false,
    page: 1,
    totalArticles: 0,
    totalPages: 0
  }),
  computed: {
    paginationTotalVisible () {
      return this.$vuetify.breakpoint.xs ? 4 : 6
    }
  },
  methods: {
    search () {
      this.page = 1
      this.totalPages = 0
      this.totalArticles = 0
      // add this.searchText as a param when the API is working consistently for search pagination
      this.paginate(this.page)
    },
    paginate (pageNumber = 1, search) {
      if (this.searching) return
      this.searching = true
      this.articles = null
      axios.get(`https://api.mercadotrack.com/articles`, {
        params: {
          search,
          limit,
          skip: (pageNumber - 1) * limit
        }
      }).then(({ data }) => {
        this.searching = false
        this.articles = data.page
        this.totalArticles = data.total
        this.totalPages = ~~(data.total / limit)
      })
    }
  },
  mounted () {
    this.search()
  }
}
</script>

<style>
@media only screen and (min-width: 1904px) {
  .container {
    max-width: 1500px;
  }
}
</style>
