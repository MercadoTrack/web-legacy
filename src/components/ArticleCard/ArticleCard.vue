<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-container fluid class="pa-0">
        <ArticleCardImage :article="article" :hover="hover" />
        <v-divider light></v-divider>
        <v-card-text>
          <v-card-title class="pointer" primary-title @click="goToArticle">
            <v-btn class="green--text shipping" depressed fab small absolute right top>
              <v-icon>local_shipping</v-icon>
            </v-btn>
            <v-flex xs12>
              <p class="subheading font-weight-light article-title grey--text mb-0">{{ article.title }}</p>
            </v-flex>
            <v-flex xs12>
              <ArticleCardHeadline :article="article" />
            </v-flex>
          </v-card-title>
        </v-card-text>
      </v-container>
    </v-card>
  </v-hover>
</template>

<script>
import ArticleCardHeadline from './ArticleCardHeadline'
import ArticleCardImage from './ArticleCardImage'

export default {
  name: 'article-card',
  components: {
    ArticleCardHeadline,
    ArticleCardImage,
  },
  props: [ 'article' ],
  methods: {
    goToArticle () {
      this.$router.push(`/article/${this.article.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.v-badge__badge {
  position: unset;
  display: inline-block;
}

.shipping {
  border: 1px solid lightgray !important;
  background: white!important;
}

.subheading {
  $three-lines-aprox-height: 80px;
  height: $three-lines-aprox-height;
}
</style>
