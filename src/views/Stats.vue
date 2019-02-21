<template>
  <v-content>
    <v-container>
      <v-layout wrap justify-center>
        <v-progress-circular v-if="false" color="info" indeterminate></v-progress-circular>
        <v-flex v-else xs12>
          <v-progress-linear color="info" height="10" :value="percentage"></v-progress-linear>
          <v-layout wrap justify-center>
            <h1 class="subheading">
              <span class="font-weight-black">{{ processed }}</span> Articles processed of
              <span class="font-weight-black">{{ total }}</span> total
            </h1>
            <v-flex xs12>
              <v-divider class="my-4"></v-divider>
              <v-card>
                <v-card-title><h4>Progress</h4></v-card-title>
                <v-divider></v-divider>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-content>Time Running:</v-list-tile-content>
                    <v-list-tile-content class="align-end text-xs-right">{{ timeRunning }} minutes</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Estimated Time of Completion:</v-list-tile-content>
                    <v-list-tile-content class="align-end text-xs-right">~{{ etc }} minutes</v-list-tile-content>
                  </v-list-tile>
                  <div class="px-2">
                    <v-treeview :items="errorsTree">
                      <template slot="prepend" slot-scope="{ item }" leaf>
                        <v-icon v-if="!item.children">error</v-icon>
                      </template>
                    </v-treeview>
                  </div>
                </v-list>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import http from '../http'

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
  mounted () {
    this.interval = setInterval(() => {
      http.get('/sync').then(({ data }) => {
        const [ , processed, total ] = data.progress.progress.match(/(\d+)\/(\d+)/)
        this.percentage = +processed * 100 / +total
        this.total = new Intl.NumberFormat('de-DE').format(+total)
        this.processed = new Intl.NumberFormat('de-DE').format(+processed)
        this.etc = data.progress.etc
        this.timeRunning = data.progress.timeRunning
        this.errorsCount = data.progress.errorsCount
        this.errors = data.progress.errors
        this.errorsTree = [{
          name: `Errors (${this.errors.length})`,
          children: this.errors.reduce((acc, error) => [...acc, { name: error }], [])
        }]
      })
    }, 1000)
  },
  destroyed () {
    clearInterval(this.interval)
  }
}
</script>
