<template>
  <v-content>
    <v-container>
      <v-layout wrap>
        <v-flex xs12>
          <FiltersBar />
        </v-flex>
        <v-flex xs12>
          <v-layout v-if="searching" key="empty-cards" wrap>
            <v-flex xs6 md4 xl3 :class="$vuetify.breakpoint.xs ? 'pa-1' : 'pa-3'" v-for="n in 30" :key="n">
              <EmptyArticleCard />
            </v-flex>
          </v-layout>
          <v-layout v-else key="article-cards" wrap>
            <v-flex xs6 md4 xl3 v-for="article in page" :key="article.id" :class="$vuetify.breakpoint.xs ? 'pa-1' : 'pa-3'">
              <ArticleCard :article="article"/>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12 mt-2 v-if="truncatedTotalPages > 1">
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
import { FiltersBar } from '../components/FiltersBar'
import EmptyArticleCard from '../components/EmptyArticleCard'

export default {
  name: 'search',
  components: { ArticleCard, ArticleShareDialog, FiltersBar, EmptyArticleCard },
  data: () => ({
    pageNumber: 1,
  }),
  metaInfo () {
    return {
      title: `${this.$route.query.search || 'Busqueda'} en MercadoTrack`
    }
  },
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
    },
  },
  methods: {
    ...mapMutations({
      reset: 'search/reset',
    }),
    ...mapActions({
      paginate: 'search/paginate',
    }),
    changePage (page) {
      this.$vuetify.goTo(0, { easing: 'easeInOutCubic' }) // scrolling to top
      const query = { ...this.$route.query, page }
      this.$router.push({ name: 'search', query })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.pageNumber = to.query.page || 1
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
