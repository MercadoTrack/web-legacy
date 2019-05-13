<template>
  <v-content>
    <v-container>
      <h2 v-if="category" class="headline grey--text text--darken-3 font-weight-light ml-3">
        {{ category.name }}
      </h2>
      <v-layout wrap>
        <template v-if="page">
          <v-flex xs12 sm6 md4 xl3 pa-3 v-for="article in page" :key="article.id">
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
            <v-pagination :length="truncatedTotalPages" :total-visible="paginationTotalVisible" v-model="pageNumber" :disabled="searching" @input="changePage"></v-pagination>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <ArticleShareDialog />
  </v-content>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { ArticleCard } from '../components/ArticleCard'
import ArticleShareDialog from '../components/ArticleShareDialog'

export default {
  name: 'search',
  components: { ArticleCard, ArticleShareDialog },
  data: () => ({
    pageNumber: 1,
  }),
  computed: {
    ...mapGetters({
      truncatedTotalPages: 'search/truncatedTotalPages',
      searching: 'search/loading',
      searchResult: 'search/result',
      categories: 'meta/categories',
    }),
    page () {
      return this.searchResult && this.searchResult.page
    },
    paginationTotalVisible () {
      return this.$vuetify.breakpoint.xs ? 4 : 7
    },
    category () {
      if (!this.$route.query.category) return
      return this.categories.find(category => category._id === this.$route.query.category)
    }
  },
  methods: {
    ...mapMutations({
      reset: 'search/reset',
    }),
    ...mapActions({
      paginate: 'search/paginate',
    }),
    changePage (page) {
      const searchTerm = this.$route.query.q
      this.paginate({ page, searchTerm })
    }
  },
  beforeRouteUpdate (to, from, next) {
    // for when search is resetted from the toolbar
    this.pageNumber = to.query.page || 1
    next()
  },
  mounted () {
    const searchTerm = this.$route.query.q
    this.pageNumber = Number(this.$route.query.page) || 1
    this.paginate({ searchTerm, page: this.pageNumber })
  },
  destroyed () {
    this.reset()
  }
}
</script>

<style scoped lang="scss">
.total-articles {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.inline {
  display: inline;
}
</style>
