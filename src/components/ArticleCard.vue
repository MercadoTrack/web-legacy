<template>
  <v-card>
    <v-container fluid class="pa-0">
      <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75" ></v-img>
      <v-card-title primary-title>
        <div>
          <h4 class="title mb-0">{{ article.title }}</h4>
          <div>Test</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn flat color="primary">
          History <div class="ml-1 v-badge__badge primary">{{ article.history.length }}</div>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn flat color="primary"><v-icon>share</v-icon></v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'article-card',
  props: [ 'article' ]
}
</script>

<style lang="scss" scoped>
.v-badge__badge {
  position: unset;
  display: inline-block;
}
</style>
