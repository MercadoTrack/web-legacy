<template>
  <v-list class="font-weight-light">
    <v-list-tile disabled active-class="selected">
      <v-list-tile-action>
        <!-- color="orange darken-2" -->
        <v-icon color="gray">whatshot</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title class="subheading text-capitalize">Ofertas</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile disabled active-class="selected">
      <v-list-tile-action>
        <!-- color="secondary darken-1" -->
        <v-icon color="gray">notifications</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title class="subheading text-capitalize">Notificaciones</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile disabled active-class="selected">
      <v-list-tile-action>
        <!-- color="cyan darken-4" -->
        <v-icon color="gray">verified_user</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title class="subheading text-capitalize">Vendedores destacados</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile to="/stats" active-class="selected">
      <v-list-tile-action>
        <v-icon color="primary">sync</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title class="subheading text-capitalize">Sincronizacion en vivo</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile to="/favoritos" active-class="selected">
      <v-list-tile-action>
        <v-icon color="red darken-2">favorite</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title class="subheading text-capitalize">Favoritos</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-list-tile disabled active-class="selected">
      <v-list-tile-action>
        <!-- color="indigo darken-2" -->
        <v-icon color="gray">person</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title class="subheading text-capitalize">Mi cuenta</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </v-list>
</template>

<style lang="scss" scoped>
.selected .subheading {
  font-weight: 400;
}
.subheading {
  font-weight: 300;
}
</style>
