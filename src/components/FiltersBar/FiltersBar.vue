<template>
  <v-layout wrap class="px-3">
    <v-flex xs12 style="display: flex;">
      <div>
        <Chips v-on:remove-chip="removeChip" />
      </div>
      <v-btn icon dark color="primary" @click="toggleShow()" class="ml-auto">
        <v-fade-transition leave-absolute>
          <v-icon key="less" v-if="expand">expand_less</v-icon>
          <v-icon key="filter" v-else>filter_list</v-icon>
        </v-fade-transition>
      </v-btn>
    </v-flex>
    <v-flex xs12>
      <v-expand-transition>
        <v-form v-show="expand">
          <Filters v-on:apply-filters="applyFilters" />
        </v-form>
      </v-expand-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import Chips from './Chips'
import Filters from './Filters'
import { filtersKeys } from './filtersHelper'

export default {
  name: 'FiltersBar',
  components: { Chips, Filters },
  data: () => ({
    expand: false,
  }),
  methods: {
    toggleShow () {
      this.expand = !this.expand
    },
    applyFilters (filters) {
      const query = {}
      for (const param in this.$route.query) {
        if (!filtersKeys.includes(param)) {
          query[param] = this.$route.query[param]
        }
      }
      Object.assign(query, filters)
      this.$router.push({ name: 'search', query })
    },
    removeChip (key) {
      const query = {}
      for (const param in this.$route.query) {
        if (param !== key) {
          query[param] = this.$route.query[param]
        }
      }
      this.$router.push({ name: 'search', query })
    }
  }
}
</script>
