<template>
  <canvas id="myChart" width="auto" height="auto"></canvas>
</template>

<script>
import { format } from 'date-fns'
import Chart from 'chart.js'
import 'chartjs-plugin-trendline'

export default {
  data: () => ({
    chart: null,
  }),
  props: ['history'],
  /* 0:
    date: "09/03/2019"
    original_price: null
    price: 212
  */
  mounted () {
    const ctx = document.getElementById('myChart').getContext('2d')
    const lastSnapshot = this.history[this.history.length - 1]
    const todaySnapshot = {
      date: format(new Date(), 'DD/MM/YYYY'),
      fluctuation: 0,
      price: lastSnapshot.price
    }
    const history = lastSnapshot.date !== todaySnapshot.date
      ? [...this.history, todaySnapshot]
      : this.history
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: history.map(({ date }) => date.slice(0, 5)),
        datasets: [{
          label: 'Precio',
          data: history.map(({ price }) => price),
          borderColor: this.$vuetify.theme.primary,
          backgroundColor: this.$vuetify.theme.primary,
          borderWidth: 1,
          pointHitRadius: 17,
          trendlineLinear: {
            style: '#64aa64',
            lineStyle: 'dotted',
            width: 2
          }
        }]
      },
      options: {
        elements: {
          line: {
            tension: 0.15,
            fill: false,
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: false,
            }
          }]
        }
      }
    })
  }
}
</script>
