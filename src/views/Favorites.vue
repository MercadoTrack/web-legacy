<template>
  <v-content>
    <v-container>
      <v-progress-linear v-if="loading" :indeterminate="true"></v-progress-linear>

      <v-layout v-else wrap>
        <v-flex xs12 class="my-4">
          <h1 class="headline text-capitalize">Favoritos</h1>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <div row wrap>
              <v-alert
                v-if="!articles.length"
                class="caption"
                :value="true"
                color="info"
                icon="info"
                outline
              >
                Aún no tienes favoritos.
              </v-alert>
              <div v-else class="py-0 px-4">
                <v-layout row wrap>

                  <!-- delete all row -->
                  <v-flex xs12>
                    <v-layout row align-center justify-start fill-height>
                      <div>
                        <v-checkbox :value="selected.length === favorites.length" @click.native="selectAll()"></v-checkbox>
                      </div>
                      <div>
                        <v-btn
                          :disabled="!selected.length"
                          @click="remove()"
                          color="primary"
                          class="ml-3 font-weight-light text-none"
                        >
                          <span>Eliminar</span>
                          <span v-if="selected.length === favorites.length" class="ml-1">todos</span>
                          <span v-else-if="selected.length" class="caption ml-1">({{ selected.length }})</span>
                        </v-btn>
                      </div>
                      <h2 class="ml-auto body-1 font-weight-light grey--text">
                        {{ favorites.length }} Favoritos
                      </h2>
                    </v-layout>
                    <v-divider></v-divider>
                  </v-flex>

                  <!-- favorites list -->
                  <v-flex xs12 v-for="article in articles" :key="article.id">
                    <v-layout row align-center justify-start fill-height class="py-4">
                      <div>
                        <v-checkbox v-model="selected" :value="article.id"></v-checkbox>
                      </div>
                      <v-avatar size="150px" v-if="$vuetify.breakpoint.smAndUp" class="ml-3">
                        <img :src="getImage(article)">
                      </v-avatar>
                      <div class="pl-4" style="flex: 1; min-width: 0;">
                        <router-link
                          tag="h4"
                          :to="`/articulo/${article.id}`"
                          class="title mr-4 mb-3 font-weight-light text-truncate"
                          :title="article.title"
                        >
                          <a style="color: inherit;">{{ article.title }}</a>
                        </router-link>

                        <!-- TODO: make component -->
                        <p class="price-info w-100 pr-4">
                          <span class="title font-weight-regular mr-2">{{ price(article) | priceFilter }}</span>
                          <span v-if="fluctuation(article) < 0" class="fluctuation green--text text--lighten-2">
                            <span class="mr-1">{{ Math.abs(fluctuation(article)) }}%</span>
                            <v-icon color="green lighten-2">mood</v-icon>
                          </span>
                          <span v-else-if="fluctuation(article) > 0" class="fluctuation blue-grey--text text--darken-3">
                            <span class="mr-1">{{ Math.abs(fluctuation(article)) }}%</span>
                            <v-icon color="red lighten-2">sentiment_very_dissatisfied</v-icon>
                          </span>
                        </p>

                      </div>
                      <div>
                        <v-btn
                          v-if="$vuetify.breakpoint.smAndUp"
                          color="primary"
                          class="body-1 font-weight-light text-none"
                          :to="`/articulo/${article.id}`"
                        >
                          Ver articulo
                        </v-btn>
                      </div>
                    </v-layout>
                    <v-divider></v-divider>
                  </v-flex>

                </v-layout>
              </div>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { ArticlesHelper } from '../utils'
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
    price (article) { return ArticlesHelper.price(article) },
    fluctuation (article) { return ArticlesHelper.fluctuation(article) },
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

<style lang="scss" scoped>
.price-info,
.fluctuation {
  display: inline-flex;
  align-items: center;
}

.fluctuation {
  @media screen and (max-width: 768px) {
    margin-left: auto;
  }
}
</style>
