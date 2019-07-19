<template>
  <v-icon v-if="seeLater" dark size="50" color="primary" @click="showWizard">help</v-icon>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      seeLater: 'wizard/seeLater'
    })
  },
  methods: {
    ...mapMutations({
      showWizard: 'wizard/show'
    })
  }
}
</script>

<style lang="scss" scoped>
.v-icon {
  position: fixed;
  bottom: 50px;
  right: 10px;
  cursor: pointer;
}
</style>
