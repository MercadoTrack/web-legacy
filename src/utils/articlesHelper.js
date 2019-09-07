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

  static getEstimatedPricesWithInflation = (inflation, history) => {
    const [ firstSnapshot ] = history
    // finding the first inflation rate matching the first snapshot to slice later
    // we'll ignore older inflation rates
    const index = inflation.findIndex(({ d }) => {
      const [ , snapMonth, snapYear ] = firstSnapshot.date.split('/')
      const [ inflYear, inflMonth ] = d.split('-')
      return inflYear === snapYear && snapMonth === inflMonth
    })
    if (index < 0) return []
    let prevPrice = null
    // real inflation month by month with correct accumulative price
    // TODO: do snap by snap with linear interpolation
    const accInflation = inflation.slice(index).map(({ v, d }) => {
      const [ year, month ] = d.split('-')
      const transformedDate = [ month, year ].join('/')
      // should use current or previous inflation data?
      const price = prevPrice ? prevPrice + Math.floor(v * prevPrice / 100) : firstSnapshot.price
      prevPrice = price
      return ({ price, date: transformedDate })
    })
    // presentational inflation with mapped comparation with article history
    return history.map((snap) => {
      const estimatedInflation = accInflation.find(({ date }) => snap.date.includes(date))
      return estimatedInflation && estimatedInflation.price
    }).filter(Boolean)
  }
}
