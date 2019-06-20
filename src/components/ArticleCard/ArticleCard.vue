<template>
  <v-hover>
    <div slot-scope="{ hover }" class="relative">
      <ArticleCardShare :article="article" :hover="hover" />
      <v-card :class="`elevation-${hover ? 12 : 2} pointer`" :to="`/articulo/${article.id}`">
        <v-container fluid class="pa-0">
          <ArticleCardImage :article="article" />
          <v-divider light></v-divider>
          <v-card-text class="relative">
            <v-chip dark label :color="statusColor" class="status">{{ status }}</v-chip>
            <v-card-title class="pa-0 pt-3" primary-title>
              <v-flex xs12>
                <p class="subheading font-weight-light grey--text mb-1">{{ article.title }}</p>
              </v-flex>
              <v-flex xs12>
                <ArticleCardHeadline :article="article" />
              </v-flex>
            </v-card-title>
          </v-card-text>
        </v-container>
      </v-card>
    </div>
  </v-hover>
</template>

<script>
import ArticleCardHeadline from './ArticleCardHeadline'
import ArticleCardImage from './ArticleCardImage'
import ArticleCardShare from './ArticleCardShare'

export default {
  name: 'article-card',
  components: {
    ArticleCardHeadline,
    ArticleCardImage,
    ArticleCardShare,
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

// https://stackoverflow.com/a/34559614/3916621
.subheading {
  height: 48px; // magic number for 2 lines
  display: -webkit-box;
  display: -moz-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.v-chip.status {
  text-transform: capitalize;
  position: absolute;
  top: -1.5rem;
  right: 0.5rem;
}
</style>
