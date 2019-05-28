<template>
  <v-list two-line subheader>

    <template v-if="price">
      <v-list-tile>
        <v-list-tile-content>
          <v-tooltip right max-width="25rem">
            <template slot="activator">
              <v-list-tile-title class="subtitle">{{ price | priceFilter }}</v-list-tile-title>
              <v-list-tile-sub-title class="font-weight-light">Precio real</v-list-tile-sub-title>
              </template>
            <span>Es el precio sobre el cual se aplicó el descuento publicado.</span>
          </v-tooltip>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-tooltip right max-width="25rem">
            <template slot="activator">
              <v-list-tile-title class="subtitle">{{ discount }}%</v-list-tile-title>
              <v-list-tile-sub-title class="font-weight-light">Descuento real</v-list-tile-sub-title>
              </template>
            <span>Es el descuento real del producto en base a su precio anterior</span>
          </v-tooltip>
        </v-list-tile-content>
      </v-list-tile>
    </template>

    <template v-if="original_price">
      <v-list-tile>
        <v-list-tile-content>
          <v-tooltip right max-width="25rem">
            <template slot="activator">
              <v-list-tile-title class="subtitle">{{ original_price | priceFilter }}</v-list-tile-title>
              <v-list-tile-sub-title class="font-weight-light">Precio actual publicado</v-list-tile-sub-title>
            </template>
            <span>Es el precio publicado en MercadoLibre por el vendedor.</span>
        </v-tooltip>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-tooltip right max-width="25rem">
            <template slot="activator">
              <v-list-tile-title class="tsubitle">{{ mlDiscount }}%</v-list-tile-title>
              <v-list-tile-sub-title class="font-weight-light">Descuento publicado</v-list-tile-sub-title>
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
      return this.previousPrice && (100 - Math.round(this.price * 100 / this.previousPrice))
    },
    original_price () {
      // maybe use last snapshot original price instead
      return this.mlArticle.original_price
    },
    mlDiscount () {
      console.log(this.original_price, this.price)
      return this.original_price && (100 - Math.round(this.price * 100 / this.original_price))
    }
  }
}
</script>
