<template>
  <canvas id="myChart" width="auto" height="auto"></canvas>
</template>

<script>
import { format } from 'date-fns'
import Chart from 'chart.js'
import 'chartjs-plugin-trendline'
import _inflation from './inflation-mock.json'

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
    const [ firstSnapshot ] = this.history
    const lastSnapshot = this.history[this.history.length - 1]
    const todaySnapshot = {
      date: format(new Date(), 'DD/MM/YYYY'),
      fluctuation: 0,
      price: lastSnapshot.price
    }
    const history = lastSnapshot.date !== todaySnapshot.date
      ? [...this.history, todaySnapshot]
      : this.history

    const index = _inflation.findIndex(({ d }) => {
      const [ , snapMonth, snapYear ] = firstSnapshot.date.split('/')
      const [ inflYear, inflMonth ] = d.split('-')
      return inflYear === snapYear && snapMonth === inflMonth
    })

    let final = []
    if (index > -1) {
      let prevPrice = null
      // real inflation month by month with correct accumulative price
      const accInflation = _inflation.slice(index).map(({ v, d }) => {
        const [ year, month ] = d.split('-')
        const transformedDate = [ month, year ].join('/')
        // should use current or previous inflation data?
        const price = prevPrice ? prevPrice + Math.floor(v * prevPrice / 100) : firstSnapshot.price
        prevPrice = price
        return ({ price, date: transformedDate })
      })
      // presentational inflation with mapped comparation with article history
      final = history.map((snap) => {
        const estimatedInflation = accInflation.find(({ date }) => snap.date.includes(date))
        return estimatedInflation && estimatedInflation.price
      }).filter(Boolean)
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: history.map(({ date }) => date.slice(0, 5)),
        datasets: [
          {
            label: 'Precio',
            data: history.map(({ price }) => price),
            borderColor: this.$vuetify.theme.primary,
            backgroundColor: this.$vuetify.theme.primary,
            borderWidth: 1,
            pointHitRadius: 17,
            trendlineLinear: (history.length > 2) && {
              style: '#64aa64',
              lineStyle: 'dotted',
              width: 2
            }
          },
          {
            label: 'Esperado inflación',
            data: final,
            borderDash: [4, 4],
            borderColor: 'gray',
            backgroundColor: 'gray',
            borderWidth: 1,
            pointHitRadius: 10,
            pointStyle: 'rectRot',
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        tooltips: {
          titleFontFamily: 'Roboto',
          titleFontSize: 14,
          titleMarginBottom: 10,
          bodyFontFamily: 'Roboto',
          bodyFontSize: 14,
          bodySpacing: 8,
          yPadding: 16,
          xPadding: 16,
          mode: 'index',
          intersect: true,
          callbacks: {
            label: (tooltipItem, data) => {
              const price = this.$options.filters.priceFilter(+tooltipItem.value)
              const { label } = data.datasets[tooltipItem.datasetIndex]
              return `${label}: ${price}`
            }
          }
        },
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
