<template>
  <div>
    <v-dialog
      v-model="dialog"
      width="500"
      persistent
      no-click-animation
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-spacer></v-spacer>
          <v-btn icon dark @click="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-stepper v-model="step" vertical>
          <v-stepper-step :complete="step > 1" step="1">
            Bienvenido a MercadoTrack
          </v-stepper-step>

          <v-stepper-content step="1">
            <p>Descripcion de quienes somos y por que hacemos lo que hacemos.</p>
            <v-btn color="primary" @click="step = 2">Continuar</v-btn>
            <v-btn color="primary" @click="seeLater">Ver mas tarde</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2">Configure analytics for this app</v-stepper-step>

          <v-stepper-content step="2">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click="step = 3">Continuar</v-btn>
            <v-btn flat @click="step = 1">Volver</v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

          <v-stepper-content step="3">
            <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
            <v-btn color="primary" @click="step = 4">Continuar</v-btn>
            <v-btn flat @click="step = 2">Volver</v-btn>
          </v-stepper-content>

          <v-stepper-step step="4">View setup instructions</v-stepper-step>
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
    step: null,
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
    },
  },
  methods: {
    ...mapMutations({
      seeLater: 'wizard/seeLater',
      hide: 'wizard/hide',
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
