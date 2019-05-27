<template>
  <div style="display: flex; align-items: center; width: 100%; margin: auto;">
    <div v-if="images.length > 1 && $vuetify.breakpoint.mdAndUp" style="width: 80px; display: flex; flex-direction: column; justify-content: center;" class="pa-1">
      <figure v-for="img in images" :key="img" style="width: 100%;" class="my-2">
        <v-img
          :src="img">
        </v-img>
      </figure>
    </div>
    <v-layout align-center justify-center>
      <v-flex xs12 class="ma-4">
        <div style="display: flex; align-items: center; justify-content: center;">
          <v-carousel light hide-delimiters height="auto" style="">
            <v-carousel-item contain v-for="src in images" :key="src" :src="src"></v-carousel-item>
          </v-carousel>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'ArticleCarousel',
  props: ['images'],
}
</script>

<style lang="scss" scoped>
.v-carousel {
  box-shadow: none;
}
</style>
