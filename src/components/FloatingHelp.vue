<template>
  <v-icon dark size="50" color="primary" @click="showWizard">help</v-icon>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
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
