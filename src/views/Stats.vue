<template>
  <v-content>
    <v-container>
      <v-layout wrap justify-center>
        <v-fade-transition mode="out-in" tag="div" class="flex xs12">
          <v-flex v-if="etc" xs12>
             <v-layout wrap justify-start align-center class="px-5 py-3">
               <h1 class="subheading px-5 py-3">
                  Para poder mostrarte siempre los precios actualizados de los productos trackeados nuestro sincronizador esta corriendo las <b>24Hs</b>, chequeando cada variacion de precio que los vendedores hagan en MercadoLibre.
                </h1>
                <h1 class="subheading px-5 py-3">
                  Para ello utilizamos las APIs publicas de MercadoLibre, esta informacion es <b>publica</b> y de esta forma te estamos garantizando que nuestra fuente de informacion es <b>confiable</b>.
                </h1>
             </v-layout>
            <v-layout wrap justify-center align-center>
              <v-progress-circular
                :rotate="-90"
                :size="170"
                :width="20"
                color="info darken-2"
                height="10"
                :value="percentage"><span class="font-weight-black">{{ percentage }} %</span>
              </v-progress-circular>
              <div class="px-4">
                <h1 class="subheading">
                  <span class="font-weight-black">{{ processed }}</span> artículos actualizados
                </h1>
                <h1 class="subheading">
                  <span class="font-weight-black">{{ pending }}</span> artículos restantes
                </h1>
              </div>
              <v-flex xs12>
                <v-divider class="my-4"></v-divider>
                <v-card>
                  <v-card-title><h4>Proceso de sincronización</h4></v-card-title>
                  <v-divider></v-divider>
                  <v-list>
                    <v-list-tile>
                      <v-list-tile-content>Total procesado:</v-list-tile-content>
                      <v-list-tile-content class="align-end text-xs-right">{{ percentage }} %</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Tiempo corriendo:</v-list-tile-content>
                      <v-list-tile-content class="align-end text-xs-right">{{ timeRunning }} minutos</v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>Tiempo estimado para terminar:</v-list-tile-content>
                      <v-list-tile-content class="align-end text-xs-right">aprox. {{ etc | minutesFilter }}</v-list-tile-content>
                    </v-list-tile>
                    <!-- <div class="px-3" :style="{ 'margin-left': errors.length ? '-6px' : '-30px' }">
                      <v-treeview :items="errorsTree">
                        <template slot="prepend" slot-scope="{ item }" leaf>
                          <v-icon v-if="!item.children">error</v-icon>
                        </template>
                      </v-treeview>
                    </div> -->
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
    interval: null
  }),
  metaInfo: {
    title: 'Sincronizacion en MercadoTrack'
  },
  methods: {
    getSync () {
      return api.getSyncStatus().then(({ data }) => {
        const [ , processed, total ] = data.progress.progress.match(/(\d+)\/(\d+)/)
        this.percentage = new Intl.NumberFormat('de-DE').format((+processed * 100 / +total).toFixed(2))
        this.total = new Intl.NumberFormat('de-DE').format(+total)
        this.processed = new Intl.NumberFormat('de-DE').format(+processed)
        this.pending = new Intl.NumberFormat('de-DE').format(+total - +processed);
        this.etc = data.progress.etc
        this.timeRunning = data.progress.timeRunning
        this.errorsCount = data.progress.errorsCount
        this.errors = data.progress.errors
        this.errorsTree = [{
          name: `Errores (${this.errors.length})`,
          children: this.errors.reduce((acc, error) => [...acc, { name: error }], [])
        }]
      })
    }
  },
  mounted () {
    this.getSync()
    this.interval = setInterval(() => this.getSync(), 4000)
  },
  destroyed () {
    clearInterval(this.interval)
  }
}
</script>
