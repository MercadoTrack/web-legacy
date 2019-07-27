<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-select :items="statuses" v-model="_status" label="Estado"></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
import { statuses } from '../../utils/articlesHelper'

export default {
  name: 'PriceFilter',
  props: ['status'],
  data: () => ({
    statuses: Object.keys(statuses)
  }),
  computed: {
    _status: {
      get () {
        return this.status
      },
      set (status) {
        this.$emit('update:status', status)
      }
    },
  },
}
</script>
