<template>
  <v-layout wrap class="discount-filter">
    <v-flex xs12>
      <v-checkbox v-model="_withPublishedDiscount" label="Con descuento publicado" hide-details></v-checkbox>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'WithPublishedDiscountFilter',
  props: ['withPublishedDiscount'],
  computed: {
    _withPublishedDiscount: {
      get () {
        return this.withPublishedDiscount
      },
      set (val) {
        this.$emit('update:withPublishedDiscount', val)
      }
    },
  },
}
</script>

<style lang="scss">
  .discount-filter .v-input__control {
    margin-left: auto;
  }
</style>
