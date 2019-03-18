<template>
  <div>
    <v-hover>
      <v-card 
        slot-scope="{ hover }"
        :class="`elevation-${hover ? 12 : 2}`">
        <v-container fluid class="pa-0">
          <v-img :src="imageUrl" contain aspect-ratio="1.3" :lazy-src="lazyImageUrl">
            <v-container class="pa-3" fill-height fluid>
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="headline" :class="`display-${hover ? 'true' : 'none'}`">
                    <v-btn class="ma-0" icon @click="dialog = true"><v-icon color="primary">share</v-icon></v-btn>
                    <v-btn class="ma-0" icon @click="favorite = !favorite">
                      <v-icon v-if="favorite" color="primary">favorite</v-icon>
                      <v-icon v-else color="primary">favorite_border</v-icon>
                    </v-btn>
                  </span>
                </v-flex>
              </v-layout>
            </v-container>
            <v-layout slot="placeholder" fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-1"></v-progress-circular>
            </v-layout>
          </v-img>
          <v-divider light></v-divider>
          <v-card-text
            style="position: relative;"
          >
            <v-card-title class="pointer" primary-title @click="goToArticle">
              <v-btn
                absolute
                color="white"
                class="green--text border"
                depressed
                fab
                small
                right
                top
                >
                <v-icon>local_shipping</v-icon>
              </v-btn>

              <v-flex xs12 :class="`display-${hover || $vuetify.breakpoint.smAndDown ? 'true' : 'none'}`">
                <p class="subheading font-weight-light article-title grey--text">{{ article.title }}</p>
              </v-flex>
              <v-flex xs12>
                <h4 class="headline mb-0">
                  <span class="mr-1">${{ price }}</span>
                  <span class="subheading grey--text strike-through" v-if="previousPrice && previousPrice != price">${{ previousPrice }}</span>
                  <span v-if="discount" class="body-1 ml-auto mr-2" :style="{ color: discountColor }">
                    <v-icon v-if="discount > 0" :color="discountColor" small>arrow_upward</v-icon>
                    <v-icon v-if="discount < 0" :color="discountColor" small>arrow_downward</v-icon
                    >{{ Math.abs(discount) }}%
                  </span>
                </h4>
              </v-flex>
            </v-card-title>
          </v-card-text>

          <v-card-actions>
            <div class="px-2 d-flex text_normal subheading font-weight-light">
              Ver historial<div class="ml-1 v-badge__badge primary d-flex">{{ article.history.length }}</div>
            </div>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-container>
      </v-card>
      <v-dialog v-model="dialog" width="300">
        <v-card>
          <v-container>
            <v-card-title primary-title class="pt-3">
              <v-flex>
                <h4 class="headline mb-0">
                  <span class="mr-1">${{ price }}</span>
                  <span class="subheading grey--text strike-through" v-if="previousPrice && previousPrice != price">${{ previousPrice }}</span>
                  <span v-if="discount" class="body-1 ml-auto mr-2" :style="{ color: discountColor }">
                    <v-icon v-if="discount > 0" :color="discountColor" small>arrow_upward</v-icon>
                    <v-icon v-if="discount < 0" :color="discountColor" small>arrow_downward</v-icon
                    >{{ Math.abs(discount) }}%
                  </span>
                </h4>
              </v-flex>
              <v-flex xs12>
                <p class="subheading ma-0 article-title">{{ article.title }}</p>
              </v-flex>
            </v-card-title>
            <v-layout height="100" justify-center>
              <v-card-actions>
                <v-flex xs4>
                  <v-btn icon flat color="primary" class="ma-2 no-hover"><v-icon class="pointer social fb"></v-icon></v-btn>
                </v-flex>
                <v-flex xs4>
                  <v-btn icon flat color="primary" class="ma-2 no-hover"><v-icon class="pointer social tw"></v-icon></v-btn>
                </v-flex>
                <v-flex xs4>
                  <v-btn icon flat color="primary" class="ma-2 no-hover"><v-icon class="pointer social ig"></v-icon></v-btn>
                </v-flex>
              </v-card-actions>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: 'article-card',
  props: [ 'article' ],
  data: () => ({
    dialog: false,
    favorite: false,
  }),
  computed: {
    price () {
      return this.article.history[this.article.history.length - 1].price
    },
    previousPrice () {
      let previousSnapshot = this.article.history[this.article.history.length - 2]
      return previousSnapshot && previousSnapshot.price
    },
    discount () {
      return 100 - Math.round(this.previousPrice * 100 / this.price)
    },
    discountColor () {
      return this.discount > 0 ? 'red' : 'green'
    },
    isLiar () {
      return this.article.originalPrice && this.article.originalPrice !== this.previousPrice
    },
    imageUrl () {
      const fallback = 'https://http2.mlstatic.com/resources/frontend/statics/img-not-available/1.0.0/V.jpg'
      return this.article.images[0] || fallback
    },
    lazyImageUrl () {
      return this.imageUrl.replace('-O.jpg', '-I.jpg')
    }
  },
  methods: {
    goToArticle () {
      window.open(this.article.permalink)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-badge__badge {
  position: unset;
  display: inline-block;
}
.headline {
  display: flex;
  justify-content: flex-start;
}
.social {
  height: 32px;
  width: 32px;
  &.fb {
    background-image: url('../assets/facebook.svg');
  }
  &.tw {
    background-image: url('../assets/twitter.svg');
  }
  &.ig {
    background-image: url('../assets/instagram.svg');
  }
}

.no-hover::before {
  color: transparent;
}

.display-none {
  display: none;
}

.headline {
  justify-content: flex-end;
}

.border {
  border-color: lightgray!important;
  border: 1px solid;
  border-top-style: solid;
  border-top-width: 1px;
  border-right-style: solid;
  border-right-width: 1px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-left-style: solid;
  border-left-width: 1px;
  background: white!important;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.text_normal {
  text-transform: none;
}

</style>
