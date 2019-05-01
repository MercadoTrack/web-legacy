<template>
  <v-hover>
    <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`">
      <v-container fluid class="pa-0">
        <ArticleCardImage :article="article" :hover="hover" />
        <v-divider light></v-divider>
        <v-card-text class="relative">
          <v-chip dark label :color="statusColor" class="status">{{ status }}</v-chip>
          <v-card-title class="pointer" primary-title @click="goToArticle()">
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
  computed: {
    status () {
      return this.article.status.split('_').join(' ')
    },
    statusColor () {
      switch (this.article.status) {
        case 'active': return 'green'
        case 'paused': return 'amber darken-3'
        case 'closed': return 'red darken-3'
        default: return 'black'
      }
    }
  },
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

.v-chip.status {
  text-transform: capitalize;
  position: absolute;
  top: -1.5rem;
  right: 0.5rem;
}
</style>
