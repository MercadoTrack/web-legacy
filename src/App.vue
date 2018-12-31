<template>
  <v-app>
    <ToolBar v-if="!isHome" />
    <router-view/>
    <Footer v-if="!isHome" />
  </v-app>
</template>

<script>
import Footer from './components/Footer.vue'
import ToolBar from './components/ToolBar.vue'

export default {
  name: 'app',
  components: { Footer, ToolBar },
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
  height: calc(100vh - 100px); /* 100px header & footer */
  overflow: auto;
}

.router-link-active {
  text-decoration: none;
  color: inherit;
}

.pointer {
  cursor: pointer;
}

.text-right {
  text-align: right;
}

</style>
