<template>
  <div class="home">
    <v-layout class="bg">
      <v-flex align-self-center offset-sm2 sm8 offset-xs1 xs10 class="inner">
        <v-text-field
          solo
          hide-details
          v-model="searchText"
          label="Buscar o pegar link"
          clearable
          append-icon="search"></v-text-field>
        <div class="mt-1 text-right">
          <router-link to="/navegar" class="subheading pointer accent--text">Ver todos</router-link>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'home',
  data: () => ({
    searchText: ''
  })
}
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: #fde500; // TODO: create variables file
}
.bg {
  height: 100%;
  width: 100%;
  max-width: 768px;
  margin: auto;
  background: url("../assets/mtrack_promo.svg") no-repeat;
  background-position: 0 100px;
}
.inner {
  padding-top: 200px;
}
</style>
