<template>
  <v-icon dark size="45" color="primary" @click="showWizard">help</v-icon>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      showWizard: 'wizard/show',
    }),
  },
}
</script>

<style lang="scss" scoped>
.v-icon {
  position: fixed;
  bottom: 52px;
  right: 20px;
  cursor: pointer;
}
</style>
