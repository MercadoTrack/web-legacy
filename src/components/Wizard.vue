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
          <v-stepper-step :complete="step > 1" step="1">¡Bienvenido!</v-stepper-step>

          <v-stepper-content step="1">
            <p>En nuestra plataforma vas a poder acceder, en tiempo real, a los cambios en los precios de las publicaciones de MercadoLibre.</p>
            <p>
              La información del sitio es
              <router-link to="/stats">actualizada constantemente</router-link> para que puedas identificar cual es la mejor oferta para vos.
            </p>
            <v-btn color="primary" @click="step = 2">¿Cómo se usa?</v-btn>
            <v-btn color="primary" @click="seeLater">Ver mas tarde</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2">Buscar un artículo</v-stepper-step>

          <v-stepper-content step="2">
            <p>Podés navegar y buscar por palabra clave o navegar entre las categorías disponibles.</p>
            <v-img src="" aspect-ratio="2"></v-img>
            <p>Si te interesa un artículo de MercadoLibre en particular, también podes copiar y pegar su link en nuestra barra de búsqueda y presionar ´enter´.</p>
            <v-img src="" aspect-ratio="2"></v-img>
            <p>Y esto te llevará directamente a la página del artículo en donde vas a encontrar su información y precios históricos.</p>
            <v-img src="" aspect-ratio="2"></v-img>
            <v-btn color="primary" @click="step = 3">Continuar</v-btn>
            <v-btn flat @click="step = 1">Volver</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 3" step="3">Favoritos</v-stepper-step>

          <v-stepper-content step="3">
            <p>Podés clickear el ícono de corazón junto al título de cada artículo para guardarlo en caso de que quieras consultarlo luego.</p>
            <p>¡Importante! Recordá que para hacerlo tendrás que iniciar sesión.</p>
            <v-img src="" aspect-ratio="2"></v-img>
            <p>Si ya estás registrado e iniciaste sesión, podrás acceder y editar todos tus favoritos desde <router-link to="/favoritos" target="_blank">Mi Cuenta > Favoritos</router-link></p>
            <v-img src="" aspect-ratio="2"></v-img>
            <v-btn color="primary" @click="step = 4">Continuar</v-btn>
            <v-btn flat @click="step = 2">Volver</v-btn>
          </v-stepper-content>

          <v-stepper-step step="4">Compartí</v-stepper-step>
          <v-stepper-content step="4">
            <v-img src="" aspect-ratio="2"></v-img>
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
