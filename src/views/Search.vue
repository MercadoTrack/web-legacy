<template>
  <v-content>
    <v-container>
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
            <v-pagination :length="truncatedTotalPages" :total-visible="paginationTotalVisible" v-model="pageNumber" :disabled="searching" @input="paginate"></v-pagination>
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
    }),
    page () {
      return this.searchResult && this.searchResult.page
    },
    paginationTotalVisible () {
      return this.$vuetify.breakpoint.xs ? 4 : 7
    }
  },
  methods: {
    ...mapMutations({
      setQuery: 'search/setQuery',
      reset: 'search/reset',
    }),
    ...mapActions({
      paginate: 'search/paginate',
    }),
  },
  mounted () {
    const query = this.$route.query.q
    if (query) this.setQuery(query)
    this.pageNumber = Number(this.$route.query.page) || 1
    this.paginate(this.pageNumber)
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
