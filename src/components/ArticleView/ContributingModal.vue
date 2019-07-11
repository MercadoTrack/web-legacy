<template>
  <v-dialog
    v-model="dialog"
    max-width="350"
    :persistent="!isAuthenticated"
  >
    <v-card v-if="isAuthenticated">
      <v-card-title class="headline font-weight-medium">¡Nuevo artículo trackeado!</v-card-title>
      <v-card-text>
        <p>Hasta el momento no teníamos este artículo en nuestra base de datos, pero ahora gracias a vos comenzamos a trackearlo.</p>
        <p class="mt-4 mb-1">¡Gracias por ayudar a la comunidad! 🎉</p>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat="flat" @click="dialog = false">
          Continuar
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-title class="headline">Todavía no estamos trackeando este artículo</v-card-title>
      <v-card-text>
        Para que agreguemos este artículo a nuestra base de datos y empezar a trackearlo te pedimos que inicies sesión.
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat to="/">Ir al Inicio</v-btn>
        <v-btn color="primary" flat="flat" @click="login()">
          Iniciar sesion
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { login } from '../../utils/auth'

export default {
  name: 'ContributingModal',
  props: {
    show: {
      type: Boolean,
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'auth/isAuthenticated'
    }),
    dialog: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('update:show', val)
      }
    },
  },
  methods: {
    login () { // why isn't `login,` working!?
      login()
    },
  }
}
</script>
