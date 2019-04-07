<template>
  <v-content>
    <v-container grid-list-md text-xs-left>
      <v-card>
        <v-layout row wrap>
          <v-flex xs12 pb-0>
            <v-breadcrumbs :items="breadcrumbItems" divider=">"></v-breadcrumbs>
            <v-divider></v-divider>
          </v-flex>

          <v-flex xs8 class="br">
            <v-img src="https://http2.mlstatic.com/zapatillas-nike-mujer-D_NQ_NP_641620-MLA29462177708_022019-F.webp"></v-img>

            <v-container fluid pt-0>
              <v-layout>
                <v-flex xs4 sm4>
                  <v-img
                    src="https://http2.mlstatic.com/nike-mujer-zapatillas-D_NQ_NP_778219-MLA29462176879_022019-F.webp"
                  ></v-img>
                </v-flex>

                <v-flex xs4 sm4>
                  <v-img src="https://http2.mlstatic.com/zapatillas-nike-mujer-D_NQ_NP_628521-MLA29462176876_022019-F.webp">
                  </v-img>
                </v-flex>

                <v-flex xs4 sm4>
                  <v-img src="https://http2.mlstatic.com/nike-mujer-zapatillas-D_NQ_NP_600644-MLA29462176875_022019-F.webp">
                  </v-img>
                </v-flex>

                <v-flex xs4 sm4>
                  <v-img src="https://http2.mlstatic.com/zapatillas-nike-mujer-air-max-dia-6302-moov-D_NQ_NP_987480-MLA29462176880_022019-F.webp">
                  </v-img>
                </v-flex>

              </v-layout>
            </v-container>
          </v-flex>

          <v-flex xs4 pa-4>
            <v-list two-line subheader>
              <span class="display-1">Zapatillas Nike Mujer Air Max Dia - 6302</span>

              <v-card flat>
                <v-card-text class="pl-0">
                  <p class="display-1 font-weight-light">$4.650,00</p>
                  <v-rating v-model="rating"></v-rating>
                </v-card-text>
              </v-card>
            </v-list>
          </v-flex>

          <v-flex xs12 py-0>
            <v-divider></v-divider>
          </v-flex>

          <v-flex xs8 pa-4 class="br">
            <Chart />
          </v-flex>

          <v-flex xs4 pa-4>
            <v-list two-line subheader>
              <v-subheader class="headline">Historial de precios</v-subheader>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>5</v-list-tile-title>
                  <v-list-tile-sub-title>variaciones en la última semana</v-list-tile-sub-title>  <!-- la cantidad de veces que el precio sufrio modificaciones -->
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>$4.650,00</v-list-tile-title>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-list-tile-sub-title v-on="on">Precio actual publicado</v-list-tile-sub-title>
                      </template>
                    <span>Es el precio publicado en MercadoLibre por el vendedor</span>
                  </v-tooltip>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>$6.650,00</v-list-tile-title>
                  <v-list-tile-sub-title>Precio real</v-list-tile-sub-title> <!-- El precio sobre el cual se aplicó el descuento publicado -->
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>%25</v-list-tile-title>
                  <v-list-tile-sub-title>Descuento publicado</v-list-tile-sub-title> <!-- El precio sobre el cual se aplicó el descuento publicado -->
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>-%10</v-list-tile-title>
                  <v-list-tile-sub-title>Descuento real</v-list-tile-sub-title> <!-- El precio sobre el cual se aplicó el descuento publicado -->
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
import Chart from '../components/Chart'

export default {
  components: { Chart },
  data: () => ({
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
  })
}
</script>

<style scoped>
.br {
  border-right: 1px solid rgba(0,0,0,.12);
}
</style>
