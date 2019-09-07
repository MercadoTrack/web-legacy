<template>
  <canvas id="myChart" width="auto" height="auto"></canvas>
</template>

<script>
import { format } from 'date-fns'
import Chart from 'chart.js'
import 'chartjs-plugin-trendline'
import { ArticlesHelper } from '../../utils/articlesHelper'
import _inflation from './inflation-mock.json'

export default {
  data: () => ({
    chart: null,
  }),
  props: ['history', 'showInflation'],
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
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          labels: {
            boxWidth: 15,
            fontSize: 13,
            // usePointStyle: true,
          }
        },
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
          xAxes: [{
            ticks: {
              fontSize: 12,
            }
          }],
          yAxes: [{
            ticks: {
              fontSize: 12,
              beginAtZero: false,
              callback: (value) => this.$options.filters.priceFilter(+value)
            }
          }]
        }
      }
    })
  },
  watch: {
    showInflation: {
      handler (show) {
        if (show) this.addInflationData()
        else this.removeInflationData()
      }
    },
  },
  methods: {
    addInflationData () {
      const estimatedPricesWithInflation = ArticlesHelper.getEstimatedPricesWithInflation(_inflation, this.history)
      this.chart.data.datasets.push({
        id: 'inflation',
        label: 'Esperado inflación',
        data: estimatedPricesWithInflation,
        borderDash: [4, 4],
        borderColor: 'gray',
        backgroundColor: 'gray',
        borderWidth: 1,
        pointHitRadius: 10,
        pointStyle: 'rectRot',
        pointRadius: 0
      })
      this.chart.update()
    },
    removeInflationData () {
      this.chart.data.datasets = this.chart.data.datasets.filter(dataset => dataset.id !== 'inflation')
      this.chart.update()
    }
  }
}
</script>
