<template>
  <v-content>
    <v-container>
      <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>

      <v-card v-else>
        <v-layout row wrap>
          <v-flex xs12 pb-0>
            <h5 class="headline font-weight-light pa-3">Favoritos</h5>
          </v-flex>
          <v-container class="pa-0 ma-0 line-wrap">
            <v-layout wrap class="pa-0 ma-0">
              <v-alert
                v-if="!articles.length"
                class="ml-2 mb-2 caption"
                :value="true"
                color="info"
                icon="info"
                outline>
                  Aún no tienes favoritos.
              </v-alert>
              <v-flex v-else xs12 class="pa-0">
                <v-list>
                  <v-list-tile class="line py-2">
                    <v-list-tile-action>
                      <v-checkbox v-model="allSelected" @click.native="checkAllArticles"></v-checkbox>
                    </v-list-tile-action>

                    <v-list-tile-content>
                      <v-btn :disabled="this.selected.length === 0"
                        @click="deleteMultiple()"
                        light color="info"
                        class="px-1 font-weight-light text-capitalize">
                        Eliminar
                      </v-btn>
                      <v-list-tile-title>Todos ({{articles.length}})</v-list-tile-title>
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

                    <v-list-tile-content class="ml-4 article-caption">
                      <v-list-tile-title class="title font-weight-light mb-2">{{ article.title }}</v-list-tile-title>
                      <v-list-tile-sub-title class="title font-weight-light">{{ article.price | priceFilter }}</v-list-tile-sub-title>
                    </v-list-tile-content>

                    <v-tooltip bottom max-width="25rem">
                      <template slot="activator">
                        <v-list-tile-action>
                          <v-btn icon ripple :href="article.permalink" target="_blank">
                            <v-icon color="grey lighten-1">call_made</v-icon>
                          </v-btn>
                        </v-list-tile-action>
                      </template>
                        <span>Ver en Mercado Libre</span>
                    </v-tooltip>

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
                          <v-btn icon ripple @click="toggleFavorite(article)">
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
          </v-container>
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
    allSelected: false
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
    removeFromArray (ids) {
      this.articles = this.articles.filter(article => !ids.includes(article.id))
    },
    async deleteMultiple () {
      if (this.selected.length > 0) {
        const res = await api.removeFavorites(this.selected)
        this.updateFavorites(res.data)
        this.removeFromArray(this.selected)
      }
    },
    async fetchFavorites () {
      this.articles = (await api.getFavorites({ full: true })).data
    },
    checkAllArticles () {
      if (this.allSelected) {
        this.selected = this.articles.map((article) => article.id)
      } else {
        this.selected = []
      }
    },
    async toggleFavorite (article) {
      const res = await api.toggleFavorite(article.id)
      this.updateFavorites(res.data)
      this.removeFromArray([article.id])
    }
  },
  mounted () {
    const interval = setInterval(async () => {
      if (!this.authenticating) {
        if (!this.isAuthenticated) {
          this.$router.push('/')
        }
        clearInterval(interval)
        await this.fetchFavorites()
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

.article-caption {
  min-height: 50px;
}
</style>
