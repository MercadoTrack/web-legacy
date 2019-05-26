<template>
  <v-content>
    <v-container>
      <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>
      <v-card v-else elevation=0>
        <v-layout row wrap>
          <v-flex xs12>
            <v-list-tile class="pa-4">
              <span class="display-1">{{ seller.nickname }}</span>
                <v-btn flat icon color="green lighten-1" v-if="userVerified()">
                  <v-icon>verified_user</v-icon>
                </v-btn>
                <v-btn flat icon color="blue lighten-1" v-if="isBrand()">
                  <v-icon>store</v-icon>
                </v-btn>
                <v-btn flat icon color="grey lighten-1" @click="goToMLSeller">
                  <v-icon>call_made</v-icon>
                </v-btn>
              <v-layout justify-end row>
                <v-img absolute class="floating-logo rounded" src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"> 
                </v-img>
              </v-layout>
            </v-list-tile>
            <v-divider></v-divider>
          </v-flex>

          <v-container class="pa-0 ma-0 line-wrap" :text-xs-center="$vuetify.breakpoint.mdAndDown">
            <v-layout wrap class="pa-0 ma-0">
              <v-flex xs12 pa-4>
                <v-list two-line subheader>
                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title class="subtitle">{{ seller.address.city }}, {{ seller.country_id}}</v-list-tile-title>
                      <v-list-tile-sub-title class="font-weight-light">Ubicación</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title class="subtitle">{{ 2019 - (seller.registration_date.substring(0,4))}}</v-list-tile-title>
                      <v-list-tile-sub-title class="font-weight-light">Años vendiendo en MercadoLibre</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title class="subtitle">{{ seller.seller_reputation.transactions.completed}}</v-list-tile-title>
                      <v-list-tile-sub-title class="font-weight-light">Ventas concretadas</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title class="subtitle">{{ seller.seller_reputation.transactions.canceled}}</v-list-tile-title>
                      <v-list-tile-sub-title class="font-weight-light">Ventas canceladas</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content>
                      <v-list-tile-title class="subtitle">{{ seller.seller_reputation.level_id}}</v-list-tile-title>
                      <v-list-tile-sub-title class="font-weight-light">MercadoLibre {{ seller.seller_reputation.power_seller_status.charAt(0).toUpperCase() + seller.seller_reputation.power_seller_status.substr(1)}}</v-list-tile-sub-title>
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
              <v-flex xs6 pa-4>
                <v-list subheader>
                  <span class="headline ml-3">Calificaciones</span>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-btn flat icon color="green lighten-2">
                        <v-icon>mood</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                      <span class="font-weight-light">{{ seller.seller_reputation.transactions.ratings.positive }} Positivas</span>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-btn flat icon color="red lighten-2">
                        <v-icon>mood_bad</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                      <span class="font-weight-light">{{ seller.seller_reputation.transactions.ratings.negative }} Negativas</span>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-btn flat icon color="yellow darken-2">
                        <v-icon>sentiment_satisfied</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                      <span class="font-weight-light">{{ seller.seller_reputation.transactions.ratings.neutral }} Neutras</span>
                  </v-list-tile>
                </v-list>
              </v-flex>
              <v-flex xs6 pa-4>
                <v-list subheader>
                  <span class="headline ml-3">Resumen</span>
                  <v-list-tile>
                    <v-list-tile-action>
                      <v-btn flat icon color="grey lighten-1">
                        <v-icon>thumb_up_alt</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                      <span class="font-weight-light">Nunca ha aplicado descuentos sobre precios ficticios.</span>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-btn flat icon color="grey lighten-1">
                        <v-icon>timer</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                      <span class="font-weight-light">Despacha sus productos a tiempo.</span>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-btn flat icon color="grey lighten-1">
                        <v-icon>chat</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                      <span class="font-weight-light">Brinda buena atención.</span>
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
                  <span class="headline">Publicaciones</span>
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
import axios from 'axios'

export default {
  data: () => ({
    loading: false,
    seller: null,
  }),
  async mounted () { 
  const sellerRes = await axios.get(`https://api.mercadolibre.com/users/${this.$route.params.id}`)
  this.seller = sellerRes.data
  console.log(this.seller)
  },
  methods: {
    goToMLSeller () {
      window.open(this.seller.permalink)
    },
    userVerified() {
      if(this.seller.tags.includes("user_info_verified"))
      return true;
    },
    isBrand() {
      if(this.seller.tags.includes("brand"))
      return true;
    },
    isLargeSeller() {
      if(this.seller.tags.includes("large_seller"))
      return true;
    },
    isMercadoShop() {
      if(this.seller.tags.includes("shop"))
      return true;
    }
  },
}
</script>

<style>
.floating-logo {
  top: 50px;
  max-width: 150px;
}

.v-btn {
  margin: 0;
}
</style>

