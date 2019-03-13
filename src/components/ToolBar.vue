<template>
  <v-toolbar app fixed clipped-left color="secondary">
    <v-toolbar-title>
      <router-link to="/" tag="div" class="brand-wrapper pointer">
        <div class="brand"></div>
      </router-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn flat disabled><v-icon class="mr-1 hidden-sm-and-up">whatshot</v-icon><span class="hidden-xs-only font-weight-light">Ofertas</span></v-btn>
      <v-btn flat disabled><v-icon class="mr-1 hidden-sm-and-up">star</v-icon><span class="hidden-xs-only font-weight-light">Favoritos</span></v-btn>
      <v-btn flat disabled><v-icon class="mr-1 hidden-sm-and-up">person</v-icon><span class="hidden-xs-only font-weight-light">Mi cuenta</span></v-btn>
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

.v-btn {
  text-transform: none;
}

span {
  font-size: 16px;
}
</style>
