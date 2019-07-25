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
    const lastSnapshot = this.history[this.history.length - 1]
    const todaySnapshot = {
      date: format(new Date(), 'DD/MM/YYYY'),
      fluctuation: 0,
      price: lastSnapshot.price
    }
    const history = lastSnapshot.date !== todaySnapshot.date
      ? [...this.history, todaySnapshot]
      : this.history

    let lastFoundInflation = null
    let lastCalculatedInflationPrice = null
    const inflation = history.map(({ date, price }) => {
      const [ , histMonth, histYear ] = date.split('/')
      const inflationInDate = _inflation.find(({ d }) => {
        const [ inflYear, inflMonth ] = d.split('-')
        return inflYear === histYear && histMonth === inflMonth
      })
      if (!inflationInDate) return
      if (!lastFoundInflation) {
        lastFoundInflation = inflationInDate
        lastCalculatedInflationPrice = price
        return price
      }
      if (lastFoundInflation.d === inflationInDate.d) {
        return lastCalculatedInflationPrice
      }
      lastCalculatedInflationPrice = lastCalculatedInflationPrice + Math.floor(inflationInDate.v * lastCalculatedInflationPrice / 100)
      lastFoundInflation = inflationInDate
      return lastCalculatedInflationPrice
    }).filter(Boolean)

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
            label: 'Esperado inflacion',
            data: inflation,
            borderColor: 'gray',
            backgroundColor: 'gray',
            borderWidth: 1,
            pointHitRadius: 17,
          }
        ]
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
