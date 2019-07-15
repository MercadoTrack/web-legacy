<template>
  <div class="wizard">
    <v-dialog v-model="dialog" width="550" persistent no-click-animation>
      <v-card>
        <v-toolbar height="40px" dark color="primary">
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-stepper v-model="step" vertical>
          <v-stepper-step class="pointer" :complete="step > 1" step="1" @click="step = 1">¡Bienvenido!</v-stepper-step>

          <v-stepper-content step="1">
            <p>En nuestra plataforma vas a poder acceder, en tiempo real, a los cambios en los precios de las publicaciones de MercadoLibre.</p>
            <p>La información del sitio es actualizada constantemente para que puedas identificar cual es la mejor oferta para vos.</p>
            <p class="font-weight-bold">Es importante que sepas que MercadoTrack no esta relacionado de ninguna manera con MercadoLibre. Somos un grupo independiente, la información que vas a encontrar en nuestro sitio es obtenida mediante la API pública de MercadoLibre.</p>
            <v-btn color="primary" @click="step = 2">¿Cómo se usa?</v-btn>
            <v-btn color="primary" @click="seeLater">Ver mas tarde</v-btn>
          </v-stepper-content>

          <v-stepper-step class="pointer" :complete="step > 2" step="2" @click="step = 2">Buscar un artículo</v-stepper-step>

          <v-stepper-content step="2">
            <p>Podés buscar por palabra clave o navegar entre las categorías disponibles.</p>
            <v-img class="mb-2" :src="images.categories"></v-img>
            <v-divider class="mb-3" />
            <p>Si te interesa un artículo de MercadoLibre en particular, también podes copiar y pegar su link en nuestra barra de búsqueda y presionar ´enter´.</p>
            <v-img class="mb-2" :src="images.searchByLink"></v-img>
            <v-divider class="mb-3" />
            <p>Y esto te llevará directamente a la página del artículo en donde vas a encontrar su información y precios históricos.</p>
            <v-img class="mb-2" :src="images.articleView"></v-img>
            <v-divider class="mb-3" />
            <v-btn color="primary" @click="step = 3">Continuar</v-btn>
            <v-btn flat @click="step = 1">Volver</v-btn>
          </v-stepper-content>

          <v-stepper-step class="pointer" :complete="step > 3" step="3" @click="step = 3">Favoritos</v-stepper-step>

          <v-stepper-content step="3">
            <p>Podés clickear el corazón junto al título de cada artículo para guardarlo entre tus favoritos, en caso de que quieras consultarlo luego.</p>
            <p>¡Importante! Recordá que para hacerlo tendrás que iniciar sesión.</p>
            <v-img class="mb-2" :src="images.favoriteIcon"></v-img>
            <v-divider class="mb-3" />
            <p>Si ya estás registrado e iniciaste sesión, podrás acceder y editar todos tus favoritos desde <router-link to="/favoritos" target="_blank">Mi Cuenta > Favoritos</router-link></p>
            <v-img class="mb-2" :src="images.favoritesView"></v-img>
            <v-divider class="mb-3" />
            <v-btn color="primary" @click="step = 4">Continuar</v-btn>
            <v-btn flat @click="step = 2">Volver</v-btn>
          </v-stepper-content>

          <v-stepper-step class="pointer" step="4" @click="step = 4">¡Danos tu opinión!</v-stepper-step>
          <v-stepper-content step="4">
            <p>MercadoTrack esta mejorando constantemente, por eso necesitamos tu feedback!</p>
            <p>Si tenes alguna duda o sugerencia, comunicate con nosotros:</p>
            <p>
              <a href="https://twitter.com/MercadoTrack" target="_blank">
                <v-icon dark class="ml-1 pointer social tw" />
              </a>
              <a href="mailto:mercadotrack@gmail.com" class="mx-3" target="_blank">
                <v-icon color="primary" size="2rem">mail</v-icon>
              </a>
            </p>
            <v-img class="mb-3" src=""></v-img>
            <v-btn color="primary" @click="hide">¡Estoy listo!</v-btn>
            <v-btn flat @click="step = 3">Volver</v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import * as images from '../assets/wizard'

export default {
  name: 'wizard',
  data: () => ({
    images,
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

.social {
  height: 2rem;
  width: 2rem;
}
</style>
