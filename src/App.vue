<template>
  <v-app>
    <v-toolbar v-if="!isHome" app fixed clipped-left>
      <v-toolbar-title><router-link to="/">MercadoTrack</router-link></v-toolbar-title>
    </v-toolbar>
    <router-view/>
    <Footer v-if="!isHome" />
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue'

export default {
  name: 'app',
  components: { Footer },
  computed: {
    isHome () { return this.$store.getters.isHome }
  }
}
</script>

<style lang="css">
html,
body,
#app {
  overflow: hidden;
}

.application--wrap > .v-content .v-content__wrap {
  height: calc(100vh - 100px);
  overflow: auto;
}

.router-link-active {
  text-decoration: none;
  color: inherit;
}

</style>
