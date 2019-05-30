<template>
  <v-list two-line subheader>

    <template v-if="price">
      <v-list-tile>
        <v-list-tile-content>
          <v-tooltip right max-width="25rem">
            <template slot="activator">
              <v-list-tile-sub-title class="font-weight-light">Precio</v-list-tile-sub-title>
              <v-list-tile-title>{{ price | priceFilter }}</v-list-tile-title>
              </template>
            <span>Es el precio sobre el cual se aplicó el descuento publicado</span>
          </v-tooltip>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-tooltip right max-width="25rem">
            <!-- has discount -->
            <template v-if="discount > 0" slot="activator">
              <v-list-tile-sub-title class="font-weight-light">Descuento</v-list-tile-sub-title>
              <v-list-tile-title class="discount-title green--text text--lighten-2">
                <span class="mr-1">{{ Math.abs(discount) }}%</span>
                <v-icon color="green lighten-2">mood</v-icon>
              </v-list-tile-title>
            </template>
            <!-- no discount -->
            <template v-else-if="!discount && previousPrice" slot="activator">
              <v-list-tile-sub-title class="font-weight-light">Sin descuento</v-list-tile-sub-title>
              <v-list-tile-title class="discount-title yellow--text text--darken-2">
                <v-icon color="yellow darken-2">sentiment_satisfied</v-icon>
              </v-list-tile-title>
            </template>
            <!-- price increased -->
            <template v-else-if="discount" slot="activator">
              <v-list-tile-sub-title class="font-weight-light">Aumento</v-list-tile-sub-title>
              <v-list-tile-title class="discount-title red--text text--lighten-2">
                <span class="mr-1">{{ Math.abs(discount) }}%</span>
                <v-icon color="red lighten-2">sentiment_very_dissatisfied</v-icon>
              </v-list-tile-title>
            </template>
            <span>Es el descuento del producto en base a su precio anterior</span>
          </v-tooltip>
        </v-list-tile-content>
      </v-list-tile>
    </template>

    <template v-if="original_price">
      <v-list-tile>
        <v-list-tile-content>
          <v-tooltip right max-width="25rem">
            <template slot="activator">
              <v-list-tile-sub-title class="font-weight-light">Precio publicado</v-list-tile-sub-title>
              <v-list-tile-title>{{ original_price | priceFilter }}</v-list-tile-title>
            </template>
            <span>Es el precio publicado en MercadoLibre por el vendedor.</span>
        </v-tooltip>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-tooltip right max-width="25rem">
            <template slot="activator">
              <v-list-tile-sub-title class="font-weight-light">Descuento publicado</v-list-tile-sub-title>
              <v-list-tile-title>{{ mlDiscount }}%</v-list-tile-title>
              </template>
            <span>Es el descuento publicado en Mercado Libre por el vendedor</span>
          </v-tooltip>
        </v-list-tile-content>
      </v-list-tile>
    </template>

  </v-list>
</template>

<script>
export default {
  name: 'ArticlePriceHistory',
  props: ['article', 'mlArticle'],
  computed: {
    price () {
      return this.article.history[this.article.history.length - 1].price
    },
    previousPrice () {
      const previousSnapshot = this.article.history[this.article.history.length - 2]
      return previousSnapshot && previousSnapshot.price
    },
    discount () {
      return this.previousPrice
        ? (100 - Math.round(this.price * 100 / this.previousPrice))
        : 0
    },
    original_price () {
      // maybe use last snapshot original price instead
      return this.mlArticle.original_price
    },
    mlDiscount () {
      return this.original_price && (100 - Math.round(this.price * 100 / this.original_price))
    }
  }
}
</script>

<style lang="scss" scoped>
.discount-title {
  display: flex;
  justify-content: flex-start;
}

</style>
