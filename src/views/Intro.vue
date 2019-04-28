<template>
  <div class="intro">
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
          @keyup.enter="search()"
          @click:append="search()"
          append-icon="search"
        ></v-text-field>
        <router-link to="/navegar" @click.native="dismiss()" class="subheading pointer accent--text">Ver todos</router-link>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: make better, send to util
const isLink = str => /https:\/\//ig.test(str)

export default {
  name: 'intro',
  props: {
    dismiss: Function
  },
  data: () => ({
    searchText: '',
  }),
  methods: {
    // TODO send to util
    async search () {
      if (!this.searchText) return
      if (isLink(this.searchText)) {
        const [ rawId ] = this.searchText.match(/(MLA-\d+)/ig) || []
        if (!rawId) return
        const id = rawId.replace('-', '')
        this.$router.push(`/article/${id}`)
      } else {
        this.$router.push(`/busqueda?titulo=${this.searchText}`)
      }
      this.dismiss()
    }
  }
}
</script>

<style lang="scss" scoped>
.intro {
  background-color: #fde500; // TODO: create variables file
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
.promo-container {
  padding: 0 10px;
  max-width: 700px;
  margin: auto auto 0 auto;
  width: 100%;
  @media (orientation: landscape) and (max-height: 500px) {
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
    @media (orientation: landscape) and (max-height: 500px) {
      max-width: 265px;
    }
  }
}
</style>
