<template>
  <v-footer app fixed class="px-4">
    <a href="https://twitter.com/MercadoTrack" target="_blank">
      <span class="mx-2" v-if="$vuetify.breakpoint.smAndUp">Twitter</span>
      <v-btn v-else icon flat color="primary" class="ma-2 no-hover">
        <v-icon class="social tw"></v-icon>
      </v-btn>
    </a>
    <a href="https://www.instagram.com/mercadotrack/" target="_blank">
      <span class="mx-2" v-if="$vuetify.breakpoint.smAndUp">Instagram</span>
      <v-btn v-else icon flat color="primary" class="ma-2 no-hover">
        <v-icon class="social ig"></v-icon>
      </v-btn>
    </a>
    <a href="mailto:mercadotrack@gmail.com" target="_blank">
      <span class="mx-2" v-if="$vuetify.breakpoint.smAndUp">Email</span>
      <v-btn v-else icon flat color="primary" class="ma-2 no-hover">
        <v-icon medium>mail</v-icon>
      </v-btn>
    </a>
    <v-spacer></v-spacer>
    <router-link to="/terms" target="_blank">
      <span class="mx-4" v-if="$vuetify.breakpoint.smAndUp"
        >Términos y condiciones de uso</span
      >
    </router-link>
    <span>MercadoTrack &copy; {{ new Date().getFullYear() }} Argentina</span>
  </v-footer>
</template>

<style lang="scss" scoped>
.social {
  height: 1.75rem;
  width: 1.75rem;
}
.tw {
  background-image: url('../assets/twitter-icon.svg');
}
.ig {
  background-image: url('../assets/instagram-icon.svg');
}
</style>
