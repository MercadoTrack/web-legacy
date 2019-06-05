<template>
  <v-container fluid class="absolute" style="z-index: 1;">
    <v-layout column align-end>
      <span v-if="hover" class="headline">
        <v-btn fab small class="ma-0" @click="share">
          <v-icon color="primary">share</v-icon>
        </v-btn>
        <v-btn fab small class="ma-0 ml-2" @click="toggleFavorite">
          <v-icon v-if="favorite" color="primary">favorite</v-icon>
          <v-icon v-else color="primary">favorite_border</v-icon>
        </v-btn>
      </span>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { toggleFavorite } from '../../utils/auth'

export default {
  name: 'ArticleCardShare',
  props: ['article', 'hover'],
  data: () => ({
    favorite: false,
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    share (event) {
      event.stopPropagation()
      this.$store.commit('share/setArticle', this.article)
    },
    toggleFavorite (event) {
      event.stopPropagation()
      this.favorite = !this.favorite
      toggleFavorite(this.article.id)
    }
  },
  mounted () {
    if (!this.user) return
    this.favorite = this.user.user_metadata.favorites && this.user.user_metadata.favorites.includes(this.article.id)
  }
}
</script>
