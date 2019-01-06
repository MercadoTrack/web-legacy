<template>
  <v-content class="home full-height">
    <v-container justify-start>
      <v-layout column justify-start wrap>
        <v-flex xs12>
          <img src="../assets/mtrack_promo.svg" alt="">
        </v-flex>
        <v-flex xs12>
          <v-text-field
            solo
            hide-details
            v-model="searchText"
            label="Buscar o pegar link"
            clearable
            append-icon="search"></v-text-field>
          <div class="mt-1 text-xs-right">
            <router-link to="/navegar" class="subheading pointer accent--text">Ver todos</router-link>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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
$magic-number: 685px;
.home {
  background-color: #fde500; // TODO: create variables file
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.layout {
  padding: 50px 20% 0 20%;
}
@media screen and (max-height: $magic-number) {
  .layout {
    padding: 0;
    justify-content: center;
    align-items: center;
    .flex {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
