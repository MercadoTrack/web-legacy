<template>
  <v-container>
    <v-layout>
      <v-flex mb-3 pa-2 xs12 sm6 md4 xl3>
        <v-text-field solo hide-details label="Buscar" append-icon="search" clearable @click:append="search"></v-text-field>
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
    articles: null,
    searching: false,
    page: 1,
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
      this.paginate()
    },
    paginate (pageNumber = 1) {
      if (this.searching) return
      this.searching = true
      this.articles = null
      axios.get(`https://api.mercadotrack.com/articles`, {
        params: { limit, skip: (pageNumber - 1) * limit }
      }).then(({ data }) => {
        this.searching = false
        this.articles = data.page
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
