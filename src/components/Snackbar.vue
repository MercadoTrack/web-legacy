<template>
    <v-snackbar
      v-model="display"
      color="primary"
      :top="true"
      :timeout="timeout"
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="dismiss()"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      show: 'snackbar/show',
      text: 'snackbar/text',
      timeout: 'snackbar/timeout'
    }),
    display: {
      get () {
        return Boolean(this.show)
      },
      set (val) {
        this.$store.commit('snackbar/dismiss')
      }
    },
  },
  methods: {
    dismiss () {
      this.$store.commit('snackbar/dismiss')
    }
  }
}
</script>
