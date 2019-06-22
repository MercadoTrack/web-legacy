<template>
    <div>
        <span :class="{ 'mr-auto': !fluctuation }">
            {{ price | priceFilter }}
        </span>
        <span class="subheading grey--text strike-through ml-1" v-if="fluctuation">
            {{ previousPrice | priceFilter }}
        </span>
    </div>
</template>

<script>
import { ArticlesHelper } from '../../utils'

export default {
  name: 'ArticlePrice',
  props: ['article'],
  computed: {
    price () { return ArticlesHelper.price(this.article) },
    previousPrice () { return ArticlesHelper.previousPrice(this.article) },
    fluctuation () { return ArticlesHelper.fluctuation(this.article) },
    fluctuationColor () { return ArticlesHelper.fluctuationColor(this.article) },
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .subheading {
    display: none;
  }
}
</style>
