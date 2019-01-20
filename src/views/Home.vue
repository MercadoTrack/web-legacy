<template>
  <div class="home">
    <figure class="promo-container">
      <img src="../assets/mtrack_promo.svg" alt="">
    </figure>
    <div class="search-wrapper text-xs-right">
      <div class="search-container">
        <v-text-field
          class="mb-1"
          solo
          v-model="searchText"
          label="Buscar o pegar link"
          clearable
          hide-details
          :rules="searchRules"
          @keyup.enter="search"
          @click:append="search"
          append-icon="search"
        ></v-text-field>
        <router-link to="/navegar" class="subheading pointer accent--text">Ver todos</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import http from '../http.js'

const isLink = str => /https:\/\//ig.test(str)

export default {
  name: 'home',
  data: () => ({
    searchText: '',
    searchRules: [
      str => {
        if (isLink(str)) {
          const [ id ] = str.match(/(MLA-\d+)/ig) || []
          if (!id) {
            return 'Not a valid link'
          }
        }
        return true
      }
    ]
  }),
  methods: {
    search () {
      if (isLink(this.searchText)) {
        const [ id ] = this.searchText.match(/(MLA-\d+)/ig) || []
        if (id) {
          http.get(`/articles/${id.replace('-', '')}`)
            .then(res => {
              console.log(res)
            })
        }
      } else {
        this.$router.push(`/navegar?busqueda=${this.searchText}`)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-color: #fde500; // TODO: create variables file
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
.subheading {
  text-decoration: none;
}
.promo-container,
.search-wrapper {
  padding: 0 10px;
}
.promo-container {
  max-width: 700px;
  margin: auto auto 0 auto;
  width: 100%;
  @media (orientation: landscape) {
    max-width: 300px;
  }
}
.search-wrapper {
  text-align: center;
  margin: 0 0 auto 0;
  .search-container {
    margin: auto;
    max-width: 500px;
    padding: 0 15px;
    @media (orientation: landscape) {
      max-width: 265px;
    }
  }
}

</style>
