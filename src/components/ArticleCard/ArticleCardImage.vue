<template>
  <v-img :src="imageUrl" contain aspect-ratio="1.3" :lazy-src="lazyImageUrl">
    <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
      <v-progress-circular indeterminate color="grey lighten-1"></v-progress-circular>
    </v-layout>
  </v-img>
</template>

<script>
export default {
  name: 'ArticleCardImage',
  props: ['article'],
  computed: {
    imageUrl () {
      const fallback = 'https://http2.mlstatic.com/resources/frontend/statics/img-not-available/1.0.0/V.jpg'
      return this.article.images[0] || fallback
    },
    lazyImageUrl () {
      return this.imageUrl.replace('-O.jpg', '-I.jpg')
    }
  },
}
</script>
