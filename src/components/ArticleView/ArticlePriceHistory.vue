<template>
  <v-list two-line subheader>

    <template v-if="price">
      <v-list-tile>
        <v-list-tile-content>
          <v-tooltip right max-width="25rem">
            <template slot="activator">
              <v-list-tile-title class="subtitle">{{ article.history.length - 1 }}</v-list-tile-title>
              <v-list-tile-sub-title class="font-weight-light">Variaciones</v-list-tile-sub-title>
            </template>
            <span>Es la cantidad de veces que el precio publicado sufrió modificaciones.</span>
          </v-tooltip>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-content>
          <v-tooltip right max-width="25rem">
            <template slot="activator">
              <v-list-tile-title class="subtitle">{{ price | priceFilter }}</v-list-tile-title>
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
              <v-list-tile-title class="subtitle">{{ price | priceFilter }}</v-list-tile-title>
              <v-list-tile-sub-title class="font-weight-light">Precio real</v-list-tile-sub-title>
              </template>
            <span>Es el precio sobre el cual se aplicó el descuento publicado.</span>
          </v-tooltip>
        </v-list-tile-content>
      </v-list-tile>
    </template>

    <template v-if="mlArticle.original_price">
      <v-list-tile>
        <v-list-tile-content>
          <v-tooltip right max-width="25rem">
            <template slot="activator">
              <v-list-tile-title class="tsubitle">0%</v-list-tile-title>
              <v-list-tile-sub-title class="font-weight-light">Descuento publicado</v-list-tile-sub-title>
              </template>
            <span>Es el descuento publicado en Mercado Libre por el vendedor</span>
          </v-tooltip>
        </v-list-tile-content>
      </v-list-tile>
    </template>

    <template v-if="price">
      <v-list-tile v-if="price">
        <v-list-tile-content>
          <v-tooltip right max-width="25rem">
            <template slot="activator">
              <v-list-tile-title class="subtitle">0%</v-list-tile-title>
              <v-list-tile-sub-title class="font-weight-light">Descuento real</v-list-tile-sub-title>
              </template>
            <span>Es el descuento real del producto en base a su precio anterior</span>
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
  }
}
</script>
