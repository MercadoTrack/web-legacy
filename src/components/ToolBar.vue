<template>
  <v-toolbar app fixed clipped-left color="secondary" class="px-5">
    <v-toolbar-title>
      <router-link to="/" tag="div" class="brand pointer"></router-link>
    </v-toolbar-title>
  </v-toolbar>
</template>

<style scoped>
.brand {
  height: 64px;
  width: 64px;
  background-image: url('../assets/mtrack_icon.svg');
}
</style>
