<template>
  <v-content>
    <v-container>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </v-container>
  </v-content>
</template>

<script>
import { logoutCallback } from '../utils/auth'

export default {
  name: 'Callback',
  mounted () {
    const { returnTo } = this.$route.query
    logoutCallback(returnTo || '/')
  }
}
</script>
