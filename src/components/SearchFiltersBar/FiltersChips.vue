<template>
  <div>
    <v-chip close>
      <span>{{ 5000 | priceFilter }}</span>
      <span class="mx-1">-</span>
      <span>{{ 10000 | priceFilter }}</span>
    </v-chip>
    <v-chip close>Nuevo</v-chip>
    <v-chip close>Vendedor Confiable</v-chip>
  </div>
</template>

<script>
export default {
  props: ['filters']
}
</script>
