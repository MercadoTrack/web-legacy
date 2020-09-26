<template>
  <v-content>
    <v-container>
      <v-card class="pa-4">
        <h1
          style="font-size: 30px;"
          class="font-weight-medium text-capitalize text-xs-center mt-3 mb-4"
        >
          Equipo
        </h1>
        <v-layout wrap justify-center class="px-2">
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
              <p class="title mt-3 mb-1 text-center">
                {{ member.name }}
              </p>
              <p class="subtitle mb-2 text-center">
                {{ member.title }}
              </p>
              <p class="subtitle text-center">
                <a :href="member.socialUrl" target="_blank">{{
                  member.socialHandle
                }}</a>
                —
                <a :href="member.website_url" target="_blank">{{
                  member.website
                }}</a>
              </p>
            </div>
          </div>
        </v-layout>
        <h1
          class="title font-weight-medium text-capitalize text-xs-center px-2 mt-5 mb-4"
        >
          Colaboradores
        </h1>
        <v-layout wrap justify-center>
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
              <p class="body-2 mt-3 mb-0 text-center">
                {{ member.name }}
              </p>
              <p class="caption mb-1 text-center">
                {{ member.title }}
              </p>
              <p class="caption text-center">
                <a :href="member.href" target="_blank">{{ member.contact }}</a>
                <template v-if="member.linked_in">
                  —
                  <a :href="member.linked_in" target="_blank">LinkedIn</a>
                </template>
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
        title: 'CEO & Lead Developer',
        website_url: 'https://gmaiolo.com',
        website: 'gmaiolo.com',
        socialHandle: '@g.maiolo',
        socialUrl: 'https://www.twitter.com/_gmaiolo/',
        img: require('../assets/us/will.png'),
      },
      {
        name: 'Nicolás Jeremías',
        title: 'Developer',
        website_url: 'https://nicojeremias.com',
        website: 'nicojeremias.com',
        socialHandle: '@nico_nj',
        socialUrl: 'https://www.instagram.com/nico_nj/',
        img: require('../assets/us/nico.jpg'),
      },
      {
        name: 'Julieta Juarez',
        title: 'UX/UI & Developer',
        website_url: 'https://julietaflux.dev',
        website: 'julietaflux.dev',
        socialHandle: '@julietaflux',
        socialUrl: 'https://www.instagram.com/julietaflux/',
        img: require('../assets/us/jules.png'),
      },
    ],
    colaborators: [
      {
        name: 'Alan Kovacs',
        title: 'Legales',
        href:
          'mailto:amkovacs23@gmail.com?subject=Hola, vi tu perfil en MercadoTrack',
        contact: 'amkovacs23@gmail.com',
        img: require('../assets/us/alan.jpg'),
      },
      {
        name: 'Alfredo Vazquez',
        title: 'Branding',
        href:
          'mailto:alfie.vazquez@gmail.com?subject=Hola, vi tu perfil en MercadoTrack',
        contact: 'alfie.vazquez@gmail.com',
        img: require('../assets/us/alfie.jpg'),
      },
      {
        name: 'Matías Álvarez',
        title: 'Testing',
        href:
          'mailto:mati.alv@gmail.com?subject=Hola, vi tu perfil en MercadoTrack',
        contact: 'mati.alv@gmail.com',
        linked_in: 'https://www.linkedin.com/in/alvarez-matias/',
        img: require('../assets/us/mati.jpg'),
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
