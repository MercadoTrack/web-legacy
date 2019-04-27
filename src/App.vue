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
  },
  mounted () {
    this.$store.dispatch('meta/getBase')
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  overflow: auto;
  height: 100vh;
}

.router-link-active {
  text-decoration: none;
  color: inherit;
}

.pointer {
  cursor: pointer;
}

.strike-through {
  text-decoration: line-through;
}

.v-treeview-node__label {
  font-size: 16px;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

</style>
