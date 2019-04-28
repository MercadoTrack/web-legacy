<template>
  <canvas id="myChart" width="auto" height="auto"></canvas>
</template>

<script>
import Chart from 'chart.js'

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
    console.log(this.$vuetify.theme)
    const ctx = document.getElementById('myChart').getContext('2d')
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.history.map(({ date }) => date.slice(0, 5)),
        datasets: [{
          label: 'Precio',
          data: this.history.map(({ price }) => price),
          // backgroundColor: this.$vuetify.theme.secondary,
          borderColor: this.$vuetify.theme.primary,
          backgroundColor: this.$vuetify.theme.primary,
          borderWidth: 1
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
