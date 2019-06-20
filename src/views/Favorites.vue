<template>
  <v-content>
    <v-container>
      <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>

      <v-card v-else>
        <v-layout row wrap>
          <v-flex xs12 pb-0>
            <h5 class="headline font-weight-light pa-3">Favoritos</h5>
          </v-flex>
          <v-alert
            v-if="!articles.length"
            class="ml-2 mb-2 caption"
            :value="true"
            color="info"
            icon="info"
            outline
          >
              Aún no tienes favoritos.
          </v-alert>
          <v-flex v-else xs12 class="pa-0">
            <v-list>
              <v-list-tile class="line py-2">
                <v-list-tile-action style="flex-direction: row;">
                  <v-checkbox :value="selected.length === favorites.length" @click.native="selectAll()"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-layout justify-start row class="w-100">
                    <v-btn
                      :disabled="!selected.length"
                      @click="remove()"
                      color="primary"
                      class="font-weight-light text-capitalize"
                    >
                      <span>Eliminar</span>
                      <span v-if="selected.length === favorites.length" class="ml-1">todos</span>
                      <span v-else-if="selected.length" class="caption ml-1">({{ selected.length }})</span>
                    </v-btn>
                    <h2 class="ml-auto body-1 font-weight-light grey--text">
                      {{ favorites.length }} Favoritos
                    </h2>
                  </v-layout>
                </v-list-tile-content>
              </v-list-tile>

              <v-list-tile
                v-for="article in articles"
                :key="article.id"
                avatar
                class="line border"
              >
                <v-list-tile-action>
                  <v-checkbox v-model="selected" :value="article.id"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-avatar :tile="false" size="150">
                  <img :src="getImage(article)">
                </v-list-tile-avatar>
                <v-list-tile-content class="ml-4">
                  <v-list-tile-title class="title font-weight-light mb-2">{{ article.title }}</v-list-tile-title>
                  <v-list-tile-sub-title class="title font-weight-light">{{ article.price | priceFilter }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-tooltip bottom max-width="25rem">
                  <template slot="activator">
                    <v-list-tile-action>
                      <v-btn icon ripple :to="`/articulo/${article.id}`">
                        <v-icon color="grey lighten-1">show_chart</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </template>
                    <span>Ver artículo</span>
                </v-tooltip>
                <v-tooltip bottom max-width="25rem">
                  <template slot="activator">
                    <v-list-tile-action>
                      <v-btn icon ripple @click="remove([ article.id ])">
                        <v-icon color="grey lighten-1">delete_outline</v-icon>
                      </v-btn>
                    </v-list-tile-action>
                  </template>
                    <span>Borrar</span>
                </v-tooltip>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import api from '../api'

export default {
  data: () => ({
    loading: true,
    articles: [],
    selected: [],
  }),
  metaInfo: {
    title: 'Favoritos en MercadoTrack'
  },
  computed: {
    ...mapGetters({
      authenticating: 'auth/authenticating',
      isAuthenticated: 'auth/isAuthenticated',
      favorites: 'auth/favorites',
    })
  },
  methods: {
    ...mapMutations({
      updateFavorites: 'auth/updateFavorites'
    }),
    getImage (article) {
      const [image] = article.images
      return image
    },
    async remove (ids = this.selected) {
      const { data: favorites } = await api.removeFavorites(ids)
      this.selected = []
      this.articles = this.articles.filter(article => !ids.includes(article.id))
      this.updateFavorites(favorites)
    },
    selectAll () {
      if (!this.selected.length || this.selected.length < this.favorites.length) {
        this.selected = this.articles.map(article => article.id)
      } else {
        this.selected = []
      }
    },
  },
  mounted () {
    const interval = setInterval(async () => {
      if (!this.authenticating) {
        clearInterval(interval)
        if (!this.isAuthenticated) {
          this.$router.push('/')
          return
        }
        const { data: articles } = await api.getFavorites({ full: true })
        this.articles = articles
        this.loading = false
      }
    }, 100)
  }
}
</script>

<style scoped>
.border {
  border-top: 1px solid rgba(0,0,0,.12);
}

.line {
  min-height: auto;
  padding: 5rem 1rem;
}

</style>
