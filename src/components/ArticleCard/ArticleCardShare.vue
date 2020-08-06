<template>
  <v-container fluid class="absolute" style="z-index: 1;">
    <v-layout column align-end>
      <span class="headline">
        <v-btn v-if="hover" fab small class="ma-0" @click="share">
          <v-icon color="primary">share</v-icon>
        </v-btn>
        <v-btn v-if="hover || isFavorite" fab small class="ma-0 ml-2" @click="toggleFavorite">
          <v-icon v-if="isFavorite" color="primary">favorite</v-icon>
          <v-icon v-else color="primary">favorite_border</v-icon>
        </v-btn>
      </span>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { login } from '../../utils/auth'
import api from '../../api'

export default {
  name: 'ArticleCardShare',
  props: ['article', 'hover'],
  data: () => ({
    isFavorite: false,
  }),
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated',
      favorites: 'auth/favorites'
    })
  },
  methods: {
    ...mapMutations({
      updateFavorites: 'auth/updateFavorites'
    }),
    share (event) {
      event.stopPropagation()
      this.$store.commit('share/setArticle', this.article)
    },
    async toggleFavorite (event) {
      event.stopPropagation()
      if (!this.isAuthenticated) {
        login(this.article.id)
      } else {
        this.isFavorite = !this.isFavorite
        const { data: favorites } = await api.toggleFavorite(this.article.id)
        this.$ga.event({
          eventCategory: 'Favorites',
          eventAction: this.isFavorite ? 'add' : 'remove',
          eventLabel: this.article.id,
        })
        this.updateFavorites(favorites)
        if (this.isFavorite) {
          this.$store.commit('snackbar/favoritesAdded')
        }
      }
    }
  },
  watch: {
    // maybe favorite boolean should be passed as a prop instead of doing this
    favorites (favorites) {
      this.isFavorite = favorites.includes(this.article.id)
    }
  },
  mounted () {
    this.isFavorite = this.favorites.includes(this.article.id)
  }
}
</script>
