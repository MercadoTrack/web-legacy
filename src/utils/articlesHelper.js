const statuses = {
  active: 'activo',
  paused: 'pausado',
  closed: 'cerrado',
  under_review: 'bajo revision',
  inactive: 'inactivo',
}

export class ArticlesHelper {
  static getTranslatedStatus = (article) => statuses[article.status] || 'sin estado'

  static price = (article) => { return article.history[article.history.length - 1].price }

  static previousPrice = (article) => {
    let previousSnapshot = article.history[article.history.length - 2]
    return previousSnapshot && previousSnapshot.price
  }

  static fluctuation = (article) => { return 100 - Math.round(this.previousPrice(article) * 100 / this.price(article)) }

  static fluctuationColor = (article) => { return this.fluctuation(article) > 0 ? 'red' : 'green' }
}
