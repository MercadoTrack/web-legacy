<template v-if="price">
  <v-list two-line subheader>
    <v-list-tile>
      <v-list-tile-content>
        <v-tooltip right max-width="25rem">
          <template slot="activator">
            <v-list-tile-sub-title class="font-weight-light">Variaciones</v-list-tile-sub-title>
            <v-list-tile-title v-if="this.article.history.length > 1">{{ this.article.history.length - 1}}</v-list-tile-title>
            <v-list-tile-sub-title v-else>No hay variaciones</v-list-tile-sub-title>
          </template>
          <span>Es cantidad de veces que el vendedor modificó el precio</span>
        </v-tooltip>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-tooltip right max-width="25rem">
          <template slot="activator">
            <v-list-tile-sub-title class="font-weight-light">Precio actual</v-list-tile-sub-title>
            <v-list-tile-title>{{ price | priceFilter }}</v-list-tile-title>
            </template>
          <span>Es el precio actual del artículo en Mercado Libre</span>
        </v-tooltip>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-tooltip right max-width="25rem">
          <!-- has fluctuation -->
          <template v-if="fluctuation < 0" slot="activator">
            <v-list-tile-sub-title class="font-weight-light">Descuento</v-list-tile-sub-title>
            <v-list-tile-title class="fluctuation-title green--text text--lighten-2">
              <span class="mr-1">{{ Math.abs(fluctuation) }}%</span>
              <v-icon color="green lighten-2">mood</v-icon>
            </v-list-tile-title>
          </template>
          <!-- no fluctuation -->
          <template v-else-if="!fluctuation && previousPrice" slot="activator">
            <v-list-tile-sub-title class="font-weight-light">Sin descuento</v-list-tile-sub-title>
            <v-list-tile-title class="fluctuation-title yellow--text text--darken-2">
              <v-icon>sentiment_satisfied</v-icon>
            </v-list-tile-title>
          </template>
          <!-- price increased -->
          <template v-else-if="fluctuation" slot="activator">
            <v-list-tile-sub-title class="font-weight-light">Aumento</v-list-tile-sub-title>
            <v-list-tile-title class="fluctuation-title red--text text--lighten-2">
              <span class="mr-1">{{ Math.abs(fluctuation) }}%</span>
              <v-icon color="red lighten-2">sentiment_very_dissatisfied</v-icon>
            </v-list-tile-title>
          </template>

          <template v-else slot="activator">
            <v-list-tile-sub-title class="font-weight-light">Sin variaciones</v-list-tile-sub-title>
            <v-list-tile-title class="fluctuation-title red--text text--lighten-2">
              <v-icon>sentiment_satisfied</v-icon>
            </v-list-tile-title>
          </template>

          <span>Es el descuento o aumento real del artículo en base a su precio anterior</span>
        </v-tooltip>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-tooltip right max-width="25rem">
          <template slot="activator">
            <v-list-tile-sub-title class="font-weight-light">Precio publicado</v-list-tile-sub-title>
            <v-list-tile-title v-if="original_price">{{ original_price | priceFilter }}</v-list-tile-title>
            <v-list-tile-title v-else>{{ price | priceFilter }}</v-list-tile-title>
          </template>
          <span>Es el precio sobre el cual el vendedor aplica el descuento publicado</span>
      </v-tooltip>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile>
      <v-list-tile-content>
        <v-tooltip right max-width="25rem">
          <template slot="activator">
            <v-list-tile-sub-title class="font-weight-light">Descuento publicado</v-list-tile-sub-title>
            <v-list-tile-title v-if="original_price">{{ mlDiscount }}%</v-list-tile-title>
            <v-list-tile-sub-title v-else>Sin descuento publicado</v-list-tile-sub-title>
            </template>
          <span>Es el descuento publicado en Mercado Libre</span>
        </v-tooltip>
      </v-list-tile-content>
    </v-list-tile>

  </v-list>
</template>

<script>
import { ArticlesHelper } from '../../utils'

export default {
  name: 'ArticlePriceHistory',
  props: ['article', 'mlArticle'],
  computed: {
    price () {
      return ArticlesHelper.price(this.article)
    },
    previousPrice () {
      return ArticlesHelper.previousPrice(this.article)
    },
    fluctuation () {
      return ArticlesHelper.fluctuation(this.article)
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
.fluctuation-title {
  display: flex;
  justify-content: flex-start;
}

</style>
