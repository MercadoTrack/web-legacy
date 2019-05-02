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
import { ToolBar } from './components/ToolBar'

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
html {
  overflow-y: auto // vuetify FAQ - https://bit.ly/2vvHSnJ
}

a {
  text-decoration: none;
}

figure {
  margin: 0;
}

// needs to be global
// ref to ToolBar.vue
.v-toolbar__content {
  .v-input {
    min-height: 40px;
    .v-input__control {
      min-height: 40px;
    }
  }
}

.container {
  @media only screen and (min-width: 1900px) {
    max-width: 1185px;
  }
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
