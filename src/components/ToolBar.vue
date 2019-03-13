<template>
  <v-toolbar extended app fixed clipped-left color="secondary" :class="{'pa-0': $vuetify.breakpoint.smAndDown, 't-pa': $vuetify.breakpoint.mdAndUp}">
    
    <v-toolbar-title>
      <router-link to="/" tag="div" class="brand-wrapper pointer">
        <div class="brand"></div>
      </router-link>
    </v-toolbar-title>

    <v-flex offset-xs1 xs9 offset-sm1 sm9 md6 lg6 xl6>
      <v-text-field
        append-icon="search"
        class="mt-2 mx-0"
        :class="{'mt-3': $vuetify.breakpoint.smAndDown}"
        label="Buscar"
        solo
      ></v-text-field>
    </v-flex>

    <template slot="extension">
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat :icon="$vuetify.breakpoint.smAndDown"><v-icon class="mr-1 hidden-md-and-up">whatshot</v-icon><span class="hidden-sm-and-down font-weight-light">Ofertas</span></v-btn>
        <v-btn flat :icon="$vuetify.breakpoint.smAndDown"><v-icon class="mr-1 hidden-md-and-up">star</v-icon><span class="hidden-sm-and-down font-weight-light">Favoritos</span></v-btn>
        <v-btn flat :icon="$vuetify.breakpoint.smAndDown"><v-icon class="mr-1 hidden-md-and-up">person</v-icon><span class="hidden-sm-and-down font-weight-light">Mi cuenta</span></v-btn>
      </v-toolbar-items>
    </template>
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

.t-pa {
  padding: 0rem 15rem 0rem 15rem!important;
}
</style>
