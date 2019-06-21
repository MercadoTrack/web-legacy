<template>
    <span v-if="fluctuation" class="body-1 ml-auto" :style="{ color: fluctuationColor }">
        <v-icon v-if="fluctuation > 0" :color="fluctuationColor" small>arrow_upward</v-icon>
        <v-icon v-if="fluctuation < 0" :color="fluctuationColor" small>arrow_downward</v-icon>
        <span>{{ Math.abs(fluctuation) }}%</span>
    </span>
</template>

<script>
import { ArticlesHelper } from '../../utils'

export default {
  name: 'ArticleFluctuation',
  props: ['article'],
  computed: {
    fluctuation () { return ArticlesHelper.fluctuation(this.article) },
    fluctuationColor () { return ArticlesHelper.fluctuationColor(this.article) },
  }
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .body-1 {
    font-size: 0.8rem !important;
  }
  .v-icon {
    font-size: 1rem !important;
  }
}
</style>
