<template>
  <v-content>
    <v-container>
      <v-progress-linear v-if="!seller" :indeterminate="true"></v-progress-linear>
      <v-card v-else elevation=0>
        <v-layout row wrap>
          <v-flex xs12>
            <v-list-tile class="pa-4">
              <span class="display-1">{{ seller.nickname }}</span>

                  <v-icon class="ml-2" color="green darken-1" v-if="userVerified">verified_user</v-icon>
                  <v-icon v-if="isBrand">store</v-icon>

                <v-btn flat icon color="grey lighten-1" style="cursor:pointer" @click="goToMLSeller">
                  <v-icon>call_made</v-icon>
                </v-btn>
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
                      <v-list-tile-sub-title class="font-weight-light">
                        MercadoLibre Argentina<span class="text-capitalize">{{ sellerStatus }}</span>
                      </v-list-tile-sub-title>
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
                      <v-btn disabled flat icon color="green lighten-2">
                        <v-icon>mood</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                      <span class="font-weight-light">{{ seller.seller_reputation.transactions.ratings.positive }} Positivas</span>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-btn disabled flat icon color="red lighten-2">
                        <v-icon>mood_bad</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                      <span class="font-weight-light">{{ seller.seller_reputation.transactions.ratings.negative }} Negativas</span>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-btn disabled flat icon color="yellow darken-2">
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
                      <v-btn disabled flat icon>
                        <v-icon>thumb_up_alt</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                      <span class="font-weight-light">Nunca ha aplicado descuentos sobre precios ficticios.</span>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-btn disabled flat icon>
                        <v-icon>timer</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                      <span class="font-weight-light">Despacha sus productos a tiempo.</span>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-action>
                      <v-btn disabled flat icon>
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
    seller: null,
  }),
  metaInfo () {
    return {
      title: `${this.seller.nickname} en MercadoTrack`
    }
  },
  async mounted () {
    try {
      const sellerRes = await axios.get(`https://api.mercadolibre.com/users/${this.$route.params.id}`)
      this.seller = sellerRes.data
    } catch (err) {
      console.log('Error getting Seller', err)
      this.$router.push('/')
    }
  },
  computed: {
    userVerified () {
      return this.seller.tags.includes('user_info_verified')
    },
    isBrand () {
      return this.seller.tags.includes('brand')
    },
    isLargeSeller () {
      return this.seller.tags.includes('large_seller')
    },
    isMercadoShop () {
      return this.seller.tags.includes('shop')
    },
    sellerStatus () {
      return this.seller.seller_reputation.power_seller_status || ''
    }
  },
  methods: {
    goToMLSeller () {
      window.open(this.seller.permalink)
    },
  }
}
</script>

<style lang="scss" scoped>
.floating-logo {
  top: 50px;
  max-width: 150px;
}

.v-btn {
  margin: 0;
  cursor: default;
  }
</style>
