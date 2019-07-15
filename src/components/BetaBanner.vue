<template>
  <div class="banner py-3">
    <v-container class="py-0 px-2" fill-height dark>
      <v-layout class="px-4">
        <h3 class="body-2 white--text font-weight-light pr-3">
          <span>Estás usando la versión beta de MercadoTrack, si tenés comentarios, dudas o sugerencias podés enviarnos un mensaje</span>
          por
          <a href="https://twitter.com/MercadoTrack" target="_blank">
            <v-icon dark class="ml-1 pointer light social tw" />
          </a>
          o
          <a href="mailto:mercadotrack@gmail.com" class="mx-1" target="_blank">
            <v-icon color="white" size="1.5rem">mail</v-icon>
          </a>
        </h3>
        <v-btn v-if="$vuetify.breakpoint.smAndUp" flat small color="white" class="ml-auto my-auto" @click="close">cerrar</v-btn>
        <v-icon v-else color="white" class="ml-auto pointer" @click="close">close</v-icon>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'banner',
  methods: {
    close () {
      this.$emit('close')
    }
  },
}
</script>

<style lang="scss" scoped>
.banner {
  position: fixed;
  z-index: 2;
  width: 100%;
  background-color: var(--v-primary-base);
  box-shadow:0 2px 4px -1px rgba(0,0,0,.2), 0 4px 5px 0 rgba(0,0,0,.14), 0 1px 10px 0 rgba(0,0,0,.12);
  top: 56px;
  @media only screen and (min-width: 960px) {
    top: 104px;
  }
}
.tw {
  height: 1.5rem;
  width: 1.5rem;
}
</style>
