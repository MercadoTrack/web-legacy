<template>
  <v-content class="home full-height">
    <v-container justify-start>
      <v-layout column justify-start wrap>
        <v-flex xs12>
          <img src="../assets/mtrack_promo.svg" alt="">
        </v-flex>
        <v-flex xs12>
          <v-text-field
            solo
            v-model="searchText"
            label="Buscar o pegar link"
            clearable
            :rules="searchRules"
            @keyup.enter="search"
            @click:append="search"
            append-icon="search"></v-text-field>
          <div class="mt-1 text-xs-right">
            <router-link to="/navegar" class="subheading pointer accent--text">Ver todos</router-link>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
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
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$magic-number: 685px;
.home {
  background-color: #fde500; // TODO: create variables file
}
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.layout {
  padding: 50px 20% 0 20%;
}
@media screen and (max-height: $magic-number) {
  .layout {
    padding: 0;
    justify-content: center;
    align-items: center;
    .flex {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
