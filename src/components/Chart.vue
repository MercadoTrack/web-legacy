
<template>
  <div>
    <div :style="{ opacity: 0, position: 'absolute' }" role="alert">
      {{ alertDayAndPrice }}
    </div>
    <canvas @focus="onFocus" @blur="onBlur" @keydown="onKeyDown" tabIndex="0" ref="canvasRef" aria-label="grafico de precios" aria-describedby="description" width="auto" height="auto">
        <div id="description">
          Para navegar el gráfico mes a mes, y escuchar el precio que tuvo el producto en cada mes, clickear las flechas izquierda y derecha.
        </div>
    </canvas>
  </div>
</template>

<script>
import { format } from 'date-fns'
import Chart from 'chart.js'
import 'chartjs-plugin-trendline'

export default {
  data: () => ({
    chart: null,
    alertDayAndPrice: '',
    selectedIndex: -1
  }),
  props: ['history'],
  computed: {
    meta () {
      return this.chart.getDatasetMeta(0)
    },
    isInDataRange () {
      return this.selectedIndex > -1 && this.selectedIndex < this.meta.data.length
    }
  },
  methods: {
    formatCurrency (price) { // Format currency for y-axes and tooltip
      return price.toLocaleString('es-ar', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
      })
    },
    onKeyDown (e) {
      if (e.key === 'ArrowRight') {
        this.activateNext()
      } else if (e.key === 'ArrowLeft') {
        this.activatePrev()
      }
    },
    onBlur () {
      this.clearAll()
      this.chart.render()
    },
    onFocus () {
      if (this.selectedIndex > -1) {
        this.activateNext()
      } else {
        this.activate()
      }
    },
    activatePrev () {
      this.clearActive()
      this.selectedIndex = (this.selectedIndex || this.meta.data.length) - 1
      this.activate()
    },
    activateNext () {
      this.clearActive()
      this.selectedIndex = (this.selectedIndex + 1) % this.meta.data.length
      this.activate()
    },
    activate () {
      if (!this.isInDataRange) return
      // Activate tooltip
      this.chart.tooltip._active = [this.meta.data[this.selectedIndex]]
      this.chart.tooltip.update(true)
      this.chart.draw()
      // Add text for the VoiceOver reader to read on chart item focus
      const todaySnapshot = { date: format(new Date(), 'DD/MM/YYYY'), price: this.history[this.history.length - 1].price }
      const { date, price } = this.history[this.selectedIndex] || todaySnapshot
      this.alertDayAndPrice = `Día ${date}. Precio ${price} pesos.`
      this.chart.render()
    },
    clearAll () {
      this.meta.data.forEach((item, i) => this.meta.controller.removeHoverStyle(item, 0, i))
      this.selectedIndex = -1
    },
    clearActive () {
      if (this.selectedIndex > -1) {
        this.meta.controller.removeHoverStyle(this.meta.data[this.selectedIndex], 0, this.selectedIndex)
      }
    }
  },
  /* 0:
    date: "09/03/2019"
    original_price: null
    price: 212
  */
  mounted () {
    const ctx = this.$refs.canvasRef.getContext('2d')
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
        labels: history.map(({ date, event }) => { return event ? `${event} - ${date}` : date }),
        datasets: [{
          label: 'Precio',
          data: history.map(({ price }) => price),
          borderColor: this.$vuetify.theme.primary,
          backgroundColor: this.$vuetify.theme.primary,
          borderWidth: 1,
          pointHitRadius: 17,
          hoverBorderWidth: 2, // for accessibility
          hoverBorderColor: '#00288a', // for accessibility
          trendlineLinear: (history.length > 2) && {
            style: '#64aa64',
            lineStyle: 'dotted',
            width: 2
          }
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            label: (tooltipItem) => {
              return this.formatCurrency(tooltipItem.yLabel)
            }
          },
          custom: (tooltip) => {
            if (!tooltip) return
            // disable displaying the color box;
            tooltip.displayColors = false
          },
        },
        legend: {
          display: false
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
              callback: (label, index, labels) => {
                return this.formatCurrency(label)
              }
            }
          }]
        }
      }
    })
  }
}
</script>
