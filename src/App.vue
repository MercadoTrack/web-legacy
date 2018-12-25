<template>
  <v-app>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-title><router-link to="/">MercadoTrack</router-link></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer app fixed class="px-4">
      <v-spacer></v-spacer>
      <span>MercadoTrack &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<style lang="css">
html,
body,
#app {
  overflow: hidden;
}

.v-content__wrap {
  height: calc(100vh - 100px);
  overflow: auto;
}

.router-link-active {
  text-decoration: none;
  color: inherit;
}

</style>
