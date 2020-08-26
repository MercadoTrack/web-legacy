import moment from 'moment'

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
    var snapshotDate = moment(date, 'DD/MM/YYYY')
    const matchingEvents = saleEvents.filter(event => {
      const saleStartDate = moment(event.start).subtract(4, 'days')
      const saleEndDate = moment(event.end)
      return snapshotDate.isBetween(saleStartDate, saleEndDate, undefined, '[]')
    })
    return matchingEvents ? matchingEvents.map(event => event.name) : []
  }
}
