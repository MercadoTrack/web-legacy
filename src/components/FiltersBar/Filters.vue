<template>
  <v-layout wrap>
    <!-- price filter -->
    <v-flex xs12 sm5 xl3>
      <PriceFilter :price.sync="price" :error.sync="priceError" />
    </v-flex>
    <v-flex xs12 class="mt-3" style="display: flex;">
      <v-btn color="primary" class="ml-auto mr-0" @click="applyFilters()" :disabled="error">
        Aplicar
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import PriceFilter from './PriceFilter'

export default {
  name: 'Filters',
  components: {
    PriceFilter,
  },
  data: () => ({
    price: {},
    priceError: '',
  }),
  computed: {
    error () {
      return !!this.priceError
    }
  },
  methods: {
    applyFilters () {
      const filtersToApply = {}
      const { min, max } = this.price
      if (min) {
        filtersToApply.priceMin = min
      }
      if (max) {
        filtersToApply.priceMax = max
      }
      this.$emit('apply-filters', filtersToApply)
    },
    onQueryUpdate (query) {
      this.price = {
        min: Number(query.priceMin) || null,
        max: Number(query.priceMax) || null
      }
    }
  },
  watch: {
    '$route.query' (query) {
      this.onQueryUpdate(query)
    }
  },
  mounted () {
    const { query } = this.$route
    this.onQueryUpdate(query)
  }
}
</script>
