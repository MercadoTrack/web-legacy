<template>
  <div>
    <v-chip close v-if="category" @input="remove('category')">
      <span>{{ category.name }}</span>
    </v-chip>
    <v-chip close v-if="search" @input="remove('search')">
      <span>{{ search }}</span>
    </v-chip>
    <v-chip close v-for="(value, key) in query" :key="key" @input="remove(key)">
      <span v-if="key == 'priceMin'">
        Desde {{ value | priceFilter }}
      </span>
      <span v-else-if="key == 'priceMax'">
        Hasta {{ value | priceFilter }}
      </span>
      <span v-else>{{ value }}</span>
    </v-chip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { chipsKeys } from './filtersHelper'

const showFilterAsChip = (filterKey) => chipsKeys.includes(filterKey)

export default {
  name: 'Chips',
  computed: {
    ...mapGetters({
      categories: 'meta/categories',
    }),
    search () {
      return this.$route.query.search
    },
    query () {
      const query = Object.keys(this.$route.query)
        .filter(showFilterAsChip)
        .reduce((obj, key) => {
          obj[key] = this.$route.query[key]
          return obj
        }, {})
      return query
    },
    category () {
      if (!this.$route.query.category) return
      return this.categories.find(category => category._id === this.$route.query.category)
    },
  },
  methods: {
    remove (key) {
      this.$emit('remove-chip', key)
    }
  }
}
</script>
