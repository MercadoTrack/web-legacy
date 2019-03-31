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
            <v-flex xs12 pb-2>
              <span class="display-1">Zapatillas Nike Mujer Air Max Dia - 6302</span>
            </v-flex>
            
            <v-flex xs12>
              <span class="display-2 font-weight-light">$4.650</span>
            </v-flex>
          </v-flex>

          <v-flex xs12 py-0>
            <v-divider></v-divider>
          </v-flex>

          <v-flex xs8 class="br">
            <Chart />
          </v-flex>

          <v-flex xs4 pa-4>
            <span class="display-1">Historial de precios</span>
          </v-flex>

        </v-layout>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import Chart from '../components/Chart'

  export default {
    data: () => ({
      components: { Chart },
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
