<template>
  <canvas id="myChart" width="200" height="200"></canvas>
</template>

<script>
import Chart from 'chart.js'

export default {
  data: () => ({
    chart: null,
  }),
  mounted () {
    const ctx = document.getElementById('myChart').getContext('2d')
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['10/03', '20/03', '25/03', '28/03', '30/03'],
        datasets: [{
          label: 'Precio',
          data: [ 3.900, 3.950, 4.200, 4.500, 4.550 ],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        elements: {
          line: {
            tension: 0
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              min: 3.000,
              stepSize: 1.000,
              beginAtZero: false,
            }
          }]
        }
      }
    })
  }
}
</script>
