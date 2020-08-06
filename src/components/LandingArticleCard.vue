<template>
  <v-hover>
    <v-card hover slot-scope="{ hover }" :height="size" :width="size">
      <router-link :to="`/articulo/${article.id}`">
        <v-img :src="getArticleImg(article)" contain :height="size" :width="size">
          <v-expand-transition>
            <div
              v-if="hover"
              class="d-flex transition-fast-in-fast-out primary darken-2 v-card--reveal display-3 white--text"
            >
              <v-container fill-height>
                <v-layout fill-height wrap>
                  <v-flex xs12 align-end flexbox>
                    <p class="headline font-weight-medium text-wrap">
                      {{ article.price | priceFilter }}
                    </p>
                  </v-flex>
                  <v-flex xs12 align-end flexbox>
                    <p class="title font-weight-light text-wrap">
                      {{ article.title }}
                    </p>
                  </v-flex>
                </v-layout>
              </v-container>
            </div>
          </v-expand-transition>
        </v-img>
        <!-- <ArticleCardHeadline :article="article" /> -->
      </router-link>
    </v-card>
  </v-hover>
</template>

<script>
import ArticleCardHeadline from '../components/ArticleCard/ArticleCardHeadline'

export default {
  components: {
    ArticleCardHeadline,
  },
  props: ['article'],
  methods: {
    getArticleImg (article) {
      const fallback = 'https://http2.mlstatic.com/resources/frontend/statics/img-not-available/1.0.0/V.jpg'
      return article.image || fallback
    },
  },
  computed: {
    size () {
      return this.$vuetify.breakpoint.lgAndUp ? 275 : 200
    }
  },
}
</script>

<style lang="scss" scoped>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .75;
  position: absolute;
  width: 100%;
  height: 100%;
}
p.body-1 {
  letter-spacing: 1px;
}
</style>
