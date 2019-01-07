<template>
  <v-card>
    <v-container fluid class="pa-0">
      <v-img :src="url" contain aspect-ratio="1.3" :lazy-src="lazyUrl">
        <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
          <v-progress-circular indeterminate color="grey lighten-1"></v-progress-circular>
        </v-layout>
      </v-img>
      <v-card-title class="pointer" primary-title @click="goToArticle">
        <v-flex xs12>
          <h4 class="headline mb-0">
            <span class="mr-1">${{ price }}</span>
            <span class="subheading grey--text strike-through">${{ previousPrice }}</span>
            <span v-if="discount" class="body-1 ml-auto mr-2" :style="{ color: discountColor }">
              <v-icon v-if="discount > 0" :color="discountColor" small>arrow_upward</v-icon><v-icon v-if="discount < 0" :color="discountColor" small>arrow_downward</v-icon>{{ discount }}%
            </span>
          </h4>
        </v-flex>
        <v-flex xs12>
          <p class="subheading">{{ article.title }}</p>
        </v-flex>
      </v-card-title>
      <v-card-actions>
        <div class="px-3 primary--text d-flex text-uppercase font-weight-medium">
          Historial <div class="ml-1 v-badge__badge primary d-flex">{{ article.history.length }}</div>
        </div>
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
    previousPrice () {
      let previousSnapshot = this.article.history[this.article.history.length - 2]
      return previousSnapshot && previousSnapshot.price
    },
    discount () {
      return 100 - Math.round(this.previousPrice * 100 / this.price)
    },
    discountColor () {
      return this.discount > 0 ? 'red' : 'green'
    },
    url () {
      return this.article.images[0] || ''
    },
    lazyUrl () {
      return this.url.replace('-O.jpg', '-I.jpg')
    }
  },
  methods: {
    goToArticle () {
      window.open(this.article.permalink)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-badge__badge {
  position: unset;
  display: inline-block;
}
.headline {
  display: flex;
  justify-content: flex-start;
}
</style>
