<template>
  <div>
    <v-list two-line subheader>
      <v-list-tile v-for="attribute in attributes" :key="attribute.name">
        <v-list-tile-content>
          <v-list-tile-title class="subtitle">{{ attribute.name }}</v-list-tile-title>
          <v-list-tile-sub-title class="font-weight-light">{{attribute.value_name}}</v-list-tile-sub-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
export default {
  name: 'ArticleAttributes',
  props: ['mlArticle'],
  computed: {
    attributes () {
      return this.mlArticle.attributes.filter(attribute => Boolean(attribute.value_name))
    }
  }
}
</script>
