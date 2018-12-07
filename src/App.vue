<template>
  <v-app>
    <router-view/>
    <v-footer app class="px-4">
      <v-spacer></v-spacer>
      <span>MercadoTrack &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<style lang="scss">

html,
body,
#app {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

</style>
