<template>
  <div class="ma-auto w-100 mt-flex">
    <div v-if="useControls" style="width: 88px;">
      <figure
        v-for="(src, i) in images.slice(0, 5)"
        :key="i"
        :class="`pointer my-2 pa-1 w-100 ${selectedClass(i)}`"
        @click="selectImage(i)"
      >
        <v-img contain :src="src" height="80"></v-img>
      </figure>
    </div>
    <v-layout align-center justify-center>
      <v-flex xs12 class="ma-4">
        <div class="mt-flex">
          <v-carousel
            height="500"
            width="500"
            class="primary-controls"
            v-model="srcIndex"
            :cycle="!useControls"
            light hide-delimiters
          >
            <v-carousel-item contain v-for="(src, i) in images" :key="i" :src="src"></v-carousel-item>
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
  data: () => ({
    srcIndex: 0
  }),
  computed: {
    useControls () {
      return this.images.length > 1 && this.$vuetify.breakpoint.mdAndUp
    }
  },
  methods: {
    selectImage (i) {
      this.srcIndex = i
    },
    selectedClass (i) {
      return this.srcIndex === i ? 'selected' : ''
    }
  },
}
</script>

<style lang="scss" scoped>
.v-carousel {
  box-shadow: none;
}
figure {
  position: relative;
  &.selected::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 50%;
    width: 0.75rem;
    height: 0.75rem;
    background-color: var(--v-primary-base);
  }
}
</style>
