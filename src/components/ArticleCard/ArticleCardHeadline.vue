<template>
  <h4 class="headline mb-0">
    <span :class="{ 'mr-auto': !fluctuation }">
      ${{ price }}
    </span>
    <span class="subheading grey--text strike-through ml-1" v-if="fluctuation">
      ${{ previousPrice }}
    </span>
    <span v-if="fluctuation" class="body-1 ml-auto mr-2" :style="{ color: fluctuationColor }">
      <v-icon v-if="fluctuation > 0" :color="fluctuationColor" small>arrow_upward</v-icon>
      <v-icon v-if="fluctuation < 0" :color="fluctuationColor" small>arrow_downward</v-icon>
      <span>{{ Math.abs(fluctuation) }}%</span>
    </span>
  </h4>
</template>

<script>
export default {
  name: 'article-card-headline',
  props: ['article'],
  computed: {
    price () {
      return this.article.history[this.article.history.length - 1].price
    },
    previousPrice () {
      let previousSnapshot = this.article.history[this.article.history.length - 2]
      return previousSnapshot && previousSnapshot.price
    },
    fluctuation () {
      return 100 - Math.round(this.previousPrice * 100 / this.price)
    },
    fluctuationColor () {
      return this.fluctuation > 0 ? 'red' : 'green'
    },
  }
}
</script>

<style lang="scss" scoped>
.headline {
  display: flex;
  justify-content: flex-end;
}
</style>
