<template>
  <v-app>
    <Intro v-if="showIntro" :dismiss="dismissIntro"/>
    <template v-else>
      <ToolBar />
      <router-view/>
      <Footer />
    </template>
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Intro from './views/Intro'
import Footer from './components/Footer'
import ToolBar from './components/ToolBar'

export default {
  name: 'app',
  components: { Intro, Footer, ToolBar },
  mounted () {
    this.$store.dispatch('meta/getBase')
  },
  computed: {
    ...mapGetters({
      showIntro: 'intro/show',
    })
  },
  methods: {
    ...mapMutations({
      dismissIntro: 'intro/dismiss',
    })
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

a {
  text-decoration: none;
}

figure {
  margin: 0;
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
