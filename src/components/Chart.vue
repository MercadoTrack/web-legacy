
<template>
  <div>
    <div ref="alertDayAndPriceRef" role="alert">
    </div>
    <canvas tabIndex="0" id="myChart" aria-label="grafico de precios" aria-describedby="description" width="auto" height="auto">
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

    this.$refs.alertDayAndPriceRef.style.opacity = '0'
    this.$refs.alertDayAndPriceRef.style.position = 'absolute'

    // Format currency for y-axes and tooltip
    const formatCurrency = (price) => '$' + Number(price).toFixed(0).replace(/./g, function (c, i, a) {
      return i > 0 && c !== ',' && (a.length - i) % 3 === 0 ? '.' + c : c
    })

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: history.map(({ date }) => date),
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
            label: function (tooltipItem, data) {
              return formatCurrency(tooltipItem.yLabel)
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
              callback: function (label, index, labels) {
                return formatCurrency(label)
              }
            }
          }]
        }
      }
    })
    // Accessible chart start
    let selectedIndex = -1

    const meta = chart.getDatasetMeta(0)

    var canvas = document.getElementById('myChart')

    function clearActive () {
      if (selectedIndex > -1) {
        meta.controller.removeHoverStyle(meta.data[selectedIndex], 0, selectedIndex)
      }
    }

    function clearAll () {
      meta.data.forEach((item, i) => meta.controller.removeHoverStyle(item, 0, i))
      selectedIndex = -1
    }

    const activate = () => {
      meta.controller.setHoverStyle(meta.data[selectedIndex], 0, selectedIndex)
      
      // Activate tooltip 
      chart.tooltip._active = [meta.data[selectedIndex]]
      chart.tooltip.update(true)
      chart.draw()

      // Add text for the VoiceOver reader to read on chart item focus
      const { date, price } = history[selectedIndex]
      this.$refs.alertDayAndPriceRef.innerText = `Día ${date}. Precio ${price} pesos.`

      chart.render()
    }

    function activateNext () {
      clearActive()
      selectedIndex = (selectedIndex + 1) % meta.data.length
      activate()
    }

    function activatePrev () {
      clearActive()
      selectedIndex = (selectedIndex || meta.data.length) - 1
      activate()
    }

    canvas.addEventListener('focus', function () {
      if (selectedIndex > -1) {
        activateNext()
      } else {
        activate()
      }
    })

    canvas.addEventListener('blur', function () {
      clearAll()
      chart.render()
    })

    canvas.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') {
        activateNext()
      } else if (e.key === 'ArrowLeft') {
        activatePrev()
      }
    })
    // Accessible chart end
  }
}
</script>
