import moment from 'moment'

export const DAYS_BEFORE_SALE = 4

export const statuses = {
  active: 'activo',
  paused: 'pausado',
  closed: 'cerrado',
  under_review: 'bajo revision',
  inactive: 'inactivo',
}

export class ArticlesHelper {
  static getTranslatedStatus = (article) => statuses[article.status] || 'sin estado'

  static price = (article) => {
    const lastPrice = article.history[article.history.length - 1].price
    return lastPrice || 0
  }

  static previousPrice = (article) => {
    let previousSnapshot = article.history[article.history.length - 2]
    return previousSnapshot && previousSnapshot.price
  }

  static fluctuation = (article) => {
    const previousPrice = this.previousPrice(article)
    const price = this.price(article)

    return (previousPrice && price) // need to check for price because of snapshots without price
      ? 100 - Math.round(previousPrice * 100 / price)
      : 0
  }

  static fluctuationColor = (article) => {
    return this.fluctuation(article) > 0 ? 'red' : 'green'
  }

  static snapshotSaleEvents = (date, saleEvents) => {
    const snapshotDate = moment(date, 'DD/MM/YYYY')
    const matchingEvents = saleEvents.filter(event => {
      const saleStartDate = moment(event.start)
      const saleEndDate = moment(event.end)
      return snapshotDate.isBetween(saleStartDate, saleEndDate, undefined, '[]')
    })
    return matchingEvents || []
  }

  static timePeriodSaleEvents = (dateFrom, dateTo, saleEvents) => {
    const from = moment(dateFrom, 'DD/MM/YYYY')
    const to = moment(dateTo, 'DD/MM/YYYY')

    const matchingEvents = saleEvents.filter(event => {
      return from.isSameOrBefore(moment(event.end)) && to.isAfter(moment(event.start))
    })
    return matchingEvents || []
  }

  static insertSaleEventSnapshots = (saleEvent, priceHistory) => {
    const saleEventStartDate = moment(saleEvent.start)
    const saleEventEndDate = moment(saleEvent.end)
    const saleDaysAmount = saleEventEndDate.diff(saleEventStartDate, 'days')

    this.insertSaleEventSnapshotIfmissing(saleEvent.start, saleEvent.name, saleEvent.color, priceHistory)

    for (let index = 0; index <= saleDaysAmount - 1; index++) {
      saleEventStartDate.add(1, 'days')
      this.insertSaleEventSnapshotIfmissing(saleEventStartDate, saleEvent.name, saleEvent.color, priceHistory)
    }
  }

  static insertSaleEventSnapshotIfmissing = (date, event, color, priceHistory) => {
    const saleEventDate = moment(date).format('DD/MM/YYYY')
    const existingSnapshot = priceHistory.find(snapshot => { return snapshot.date === saleEventDate })
    if (!existingSnapshot) {
      const previousSnapshots = priceHistory.filter(snapshot => {
        return moment(snapshot.date, 'DD/MM/YYYY').isBefore(date)
      })

      const lastPrice = previousSnapshots[previousSnapshots.length - 1].price
      const newSnapshot = {
        date: saleEventDate,
        event,
        color,
        original_price: null,
        price: lastPrice,
        hideTooltip: true
      }

      priceHistory.splice(previousSnapshots.length, 0, newSnapshot)
    }
  }
}
