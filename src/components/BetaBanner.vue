<template>
  <div class="banner py-3">
    <v-container class="py-0 px-2" fill-height dark>
      <h3 class="body-2 white--text font-weight-light px-4">
        <span>Estás usando la versión beta de MercadoTrack, si tenés comentarios, dudas o sugerencias podés</span>
        <a href="https://twitter.com/MercadoTrack" class="mx-1 send-message" target="_blank">enviarnos un mensaje</a>
        <v-icon dark class="ml-1 pointer tw" />
      </h3>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'banner',
}
</script>

<style lang="scss" scoped>
.banner {
  position: fixed;
  z-index: 1;
  width: 100%;
  background-color: var(--v-primary-base);
  box-shadow:0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
  top: 56px;
  @media only screen and (min-width: 960px) {
    top: 104px;
  }
}
.send-message {
  color: white;
  cursor: pointer;
  text-decoration: underline;
}
.tw {
  height: 1.25rem;
  width: 1.25rem;
  background-image: url('../assets/twitter_light.svg');
}
</style>
