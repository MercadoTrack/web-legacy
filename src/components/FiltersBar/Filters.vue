<template>
  <v-layout wrap>
    <v-flex xs12 class="my-3">
      <v-divider></v-divider>
    </v-flex>
    <!-- price filter -->
    <v-flex xs12 sm5 lg4>
      <PriceFilter :price.sync="price" :error.sync="priceError" />
    </v-flex>
    <!-- with published discount filter -->
    <v-flex xs12 sm5 lg4 offset-sm2 offset-lg4 class="pt-2">
      <WithPublishedDiscountFilter :with-published-discount.sync="withPublishedDiscount" />
    </v-flex>
    <v-flex xs12 class="my-3" style="display: flex;">
      <v-btn color="primary" class="ml-auto mr-0" @click="applyFilters()" :disabled="error">
        Aplicar
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>
import PriceFilter from './PriceFilter'
import StatusFilter from './StatusFilter'
import WithPublishedDiscountFilter from './WithPublishedDiscountFilter'

export default {
  name: 'Filters',
  components: {
    PriceFilter,
    StatusFilter,
    WithPublishedDiscountFilter,
  },
  data: () => ({
    price: {},
    status: null,
    withPublishedDiscount: false,
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
      if (this.withPublishedDiscount) {
        filtersToApply.withPublishedDiscount = true
      }
      this.$emit('apply-filters', filtersToApply)
    },
    onQueryUpdate (query) {
      this.status = query.status || null
      this.withPublishedDiscount = Boolean(query.withPublishedDiscount)
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
