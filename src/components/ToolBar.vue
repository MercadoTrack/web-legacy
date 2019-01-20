<template>
  <v-toolbar app fixed clipped-left color="secondary">
    <v-toolbar-title>
      <router-link to="/" tag="div" class="brand-wrapper pointer">
        <div class="brand"></div>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat disabled><span class="hidden-xs-only">Ofertas</span> <v-icon class="ml-1">whatshot</v-icon></v-btn>
      <v-btn flat disabled><span class="hidden-xs-only">Favoritos</span> <v-icon class="ml-1">star</v-icon></v-btn>
      <v-btn flat disabled><span class="hidden-xs-only">Mi cuenta</span> <v-icon class="ml-1">person</v-icon></v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<style scoped>
.brand {
  background-image: url('../assets/mtrack_icon.svg');
  width: 100%;
  height: 100%;
}
.brand-wrapper {
  height: 64px;
  width: 64px;
  padding: 7px;
}
</style>
