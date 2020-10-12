<template>
  <v-footer app fixed class="px-4">
    <a href="https://twitter.com/MercadoTrack" target="_blank">
      <span class="mx-1">Twitter</span>
    </a>
    <a href="https://www.instagram.com/mercadotrack/" target="_blank">
      <span class="mx-1">Instagram</span>
    </a>
    <a href="mailto:mercadotrack@gmail.com" target="_blank">
      <span class="mx-1">Email</span>
    </a>
    <v-spacer></v-spacer>
    <span class="mx-4">Términos y condiciones</span>
    <span>MercadoTrack &copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<style scoped>
.tw {
  height: 1.5rem;
  width: 1.5rem;
}
</style>
