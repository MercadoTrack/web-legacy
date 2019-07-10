<template>
  <v-dialog
    v-model="dialog"
    max-width="350"
    :persistent="!isAuthenticated"
  >
    <v-card v-if="isAuthenticated">
      <v-card-title class="headline">¡Nuevo artículo trackeado!</v-card-title>
      <v-card-text>
        Gracias a tu seguimiento del artículo, pudimos agregarlo a nuestra base de datos. Al hacer esto, no solo te beneficiás vos, sino a todos los interesados.
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
