<template>
  <v-breadcrumbs :items="breadcrumbItems" divider=">"></v-breadcrumbs>
</template>

<script>
import { mapGetters } from 'vuex'

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
        text: 'Todos los artículos',
        disabled: false,
        href: '/'
      }]
      if (this.parentCategory) {
        items.push({
          text: this.parentCategory.name,
          disabled: false,
        })
      }
      if (this.category) {
        items.push({
          text: this.category.name,
          disabled: false,
        })
      }
      return items
    },
  },
}
</script>
