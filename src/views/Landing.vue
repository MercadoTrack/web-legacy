<template>
  <Intro v-if="showIntro" :dismiss="dismissIntro"/>
  <v-content v-else>
    <v-container class="mt-4">
      <div v-for="category in mainCategories" :key="category._id" class="mb-5">
        <h2 class="headline font-weight-light ml-2">
          {{ category.name }}
          <router-link :to="getCategoryLink(category)" class="ml-2 subheading">
            Ver todo
          </router-link>
        </h2>
        <v-layout row class="my-2">
          <v-flex xs3 v-for="article in category.samples" :key="article.id" class="pa-2">
            <LandingArticleCard :article="article" />
          </v-flex>
        </v-layout>
      </div>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Intro from './Intro'
import LandingArticleCard from '../components/LandingArticleCard'
import { CategoriesHelper } from '../utils'

export default {
  components: {
    Intro,
    LandingArticleCard,
  },
  computed: {
    ...mapGetters({
      showIntro: 'intro/show',
      mainCategories: 'meta/mainCategories',
    }),
  },
  methods: {
    ...mapMutations({
      dismissIntro: 'intro/dismiss',
    }),
    getCategoryLink (category) {
      const categoryKeyName = CategoriesHelper.getCategoryKeyName(category.name)
      return `/${categoryKeyName}`
    },
  },
}
</script>
