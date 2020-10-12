<template>
  <v-footer app fixed class="px-4">
    <a href="https://twitter.com/MercadoTrack" target="_blank">
      <span class="mx-2">Twitter</span>
    </a>
    <a href="https://www.instagram.com/mercadotrack/" target="_blank">
      <span class="mx-2">Instagram</span>
    </a>
    <a href="mailto:mercadotrack@gmail.com" target="_blank">
      <span class="mx-2">Email</span>
    </a>
    <v-spacer></v-spacer>
    <span class="mx-4" to="/terms-of-use" target="_blank">Términos y condiciones de uso</span>
    <span>MercadoTrack &copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>
