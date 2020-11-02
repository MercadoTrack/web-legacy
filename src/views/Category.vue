<template>
  <v-content>
    <!-- TODO: v-if is bad hack here, need to work meta data better with vuex and router -->
    <v-container v-if="category" class="px-4">
      <v-layout wrap>
        <v-flex xs12 class="my-4">
          <h1 class="headline text-capitalize">{{ category.name }}</h1>
        </v-flex>
        <v-flex xs12 v-if="childCategories">
          <v-card class="pa-4 children-card">
            <div v-for="child in childCategories" :key="child._id" class="my-1">
              <router-link :to="`/busqueda?category=${child._id}`">
                <span
                  class="grey--text text--darken-3 child-link font-weight-light"
                  >{{ child.name }}
                </span>
                <span
                  class="grey--text font-weight-light caption"
                  v-if="child.articleCount"
                >
                  ({{ child.articleCount }})
                </span>
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
  metaInfo() {
    if (!this.category) return
    return {
      title: `${this.category.name} en MercadoTrack`,
    }
  },
  computed: {
    ...mapGetters({
      mainCategories: 'meta/mainCategories',
      allChildCategories: 'meta/childCategories',
    }),
    category() {
      return this.mainCategories.find(category => {
        const categoryKeyName = CategoriesHelper.getCategoryKeyName(
          category.name
        )
        return this.$route.params.category === categoryKeyName
      })
    },
    childCategories() {
      return this.allChildCategories.filter(
        category => category.parent === this.category._id
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.children-card {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 16px;
  @media only screen and (min-width: 700px) {
    max-height: 300px;
    font-size: 14px;
  }
}
.child-link:hover {
  color: var(--v-primary-base) !important;
}
</style>
