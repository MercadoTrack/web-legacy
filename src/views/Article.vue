<template>
  <v-content>
    <v-container>
      <v-card>
        <v-breadcrumbs :items="breadcrumbItems" divider=">"></v-breadcrumbs>
        <v-divider class="mb-3"></v-divider>
        
          <v-flex xs8 sm8 md8 xl8 pa-3>
            <span class="display-2">Título</span>

            <v-img src="https://http2.mlstatic.com/zapatillas-nike-mujer-D_NQ_NP_641620-MLA29462177708_022019-F.webp"></v-img>

          </v-flex>

          <v-divider class="mb-3"></v-divider>

          <v-flex xs8 sm8 md8 xl8 pa-3>
            <v-sparkline
              :labels="labels"
              :value="value"
              color="black"
              line-width="1"
              padding="16"
              auto-draw
              label-size="4"
            ></v-sparkline>
          </v-flex> 
        </v-card>
    </v-container>
  </v-content>
</template>

<script>
  export default {
    data: () => ({
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
