<template>
  <v-layout wrap>
    <!-- price filter -->
    <v-flex xs12 sm5 lg3>
      <PriceFilter :price.sync="price" :error.sync="priceError" />
    </v-flex>
    <v-flex xs12 sm5 offset-sm1 lg3 offset-lg1>
      <StatusFilter :status.sync="status" />
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
import StatusFilter from './StatusFilter'

export default {
  name: 'Filters',
  components: {
    PriceFilter,
    StatusFilter,
  },
  data: () => ({
    price: {},
    status: null,
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
      if (this.status) {
        filtersToApply.status = this.status
      }
      this.$emit('apply-filters', filtersToApply)
    },
    onQueryUpdate (query) {
      this.status = query.status || null
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
