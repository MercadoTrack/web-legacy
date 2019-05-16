<template>
  <v-img :src="imageUrl" contain aspect-ratio="1.3" :lazy-src="lazyImageUrl">
    <v-container class="pa-3" fill-height fluid>
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
    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
      <v-progress-circular indeterminate color="grey lighten-1"></v-progress-circular>
    </v-layout>
  </v-img>
</template>

<script>
export default {
  name: 'article-card-image',
  props: ['article', 'hover'],
  data: () => ({
    favorite: false,
  }),
  computed: {
    imageUrl () {
      const fallback = 'https://http2.mlstatic.com/resources/frontend/statics/img-not-available/1.0.0/V.jpg'
      return this.article.images[0] || fallback
    },
    lazyImageUrl () {
      return this.imageUrl.replace('-O.jpg', '-I.jpg')
    }
  },
  methods: {
    share (event) {
      event.stopPropagation()
      this.$store.commit('share/setArticle', this.article)
    },
    toggleFavorite (event) {
      event.stopPropagation()
      this.favorite = !this.favorite
    }
  }
}
</script>
