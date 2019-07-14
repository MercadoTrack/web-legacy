<template>
  <v-dialog v-model="dialog" width="300">
    <v-card v-if="article">
      <v-container>
        <v-card-title primary-title class="pt-3">
          <v-flex>
            <ArticleCardHeadline :article="article" />
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
</template>

<script>
import { ArticlesHelper } from '../utils'
import { ArticleCardHeadline } from './ArticleCard'

export default {
  name: 'article-share-dialog',
  components: {
    ArticleCardHeadline,
  },
  computed: {
    article () {
      return this.$store.state.share.article
    },
    dialog: {
      get () {
        return Boolean(this.article)
      },
      set (val) {
        this.$store.commit('share/setArticle', null)
      }
    },
    price () {
      return ArticlesHelper.price(this.article)
    },
    previousPrice () {
      return ArticlesHelper.previousPrice(this.article)
    },
    discount () {
      return ArticlesHelper.fluctuation(this.article)
    },
    discountColor () {
      return ArticlesHelper.fluctuationColor(this.article)
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>
