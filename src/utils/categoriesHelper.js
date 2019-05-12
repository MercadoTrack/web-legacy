export class CategoriesHelper {
  static getCategoryKeyName = (categoryName) => {
    return categoryName
      .replace(/[, ].*/, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }
}
