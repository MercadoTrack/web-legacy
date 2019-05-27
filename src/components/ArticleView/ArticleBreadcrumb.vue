<template>
  <v-breadcrumbs :items="breadcrumbItems" divider=">"></v-breadcrumbs>
</template>

<script>
import { mapGetters } from 'vuex'
import { CategoriesHelper } from '../../utils'

export default {
  name: 'ArticleBreadcrumb',
  props: ['categoryId'],
  computed: {
    ...mapGetters({
      categories: 'meta/categories',
      mainCategories: 'meta/mainCategories',
    }),
    category () {
      return this.categories && this.categories.find((category) => category._id === this.categoryId)
    },
    parentCategory () {
      return this.category && this.mainCategories.find((category) => category._id === this.category.parent)
    },
    breadcrumbItems () {
      const items = [{
        text: 'Inicio',
        disabled: false,
        to: '/'
      }]
      if (this.parentCategory) {
        items.push({
          text: this.parentCategory.name,
          to: `/${CategoriesHelper.getCategoryKeyName(this.parentCategory.name)}`,
          disabled: false,
        })
      }
      if (this.category) {
        items.push({
          text: this.category.name,
          disabled: false,
          to: `/busqueda?category=${this.categoryId}`
        })
      }
      return items
    },
  },
}
</script>
