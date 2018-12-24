<template>
  <div>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title>MercadoTrack</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <div class="cards-container-wrapper">
        <v-container>
          <v-layout>
            <v-flex mb-3 pa-2 xs12 sm6 md4 xl3>
              <v-text-field solo hide-details label="Buscar" append-icon="search" clearable @click:append="search"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <template v-if="articles">
              <v-flex xs12 sm6 md4 xl3 pa-2 v-for="article in articles" :key="article.id">
                <ArticleCard :article="article" />
              </v-flex>
            </template>
            <template v-else-if="searching">
              <v-flex xs12 d-flex class="o-hidden">
                <v-progress-circular color="primary" indeterminate height="2"></v-progress-circular>
              </v-flex>
            </template>
            <v-flex xs12 mt-2>
              <v-layout justify-center>
                <v-pagination :length="totalPages" total-visible="6" v-model="page" :disabled="searching" @input="paginate"></v-pagination>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-content>
  </div>
</template>
<script>
import axios from 'axios'
import ArticleCard from '../components/ArticleCard.vue'

const limit = 25

export default {
  name: 'dash',
  components: { ArticleCard },
  data: () => ({
    articles: null,
    searching: false,
    page: 1,
    totalPages: 0
  }),
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
  }
}
</script>

<style lang="scss" scoped>
.cards-container-wrapper {
  height: calc(100vh - 100px);
  overflow: auto;
}

.o-hidden {
  overflow: hidden;
}
</style>
