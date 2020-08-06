<template>
  <h4 class="headline mb-0">
    <span :class="{ 'mr-auto': !fluctuation }">
      {{ price | priceFilter }}
    </span>
    <span class="subheading grey--text strike-through ml-1" v-if="fluctuation">
      {{ previousPrice | priceFilter }}
    </span>
    <ArticleFluctuation :article="article"></ArticleFluctuation>
  </h4>
</template>

<script>
import { ArticlesHelper } from '../../utils'
import ArticleFluctuation from '../Article/ArticleFluctuation'

export default {
  name: 'article-card-headline',
  props: ['article'],
  components: {
    ArticleFluctuation,
  },
  computed: {
    price () { return ArticlesHelper.price(this.article) },
    previousPrice () { return ArticlesHelper.previousPrice(this.article) },
    fluctuation () { return ArticlesHelper.fluctuation(this.article) },
    fluctuationColor () { return ArticlesHelper.fluctuationColor(this.article) },
  }
}
</script>

<style lang="scss" scoped>
.headline {
  display: flex;
  justify-content: flex-end;
}
@media screen and (max-width: 600px) {
  .subheading {
    display: none;
  }
    .headline {
    font-size: 1.2rem !important;
  }
}
</style>
