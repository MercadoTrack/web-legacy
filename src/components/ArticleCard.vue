<template>
  <v-card>
    <v-container fluid class="pa-0">
      <v-img :src="url" contain aspect-ratio="1.3" :lazy-src="lazyUrl">
        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate color="grey lighten-1"></v-progress-circular>
        </v-layout>
      </v-img>
      <v-card-title primary-title>
        <v-flex xs12>
          <h4 class="title mb-0">{{ article.title }}</h4>
        </v-flex>
        <v-flex xs12>
          <div class="">$ {{ price }}</div>
        </v-flex>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="primary">
          History <div class="ml-1 v-badge__badge primary d-flex">{{ article.history.length }}</div>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat color="primary"><v-icon>share</v-icon></v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'article-card',
  props: [ 'article' ],
  computed: {
    price () {
      return this.article.history[this.article.history.length - 1].price
    },
    url () {
      return this.article.images[0] || ''
    },
    lazyUrl () {
      return this.url.replace('-O.jpg', '-I.jpg')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  min-height: 60px;
}
.v-badge__badge {
  position: unset;
  display: inline-block;
}
</style>
