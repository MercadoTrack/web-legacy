<template>
  <v-content>
    <!-- TODO: v-if is bad hack here, need to work meta data better with vuex and router -->
    <v-container v-if="category">
      <v-layout wrap>
        <v-flex xs12 class="my-4">
          <h1 class="headline text-capitalize">{{ category.name }}</h1>
        </v-flex>
        <v-flex xs12 v-if="childCategories">
          <v-card class="pa-4 children-card">
            <div v-for="child in childCategories" :key="child._id" class="ma-1">
              <router-link
                class="grey--text text--darken-3 child-link font-weight-light"
                :to="`/busqueda?category=${child._id}`"
              >
                {{ child.name }}
              </router-link>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters } from 'vuex'
import { CategoriesHelper } from '../utils'

export default {
  computed: {
    ...mapGetters({
      mainCategories: 'meta/mainCategories',
      allChildCategories: 'meta/childCategories',
    }),
    category () {
      return this.mainCategories.find((category) => {
        const categoryKeyName = CategoriesHelper.getCategoryKeyName(category.name)
        return this.$route.params.category === categoryKeyName
      })
    },
    childCategories () {
      return this.allChildCategories.filter((category) => category.parent === this.category._id)
    },
  },
}

</script>

<style lang="scss" scoped>
.children-card {
  display: flex;
  flex-direction: column;
  max-height: 300px;
  flex-wrap: wrap;
}
.child-link:hover {
  color: var(--v-primary-base) !important;
}
</style>
