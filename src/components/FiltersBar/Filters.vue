<template>
  <v-layout wrap>
    <!-- price filter -->
    <v-flex xs10 sm5 xl3 v-if="price">
      <div class="d-flex">
        <span class="mr-3 mt-3 v-label theme--light d-flex align-center">{{ price[0] | priceFilter }}</span>
        <v-range-slider
          v-model="price"
          hide-details
          thumb-label
          :step="100"
          :min="100"
          :max="10000"
        />
        <span class="ml-3 mt-3 v-label theme--light d-flex align-center">{{ price[1] | priceFilter }}</span>
      </div>
    </v-flex>
    <v-flex xs12 style="display: flex;">
      <v-btn dark color="primary" class="ml-auto" @click="applyFilters()">
        Aplicar
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Filters',
  data: () => ({
    price: null
  }),
  methods: {
    applyFilters () {
      const filtersToApply = {}

      // this should be in a PriceFilter component
      const [ priceMin, priceMax ] = this.price
      if (priceMin !== 100 || priceMax !== 10000) {
        if (priceMin !== 100) {
          filtersToApply.priceMin = priceMin
        }
        if (priceMax !== 10000) {
          filtersToApply.priceMax = priceMax
        }
      }

      this.$emit('apply-filters', filtersToApply)
    }
  },
  watch: {
    '$route.query' (query) {
      // this should be in a PriceFilter component
      this.price = [100, 10000]
      if (query.priceMin) {
        this.price[0] = Number(query.priceMin)
      }
      if (query.priceMax) {
        this.price[1] = Number(query.priceMax)
      }
    }
  },
  mounted () {
    const { query } = this.$route
    // this should be in a PriceFilter component
    this.price = [100, 10000]
    if (query.priceMin) {
      this.price[0] = Number(query.priceMin)
    }
    if (query.priceMax) {
      this.price[1] = Number(query.priceMax)
    }
  }
}
</script>
