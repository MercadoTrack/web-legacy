<template>
  <v-content>
    <v-container>
      <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>

      <v-card v-else>
        <v-layout row wrap>
          <v-flex xs12 pb-0>
            <v-breadcrumbs :items="breadcrumbItems" divider=">"></v-breadcrumbs>
            <v-divider></v-divider>
          </v-flex>
          <v-container class="pa-0 ma-0 line-wrap">
            <v-layout wrap class="pa-0 ma-0">
              <v-flex xs12 md2 lg2 xl2 v-if="multipleImages && $vuetify.breakpoint.mdAndUp" class="pa-0">
                <section
                  v-for="url in article.images.slice(1,4)"
                  :key="url"
                  class="pa-0"
                >
                  <v-img
                    :src="url">
                  </v-img>
                </section>
              </v-flex>

              <v-layout class="pa-0 ma-0 border" align-center justify-center>
                <v-flex xs12 md6 lg6 xl6>
                  <v-img class="mx-0" :src="article.images[0]"></v-img>
                </v-flex>
              </v-layout>

              <v-flex xs12 md4 lg4 xl4 pa-4>
                <v-list two-line subheader>
                  <span class="display-1">{{ article.title }}</span>

                  <v-card flat>
                    <v-card-text class="pl-0">
                      <p class="display-1 font-weight-light">{{ price | priceFilter }}</p>

                      <v-rating v-model="rating"></v-rating>

                      <v-list class="pt-4">
                        <v-list-tile>
                          <v-list-tile-action>
                            <v-icon>payment</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>Pagá hasta en 12 cuotas</v-list-tile-title>
                            <v-list-tile-sub-title>Más información</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                          <v-list-tile-action>
                            <v-icon>local_shipping</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>Envío gratis</v-list-tile-title>
                            <v-list-tile-sub-title>Llega el miércoles 10 de abril</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile>
                          <v-list-tile-action>
                            <v-icon>360</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title>Devolución gratis</v-list-tile-title>
                            <v-list-tile-sub-title>Tenés 15 días desde que lo recibís</v-list-tile-sub-title>
                          </v-list-tile-content>
                        </v-list-tile>

                        <v-list-tile class="pointer">
                          <v-list-tile-action>
                            <v-icon>call_made</v-icon>
                          </v-list-tile-action>
                          <v-list-tile-content>
                            <v-list-tile-title @click="goToMLArticle">Ver en MercadoLibre</v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card-text>
                  </v-card>
                </v-list>
              </v-flex>
            </v-layout>
          </v-container>

          <v-flex xs12 py-0>
            <v-divider></v-divider>
          </v-flex>

          <v-container class="pa-0 ma-0 line-wrap" :text-xs-center="$vuetify.breakpoint.mdAndDown">
            <v-layout wrap class="pa-0 ma-0">
              <v-flex xs12 md8 lg8 xl8 pa-4 class="border">
                <Chart :history="article.history" />
              </v-flex>

              <v-flex xs12 md4 lg4 xl4 pa-4>
                <v-list two-line subheader>
                  <span class="headline">Historial de precios</span>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-tooltip right max-width="25rem">
                        <template slot="activator">
                          <v-list-tile-title class="title">{{ article.history.length - 1 }}</v-list-tile-title>
                          <v-list-tile-sub-title>variaciones</v-list-tile-sub-title>
                        </template>
                        <span>Es la cantidad de veces que el precio publicado sufrió modificaciones.</span>
                      </v-tooltip>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>
                      <v-tooltip right max-width="25rem">
                        <template slot="activator">
                          <v-list-tile-title class="title">${{ price }}</v-list-tile-title>
                          <v-list-tile-sub-title>Precio actual publicado</v-list-tile-sub-title>
                        </template>
                        <span>Es el precio publicado en MercadoLibre por el vendedor.</span>
                    </v-tooltip>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>
                      <v-tooltip right max-width="25rem">
                        <template slot="activator">
                          <v-list-tile-title class="title">${{ price }}</v-list-tile-title>
                          <v-list-tile-sub-title>Precio real</v-list-tile-sub-title>
                          </template>
                        <span>Es el precio sobre el cual se aplicó el descuento publicado.</span>
                      </v-tooltip>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>
                      <v-tooltip right max-width="25rem">
                        <template slot="activator">
                          <v-list-tile-title class="title">%0</v-list-tile-title>
                          <v-list-tile-sub-title>Descuento publicado</v-list-tile-sub-title>
                          </template>
                        <span>Es el descuento publicado en Mercado Libre por el vendedor</span>
                      </v-tooltip>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>
                      <v-tooltip right max-width="25rem">
                        <template slot="activator">
                          <v-list-tile-title class="title">%0</v-list-tile-title>
                          <v-list-tile-sub-title>Descuento real</v-list-tile-sub-title>
                          </template>
                        <span>Es el descuento real del producto en base a su precio anterior</span>
                      </v-tooltip>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
          </v-container>

          <v-flex xs12 py-0>
            <v-divider></v-divider>
          </v-flex>

          <v-container class="pa-0 ma-0 line-wrap" :text-xs-center="$vuetify.breakpoint.mdAndDown">
            <v-layout wrap class="pa-0 ma-0">
              <v-flex xs12 pa-4>
                <v-list two-line subheader>
                  <span class="headline">Sobre este vendedor</span>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon>mood</v-icon>
                    </v-list-tile-action>
                      <span>Nunca ha aplicado descuentos sobre precios ficticios.</span>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon>timer</v-icon>
                    </v-list-tile-action>
                      <span>Despacha sus productos a tiempo.</span>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-icon>chat</v-icon>
                    </v-list-tile-action>
                      <span>Brinda buena atención.</span>
                  </v-list-tile>
                </v-list>
              </v-flex>
            </v-layout>
          </v-container>
        </v-layout>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import http from '../http.js'
import Chart from '../components/Chart'
import Spinner from '../components/Spinner'

export default {
  components: { Chart, Spinner },
  filters: {
    priceFilter: (str) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' }).format(str),
  },
  data: () => ({
    loading: true,
    article: null,
    rating: 3,
  }),
  mounted () {
    const id = this.$route.params.id
    http.get(`articles/${id}`)
      .then(res => {
        this.article = res.data
        this.loading = false
      })
  },
  computed: {
    ...mapGetters({
      categories: 'meta/categories',
      mainCategories: 'meta/mainCategories',
    }),
    category () {
      return this.categories && this.categories.find((category) => category._id === this.article.category_id)
    },
    parentCategory () {
      return this.category && this.mainCategories.find((category) => category._id === this.category.parent)
    },
    breadcrumbItems () {
      const items = [{
        text: 'Todos los artículos',
        disabled: false,
        href: '/'
      }]
      if (this.parentCategory) {
        items.push({
          text: this.parentCategory.name,
          disabled: false,
        })
      }
      if (this.category) {
        items.push({
          text: this.category.name,
          disabled: false,
        })
      }
      return items
    },
    price () {
      return this.article.history[this.article.history.length - 1].price
    },
    multipleImages () {
      if (this.article.images.length > 1) {
        return true
      }
    }
  },
  methods: {
    goToMLArticle () {
      window.open(this.article.permalink)
    }
  }
}
</script>

<style scoped>
.border {
  border-right: 1px solid rgba(0,0,0,.12);
  border-left: 1px solid rgba(0,0,0,.12);
}

.line-wrap {
  height: auto;
  max-height: auto;
}

</style>
