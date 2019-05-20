<template>
  <v-app>
    <ToolBar />
    <LoadingMeta v-if="shouldShowLoading && !shouldShowIntro" />
    <router-view v-else />
    <Footer />
    <Snackbar />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Footer from './components/Footer'
import { ToolBar } from './components/ToolBar'
import LoadingMeta from './views/LoadingMeta'
import Snackbar from './components/Snackbar'

export default {
  name: 'app',
  components: { Footer, ToolBar, LoadingMeta, Snackbar },
  computed: {
    ...mapGetters({
      isLoadingMeta: 'meta/isLoading',
      showIntro: 'intro/show',
    }),
    shouldShowLoading () {
      // only showing loading spinner for meta when we're in the landing
      return this.isLoadingMeta && this.$route.name === 'landing'
    },
    shouldShowIntro () {
      const routesToShowIntro = [ 'landing', 'category' ]
      return this.showIntro && routesToShowIntro.includes(this.$route.name)
    }
  },
  mounted () {
    this.$store.dispatch('meta/getBase')
  },
}
</script>

<style lang="scss">
html {
  overflow-y: auto; // vuetify FAQ - https://bit.ly/2vvHSnJ
}

#app {
  background-color: var(--v-background-base);
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
