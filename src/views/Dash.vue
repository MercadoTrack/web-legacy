<template>
  <div>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-list dense>
        <v-list-tile @click="1">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>MercadoTrack</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-flex xs12 sm6 md3>
        <v-text-field solo label="Buscar" append-outer-icon="search" clearable @click:append-outer="search"></v-text-field>
      </v-flex>
    </v-toolbar>
    <v-content>
      <div class="cards-container-wrapper">
        <v-container fluid>
          <v-layout wrap>
            <v-flex xs12 sm6 md4 xl2 pa-2 v-for="article in articles" :key="article.id">
              <ArticleCard :article="article" />
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </v-content>
  </div>
</template>
<script>
import ArticleCard from '../components/ArticleCard.vue'

export default {
  name: 'dash',
  components: { ArticleCard },
  data: () => ({
    drawer: false,
    articles: []
  }),
  methods: {
    search () {
      fetch(`https://api.mercadotrack.com/articles`)
        .then(res => res.json())
        .then(res => {
          this.articles = res.page
        })
    }
  }
}
</script>

<style lang="sass" scoped>
.cards-container-wrapper
  height: calc(100vh - 100px)
  overflow: auto
</style>
