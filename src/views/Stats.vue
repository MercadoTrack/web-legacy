<template>
  <v-content>
    <v-container>
      <v-layout wrap justify-center>
        <v-fade-transition mode="out-in" tag="div" class="flex xs12">
          <v-flex v-if="etc" xs12>
            <div class="px-2 mt-3 mb-5">
              <p class="subheading mb-3">
                Para poder mostrarte siempre los precios actualizados de los
                productos trackeados, nuestro proceso de sincronización se está
                ejecutando las <b>24Hs</b> del día de manera constante,
                chequeando cada variación de precio que los vendedores hagan en
                MercadoLibre.
              </p>
              <p class="subheading mb-0">
                Para ello utilizamos las APIs <b>públicas</b> de MercadoLibre.
                De esta forma te garantizamos que nuestra fuente de información
                es <b>confiable</b> y <b>transparente</b>.
              </p>
            </div>
            <v-layout wrap justify-center align-center>
              <v-progress-circular
                :rotate="-90"
                :size="170"
                :width="20"
                color="primary darken-2"
                height="10"
                :value="percentage"
                ><span class="font-weight-black">{{ percentage }} %</span>
              </v-progress-circular>
              <div class="mx-4 mt-3">
                <p class="subheading mb-1">
                  <span class="font-weight-black mr-2">{{ processed }}</span>
                  <span>artículos actualizados</span>
                </p>
                <p class="subheading mb-0">
                  <span class="font-weight-black mr-2">{{ pending }}</span>
                  <span>artículos pendientes</span>
                </p>
                <v-divider class="my-2"></v-divider>
                <p class="subheading">
                  <span class="font-weight-black mr-2">{{ total }}</span>
                  <span>artículos totales</span>
                </p>
              </div>
              <v-flex xs12>
                <v-divider class="my-4"></v-divider>
              </v-flex>
              <v-flex xs12 class="mt-2">
                <v-card flat>
                  <v-card-title
                    ><h4>Proceso de sincronización</h4></v-card-title
                  >
                  <v-divider></v-divider>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-content
                        >Total procesado:</v-list-tile-content
                      >
                      <v-list-tile-content class="align-end text-xs-right"
                        >{{ percentage }} %</v-list-tile-content
                      >
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content
                        >Tiempo corriendo:</v-list-tile-content
                      >
                      <v-list-tile-content class="align-end text-xs-right">{{
                        timeRunning | minutesToTime
                      }}</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content
                        >Tiempo estimado para terminar:</v-list-tile-content
                      >
                      <v-list-tile-content class="align-end text-xs-right">{{
                        etc | minutesToTime
                      }}</v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-card>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-fade-transition>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import api from '../api'

export default {
  name: 'stat',
  data: () => ({
    total: 0,
    processed: 0,
    errorsCount: 0,
    errors: [],
    errorsTree: [],
    etc: null,
    timeRunning: 0,
    percentage: 0,
    interval: null,
  }),
  metaInfo: {
    title: 'Sincronizacion en MarketTrack',
  },
  methods: {
    getSync() {
      return api.getSyncStatus().then(({ data }) => {
        const [, processed, total] = data.progress.progress.match(
          /(\d+)\/(\d+)/
        )
        this.percentage = new Intl.NumberFormat('de-DE').format(
          ((+processed * 100) / +total).toFixed(2)
        )
        this.total = new Intl.NumberFormat('de-DE').format(+total)
        this.processed = new Intl.NumberFormat('de-DE').format(+processed)
        this.pending = new Intl.NumberFormat('de-DE').format(
          +total - +processed
        )
        this.etc = data.progress.etc
        this.timeRunning = Math.floor(data.progress.timeRunning)
        this.errorsCount = data.progress.errorsCount
        this.errors = data.progress.errors
        this.errorsTree = [
          {
            name: `Errores (${this.errors.length})`,
            children: this.errors.reduce(
              (acc, error) => [...acc, { name: error }],
              []
            ),
          },
        ]
      })
    },
  },
  filters: {
    minutesToTime: totalTime => {
      const hours = Math.floor(totalTime / 60)
      const minutes = totalTime % 60
      let text = ''
      if (hours) text += `${hours} hora${hours > 1 ? 's' : ''}`
      if (minutes) {
        if (hours) text += ', '
        text += `${minutes} minutos`
      }
      return text
    },
  },
  mounted() {
    this.getSync()
    this.interval = setInterval(() => this.getSync(), 4000)
  },
  destroyed() {
    clearInterval(this.interval)
  },
}
</script>
