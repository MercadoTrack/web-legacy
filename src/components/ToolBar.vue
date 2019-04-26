<template>
  <v-toolbar extended app fixed clipped-left color="secondary" :class="{'pa-0': $vuetify.breakpoint.smAndDown, 't-pa': $vuetify.breakpoint.mdAndUp, 'order-5': true}">

    <v-flex xs1 sm1 md1 lg1 xl1>
      <v-toolbar-title>
        <router-link to="/" tag="div" class="brand-wrapper pointer">
          <div class="brand"></div>
        </router-link>
      </v-toolbar-title>
    </v-flex>

    <v-flex xs9 sm9 md6 lg6 xl6>
      <v-text-field
        append-icon="search"
        class="mt-2 mx-0 grey--text"
        :class="{'mt-3': $vuetify.breakpoint.smAndDown}"
        label="Buscar o pegar link"
        solo
      ></v-text-field>
    </v-flex>

    <template slot="extension">
      <v-overflow-btn
        class="mb-0 mt-2"
        :items="categories"
        label="Categorías"
      ></v-overflow-btn>
      <v-btn flat><span class="font-weight-light">Agregados recientemente</span></v-btn>
      <v-btn flat><span class="font-weight-light">Últimas ofertas</span></v-btn>
      <v-btn flat><span class="font-weight-light">Vendedores destacados</span></v-btn>
      <v-spacer></v-spacer>
      <v-btn flat :icon="$vuetify.breakpoint.smAndDown"><v-icon class="mr-1 hidden-md-and-up">whatshot</v-icon><span class="hidden-sm-and-down font-weight-light">Ofertas</span></v-btn>
      <v-btn flat :icon="$vuetify.breakpoint.smAndDown"><v-icon class="mr-1 hidden-md-and-up">history</v-icon><span class="hidden-sm-and-down font-weight-light">Historial</span></v-btn>
      <v-btn flat :icon="$vuetify.breakpoint.smAndDown"><v-icon class="mr-1 hidden-md-and-up">star</v-icon><span class="hidden-sm-and-down font-weight-light">Favoritos</span></v-btn>
      <v-btn flat :icon="$vuetify.breakpoint.smAndDown"><v-icon class="mr-1 hidden-md-and-up">person</v-icon><span class="hidden-sm-and-down font-weight-light">Mi cuenta</span></v-btn>
      <v-btn flat icon>
        <v-icon>notifications</v-icon>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
export default {
  data: () => ({
    categories: ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4'],
  })
}
</script>
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

.order-5 {
  z-index: 5;
}
</style>
