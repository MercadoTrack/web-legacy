<template>
  <v-content>
    <v-container>
      <v-layout wrap justify-center>
        <v-fade-transition mode="out-in" tag="div">
            <div class="px-2 mt-5 mb-5 d-flex">
              <div
              v-for="member in team"
              :key="member.name"
              align="center"
              justify="center"
              class="ma-4"
              >
                <v-avatar
                  size="128px"
                >
                  <img
                    class="is-rounded"
                    v-bind:src="member.img"
                    :alt="member.name + ' foto'"
                  />
                </v-avatar>
                <div>
                  <p class="title mt-3 text-center">{{ member.name }}</p>
                  <p class="subtitle text-center">
                    <a :href="member.instagramURL" target="_blank">{{
                      member.instagramHandle
                    }}</a>
                    -
                    <a :href="member.website" target="_blank">{{
                      member.website
                    }}</a>
                  </p>
                </div>
              </div>
            </div>
        </v-fade-transition>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>

export default {
  name: 'aboutus',
  data: () => ({
    team: [
      {
        name: 'Guillermo Maiolo',
        website: 'https://gmaiolo.com/',
        instagramHandle: '@g.maiolo',
        instagramURL: 'https://www.instagram.com/g.maiolo/',
        img: require('../assets/us/will.png')
      },
      {
        name: 'Nicolás Jeremías',
        website: 'https://nicojeremias.com/',
        instagramHandle: '@nico_nj',
        instagramURL: 'https://www.instagram.com/nico_nj/',
        img: require('../assets/us/nico.jpg')
      },
      {
        name: 'Julieta Juarez',
        website: 'https://julietaflux.dev/',
        instagramHandle: '@julietaflux',
        instagramURL: 'https://www.instagram.com/julietaflux/',
        img: require('../assets/us/jules.png')
      }
    ]
  }),
}
</script>
