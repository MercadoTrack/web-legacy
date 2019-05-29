<template>
  <v-content>
    <v-container>
      <v-progress-linear :indeterminate="true"></v-progress-linear>
    </v-container>
  </v-content>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  name: 'Callback',
  methods: {
    ...mapActions({
      parseLogin: 'auth/parseLogin',
      parseLogout: 'auth/parseLogout',
    }),
    ...mapMutations({
      welcome: 'snackbar/welcome',
    })
  },
  async mounted () {
    const { action } = this.$route.params
    try {
      if (action === 'login') {
        const user = await this.parseLogin()
        this.welcome(user)
      } else if (action === 'logout') {
        this.parseLogout()
      }
      const { returnTo } = this.$route.query
      this.$router.push(returnTo || '/')
    } catch (err) {
      // maybe show an error
      this.$router.push('/')
    }
  }
}
</script>
