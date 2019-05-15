<template>
  <v-app>
    <ToolBar />
    <router-view/>
    <Footer />
  </v-app>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Footer from './components/Footer'
import { ToolBar } from './components/ToolBar'

export default {
  name: 'app',
  components: { Footer, ToolBar },
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
