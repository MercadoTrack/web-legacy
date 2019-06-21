<template>
  <h4 class="headline mb-0">
    <ArticlePrice :article="article"></ArticlePrice>
    <ArticleFluctuation :article="article"></ArticleFluctuation>
  </h4>
</template>

<script>
import ArticlePrice from '../Article/ArticlePrice'
import ArticleFluctuation from '../Article/ArticleFluctuation'

export default {
  name: 'article-card-headline',
  props: ['article'],
  components: {
    ArticlePrice,
    ArticleFluctuation,
  }
}
</script>

<style lang="scss" scoped>
.headline {
  display: flex;
  justify-content: flex-end;
}
@media screen and (max-width: 600px) {
  .headline {
    font-size: 1.2rem !important;
  }
}
</style>
