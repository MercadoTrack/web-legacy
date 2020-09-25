<template>
  <v-content>
    <v-container>
      <v-card class="pa-4">
        <h1 class="headline text-capitalize text-xs-center">Equipo</h1>
        <v-layout wrap justify-center class="px-2 mt-5 mb-5">
          <div
            v-for="member in team"
            :key="member.name"
            align="center"
            justify="center"
            class="mb-4 mx-4 team-card"
          >
            <v-avatar size="11rem">
              <img
                class="is-rounded"
                v-bind:src="member.img"
                :alt="member.name + ' foto'"
              />
            </v-avatar>
            <div>
              <p class="title mt-3 text-center">
                {{ member.name }}
              </p>
              <p class="subtitle mt-3 text-center">
                {{ member.title }}
              </p>
              <p class="subtitle text-center">
                <a :href="member.instagramURL" target="_blank">{{
                  member.instagramHandle
                }}</a>
                —
                <a :href="member.website" target="_blank">{{
                  member.website
                }}</a>
              </p>
            </div>
          </div>
        </v-layout>
        <h1 class="headline text-capitalize text-xs-center">Colaboradores</h1>
        <v-layout wrap justify-center class="px-2 mt-5 mb-5">
          <div
            v-for="member in colaborators"
            :key="member.name"
            align="center"
            justify="center"
            class="mb-4 mx-4 team-card"
          >
            <v-avatar size="5.5rem">
              <img
                class="is-rounded"
                v-bind:src="member.img"
                :alt="member.name + ' foto'"
              />
            </v-avatar>
            <div>
              <p class="title mt-3 text-center">
                {{ member.name }}
              </p>
              <p class="subtitle mt-3 text-center">
                {{ member.title }}
              </p>
              <p class="subtitle text-center">
                <a :href="member.instagramURL" target="_blank">{{
                  member.instagramHandle
                }}</a>
                —
                <a :href="member.website" target="_blank">{{
                  member.website
                }}</a>
              </p>
            </div>
          </div>
        </v-layout>
      </v-card>
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
        title: '',
        website: 'https://gmaiolo.com/',
        instagramHandle: '@g.maiolo',
        instagramURL: 'https://www.instagram.com/g.maiolo/',
        img: require('../assets/us/will.png'),
      },
      {
        name: 'Nicolás Jeremías',
        title: '',
        website: 'https://nicojeremias.com/',
        instagramHandle: '@nico_nj',
        instagramURL: 'https://www.instagram.com/nico_nj/',
        img: require('../assets/us/nico.jpg'),
      },
      {
        name: 'Julieta Juarez',
        title: '',
        website: 'https://julietaflux.dev/',
        instagramHandle: '@julietaflux',
        instagramURL: 'https://www.instagram.com/julietaflux/',
        img: require('../assets/us/jules.png'),
      },
    ],
    colaborators: [
      {
        name: '',
        title: '',
        website: '',
        instagramHandle: '',
        instagramURL: '',
        img: require('../assets/us/will.png'),
      },
    ],
  }),
}
</script>

<style lang="scss" scoped>
.team-card {
  width: 250px !important;
}
.child-link:hover {
  color: var(--v-primary-base) !important;
}
</style>
