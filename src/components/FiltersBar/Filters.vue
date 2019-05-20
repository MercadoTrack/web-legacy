<template>
  <v-container class="pa-0">
    <v-layout wrap>
      <!-- price filter -->
      <v-flex xs12 sm5 md3 v-if="price">
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
  </v-container>
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
      const [ minPrice, maxPrice ] = this.price
      if (minPrice !== 100 || maxPrice !== 10000) {
        if (minPrice !== 100) {
          filtersToApply.minPrice = minPrice
        }
        if (maxPrice !== 10000) {
          filtersToApply.maxPrice = maxPrice
        }
      }

      this.$emit('apply-filters', filtersToApply)
    }
  },
  watch: {
    '$route.query' (query) {
      // this should be in a PriceFilter component
      this.price = [100, 10000]
      if (query.minPrice) {
        this.price[0] = Number(query.minPrice)
      }
      if (query.maxPrice) {
        this.price[1] = Number(query.maxPrice)
      }
    }
  },
  mounted () {
    const { query } = this.$route
    // this should be in a PriceFilter component
    this.price = [100, 10000]
    if (query.minPrice) {
      this.price[0] = Number(query.minPrice)
    }
    if (query.maxPrice) {
      this.price[1] = Number(query.maxPrice)
    }
  }
}
</script>
