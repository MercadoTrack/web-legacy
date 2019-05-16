<template>
  <h4 class="headline mb-0">
    <span :class="{ 'mr-auto': !fluctuation }">
      {{ price | priceFilter }}
    </span>
    <span class="subheading grey--text strike-through ml-1" v-if="fluctuation">
      {{ previousPrice | priceFilter }}
    </span>
    <span v-if="fluctuation" class="body-1 ml-auto" :style="{ color: fluctuationColor }">
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
  filters: {
    priceFilter: (num) => new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num.toFixed(0)),
  },
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
@media screen and (max-width: 600px) {
  .headline {
    font-size: 1.2rem !important;
  }
  .subheading {
    display: none;
  }
  .body-1 {
    font-size: 0.8rem !important;
  }
  .v-icon {
    font-size: 1rem !important;
  }
}
</style>
