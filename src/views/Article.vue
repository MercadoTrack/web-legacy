<template>
  <v-content>
    <v-container grid-list-md text-xs-left>
      <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>

      <v-card v-else>
        <v-layout row wrap>
          <v-flex xs12 pb-0>
            <v-breadcrumbs :items="breadcrumbItems" divider=">"></v-breadcrumbs>
            <v-divider></v-divider>
          </v-flex>

          <v-flex class="pa-0">
            <section
              v-for="url in article.images.slice(1,4)"
              :key="url"
              xs2 class="br pa-3"
            >
              <v-img
                :src="url">
              </v-img>
            </section>
          </v-flex>

          <v-flex xs6 class="br">
            <v-img class="mx-5" :src="article.images[0]"></v-img>
          </v-flex>

          <v-flex xs4 pa-4>
            <v-list two-line subheader>
              <span class="display-1">{{ article.title }}</span>

              <v-card flat>
                <v-card-text class="pl-0">
                  <p class="display-1 font-weight-light">${{ article.price }}</p>

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

          <v-flex xs12 py-0>
            <v-divider></v-divider>
          </v-flex>

          <v-flex xs8 pa-4 class="br">
            <Chart :history="article.history" />
          </v-flex>

          <v-flex xs4 pa-4>
            <v-list two-line subheader>
              <v-subheader class="headline">Historial de precios</v-subheader>
              <v-list-tile>
                <v-list-tile-content>
                  <v-tooltip right max-width="25rem">
                    <template slot="activator">
                      <v-list-tile-title class="title">{{ article.history.length }}</v-list-tile-title>
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
                      <v-list-tile-title class="title">${{ article.price }}</v-list-tile-title>
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
                      <v-list-tile-title class="title">{{ article.price }}</v-list-tile-title>
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

          <v-flex xs12 py-0>
            <v-divider></v-divider>
          </v-flex>

          <v-flex xs12 pa-4>
            <v-list two-line subheader>
              <v-subheader class="headline">Sobre este vendedor</v-subheader>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>mood</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Nunca ha aplicado descuentos sobre precios ficticios.</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>timer</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Despacha sus productos a tiempo.</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-action>
                  <v-icon>chat</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Brinda buena atención.</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>

            </v-list>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import http from '../http.js'
import Chart from '../components/Chart'
import Spinner from '../components/Spinner'

export default {
  components: { Chart, Spinner },
  data: () => ({
    loading: true,
    article: null,
    rating: 3,
    breadcrumbItems: [
      {
        text: 'Todos los artículos',
        disabled: false,
        href: 'breadcrumbs_dashboard'
      },
      {
        text: 'Categoría',
        disabled: false,
        href: 'breadcrumbs_link_1'
      },
      {
        text: 'Sub categoría',
        disabled: true,
        href: 'breadcrumbs_link_2'
      }
    ],
    labels: [
      '12/02',
      '3/03',
      '6/03',
      '9/03',
      '12/04',
      '3/05',
      '6/05',
      '9/05'
    ],
    value: [
      200,
      675,
      410,
      390,
      310,
      460,
      250,
      240
    ]
  }),
  mounted () {
    const id = this.$route.params.id
    http.get(`articles/${id}`)
      .then(res => {
        console.log(res.data)
        this.article = res.data
        this.loading = false
      })
  },
  methods: {
    goToMLArticle () {
      window.open(this.article.permalink)
    }
  }
}
</script>

<style scoped>
.br {
  border-right: 1px solid rgba(0,0,0,.12);
}
</style>
