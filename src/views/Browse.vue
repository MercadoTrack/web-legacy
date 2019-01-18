<template>
  <v-content>
    <v-container>
      <v-layout mt-3 mb-3 px-2 wrap>
        <v-flex xs6 md4 xl3>
          <v-text-field solo
            hide-details
            v-model="searchText"
            label="Buscar"
            @click:append="search"
            @keyup.enter="search"
            :clear-icon-cb="clear"
            clearable
            append-icon="search"
          ></v-text-field>
        </v-flex>
        <v-flex xs6 md8 xl9 class="total-articles" v-if="totalArticles">
          <h3 class="subheading text-xs-right font-weight-light grey--text lighten-1">{{ totalArticles }} articulos encontrados</h3>
        </v-flex>
      </v-layout>
      <v-divider class="mb-3"></v-divider>
      <v-layout wrap>
        <template v-if="articles">
          <v-flex xs12 sm6 md4 xl3 pa-3 v-for="article in articles" :key="article.id">
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
  </v-content>
</template>
<script>
import http from '../http.js'
import ArticleCard from '../components/ArticleCard.vue'

const limit = 30

export default {
  name: 'browse',
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
      return this.$vuetify.breakpoint.xs ? 4 : 7
    }
  },
  methods: {
    clear () {
      this.searchText = ''
      this.search()
    },
    search () {
      this.page = 1
      this.totalPages = 0
      this.totalArticles = 0
      this.paginate()
    },
    paginate (pageNumber = this.page, search = this.searchText) {
      if (this.searching) return
      this.searching = true
      this.articles = null
      http.get(`articles`, {
        params: {
          search,
          limit,
          skip: (pageNumber - 1) * limit
        }
      }).then(({ data }) => {
        if (search) this.$router.push({ query: { busqueda: search } })
        else this.$router.push({ query: {} })
        this.searching = false
        this.articles = data.page
        this.totalArticles = data.total
        const realTotalPages = ~~(data.total / limit)
        const truncatedTotalPages = this.page + 9
        this.totalPages = Math.min(truncatedTotalPages, realTotalPages)
      })
    }
  },
  mounted () {
    this.searchText = this.$route.query.busqueda
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
.total-articles {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
