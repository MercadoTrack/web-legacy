<template>
  <v-content>
    <v-container>
      <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>

      <v-card v-else>
        <v-layout row wrap>
          <v-flex xs12 pb-0>
            <h5 class="headline font-weight-light pa-3">Favoritos</h5>
          </v-flex>
          <v-container class="pa-0 ma-0 line-wrap">
            <v-layout wrap class="pa-0 ma-0">
              <v-flex xs12 md12 lg12 xl12 class="pa-0">
                <v-list>
                  <v-list-tile class="line py-2">
                    <v-list-tile-action>
                      <v-checkbox></v-checkbox>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-list-tile-title>Todos ({{this.items.length}})</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile
                    v-for="item in items"
                    :key="item.id"
                    avatar
                    class="line border"
                    >

                    <v-list-tile-action>
                      <v-checkbox></v-checkbox>
                    </v-list-tile-action>

                    <v-list-tile-avatar :tile="false" size="150">
                      <img :src="item.img">
                    </v-list-tile-avatar>

                    <v-list-tile-content class="ml-4 article-caption">
                      <v-list-tile-title class="title font-weight-light mb-2">{{ item.title }}</v-list-tile-title>
                      <v-list-tile-sub-title class="title font-weight-light">${{ item.price }}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-tooltip bottom max-width="25rem">
                      <template slot="activator">
                        <v-list-tile-action>
                          <v-btn icon ripple>
                            <v-icon color="grey lighten-1" @click="goToMLArticle(item.permalink)">call_made</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </template>
                        <span>Ver en Mercado Libre</span>
                    </v-tooltip>

                    <v-tooltip bottom max-width="25rem">
                      <template slot="activator">
                        <v-list-tile-action>
                          <v-btn icon ripple>
                            <v-icon color="grey lighten-1">show_chart</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </template>
                        <span>Ver artículo</span>
                    </v-tooltip>

                    <v-tooltip bottom max-width="25rem">
                      <template slot="activator">
                        <v-list-tile-action>
                          <v-btn icon ripple>
                            <v-icon color="grey lighten-1">more_vert</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </template>
                        <span>Opciones</span>
                    </v-tooltip>
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

export default {
  data: () => ({
    loading: true,
    items: [
      {
        img: 'https://mla-s1-p.mlstatic.com/723842-MLA27773252626_072018-G.jpg',
        title: 'Velador Decorativo Con Tulipa. Base De Madera',
        permalink: 'https://articulo.mercadolibre.com.ar/MLA-624428536-velador-decorativo-con-tulipa-base-de-madera-moderno-luna-_JM',
        price: '750',
        id: 1
      },
      {
        img: 'https://mla-s2-p.mlstatic.com/812373-MLA29749196213_032019-G.jpg',
        title: 'Tv Smart Samsung 40j5200 40 Pulgadas Full Hd',
        permalink: 'https://articulo.mercadolibre.com.ar/MLA-733113241-tv-smart-samsung-40j5200-40-pulgadas-full-hd-_JM',
        price: '15.899',
        id: 2
      },
      {
        img: 'https://mla-s1-p.mlstatic.com/742506-MLA28126349802_092018-G.jpg',
        title: 'Edifier M1360 Parlantes 2.1 Mute Pc Tv Control Volumen',
        permalink: 'https://articulo.mercadolibre.com.ar/MLA-608770332-edifier-m1360-parlantes-21-mute-pc-tv-control-volumen-_JM',
        price: '2.690',
        id: 3
      },
      {
        img: 'https://mla-s2-p.mlstatic.com/743457-MLA27722727897_072018-G.jpg',
        title: 'Almohada Cannon Sublime X2, Envío S/c A Todo El País*',
        permalink: 'https://articulo.mercadolibre.com.ar/MLA-736464289-almohada-cannon-sublime-x2-envio-sc-a-todo-el-pais-_JM',
        price: '1.750',
        id: 4
      },
      {
        img: 'https://mla-s2-p.mlstatic.com/842655-MLA29650554913_032019-G.jpg',
        title: 'Auriculares Bluetooth Soundbuds Sport Nb10',
        permalink: 'https://articulo.mercadolibre.com.ar/MLA-776100485-auriculares-bluetooth-soundbuds-sport-nb10-_JM',
        price: '2.500',
        id: 5
      }
    ]
  }),
  computed: {
    ...mapGetters({
      authenticating: 'auth/authenticating',
      isAuthenticated: 'auth/isAuthenticated',
      favorites: 'auth/favorites',
    })
  },
  methods: {
    goToMLArticle (link) {
      window.open(link)
    }
  },
  mounted () {
    const interval = setInterval(() => {
      if (!this.authenticating) {
        if (!this.isAuthenticated) {
          this.$router.push('/')
        }
        this.loading = false
        clearInterval(interval)
      }
    }, 100)
  }
}
</script>

<style scoped>
.border {
  border-top: 1px solid rgba(0,0,0,.12);
}

.line {
  min-height: auto;
  padding: 5rem 1rem;
}

.article-caption {
  min-height: 50px;
}
</style>
