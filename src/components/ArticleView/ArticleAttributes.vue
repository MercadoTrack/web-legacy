<template>
  <v-list two-line subheader :style="listStyle">
    <v-list-tile v-for="attribute in validAttributes" :key="attribute.name">
      <v-list-tile-content>
        <v-list-tile-title class="subtitle">{{ attribute.name }}</v-list-tile-title>
        <v-list-tile-sub-title class="font-weight-light">{{ attribute.value_name }}</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<script>
export default {
  name: 'ArticleAttributes',
  props: ['attributes'],
  computed: {
    validAttributes () {
      // some attributes have no value
      return this.attributes.filter(attribute => Boolean(attribute.value_name))
    },
    listStyle () {
      const height = Math.floor(this.validAttributes.length / 3) * 80
      return this.$vuetify.breakpoint.mdAndUp ? `height: ${height}px;` : ''
    },
  },
}
</script>

<style lang="scss" scoped>
.v-list {
  @media only screen and (min-width: 960px) {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    overflow-x: hidden;
    padding: 0;
  }
}
</style>
