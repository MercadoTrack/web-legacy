<template>
  <div class="wizard">
    <v-dialog v-model="dialog" width="500" persistent no-click-animation>
      <v-card>
        <v-toolbar dark color="primary">
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-stepper v-model="step" vertical>
          <v-stepper-step :complete="step > 1" step="1">Bienvenido a MercadoTrack</v-stepper-step>

          <v-stepper-content step="1">
            <p>En nuestra plataforma vas a poder acceder, en tiempo real, a los cambios de precio de las publicaciones de MercadoLibre.</p>
            <p>
              La información del sitio esta siendo
              <router-link to="/stats">actualizada constantemente</router-link> para que puedas identificar cual es la mejor oferta para vos.
            </p>
            <v-btn color="primary" @click="step = 2">¿Cómo se usa?</v-btn>
            <v-btn color="primary" @click="seeLater">Ver mas tarde</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2">Buscar un artículo</v-stepper-step>

          <v-stepper-content step="2">
            <p>Si ya viste en MercadoLibre algo que te interesa podés pegar el link en la barra de búsqueda y presionar ´enter´.</p>
            <p>Esto te va a llevar a la página del artículo en donde vas a encontrar su información y los precios históricos del mismo.</p>
            <v-card color="grey lighten-1" class="mb-3" height="200px"></v-card>
            <p>Si no también podés navegar y buscar por palabra clave o categoría. En este caso te vamos a mostrar todos los resultados que coinciden con tu búsqueda para que puedas mirar el artículo que te interese.</p>
            <v-btn color="primary" @click="step = 3">Continuar</v-btn>
            <v-btn flat @click="step = 1">Volver</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 3" step="3">Favoritos</v-stepper-step>

          <v-stepper-content step="3">
            <p>Si querés guardar algún artículo para consultarlo más tarde podés hacer click en el corazón al lado del titulo.</p>
            <v-card color="grey lighten-1" class="mb-3" height="200px"></v-card>
            <p>Pero recordá que para hacerlo vas a tener que iniciar sesión.</p>
            <p>Si ya te registraste y guardaste un artículo, vas a poder acceder a todos ellos desde <router-link to="/favoritos" target="_blank">Mi Cuenta > Favoritos</router-link></p>
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click="step = 4">Continuar</v-btn>
            <v-btn flat @click="step = 2">Volver</v-btn>
          </v-stepper-content>

          <v-stepper-step step="4">Compartí</v-stepper-step>
          <v-stepper-content step="4">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click="hide">Estoy listo!</v-btn>
            <v-btn flat @click="step = 3">Volver</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'wizard',
  data: () => ({
    step: null
  }),
  computed: {
    ...mapGetters({
      show: 'wizard/show'
    }),
    dialog: {
      get () {
        return this.show
      },
      set (val) {
        this.$store.commit('wizard/hide')
      }
    }
  },
  methods: {
    ...mapMutations({
      seeLater: 'wizard/seeLater',
      hide: 'wizard/hide'
    })
  }
}
</script>

<style lang="scss" scoped>
.wizard {
  z-index: 3;
}
</style>
