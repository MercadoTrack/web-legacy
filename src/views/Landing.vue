<template>
  <v-content>
    <v-container>
      <div>
        <h5 class="display-1 font-weight-light inline mr-4">Computación</h5>
        <a class="headline inline font-weight-light">ver más</a>
      </div>
      <v-layout wrap>
        <template v-if="articles">
          <v-flex xs12 sm6 md4 xl3 pa-3 v-for="article in articles" :key="article.id">
            <ArticleCard :article="article"/>
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
    <ArticleShareDialog />
  </v-content>
</template>
<script>
import http from '../http.js'
import { ArticleCard } from '../components/ArticleCard'
import ArticleShareDialog from '../components/ArticleShareDialog'

const limit = 30

export default {
  name: 'landing',
  components: { ArticleCard, ArticleShareDialog },
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

<style scoped lang="scss">
.container {
  max-width: 350px;
  @media only screen and (min-width: 600px) and (max-width: 960px) {
    max-width: 600px;
  }
  @media only screen and (min-width: 960px) and (max-width: 1900px) {
    max-width: 900px;
  }
  @media only screen and (min-width: 1900px) {
    max-width: 1500px;
  }
}
.total-articles {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.inline {
  display: inline;
}
</style>
