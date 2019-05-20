<template>
  <v-content>
    <v-container>
      <h2 v-if="category" class="headline grey--text text--darken-3 font-weight-light ml-3">
        {{ category.name }}
      </h2>
      <v-layout wrap>
        <template v-if="page">
          <v-flex xs12>
            <SearchFiltersBar />
          </v-flex>
          <v-flex xs12>
            <v-layout wrap>
              <v-flex xs6 md4 xl3 v-for="article in page" :key="article.id" :class="$vuetify.breakpoint.xs ? 'pa-1' : 'pa-3'">
                <ArticleCard :article="article"/>
              </v-flex>
            </v-layout>
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
import { SearchFiltersBar } from '../components/SearchFiltersBar'

export default {
  name: 'search',
  components: { ArticleCard, ArticleShareDialog, SearchFiltersBar },
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
      const query = { ...this.$route.query, page }
      console.log(query)
      this.$router.push({ name: 'search', query })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.paginate(to.query)
    next()
  },
  mounted () {
    if (this.$route.query.page) {
      this.pageNumber = Number(this.$route.query.page)
    }
    this.paginate(this.$route.query)
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
