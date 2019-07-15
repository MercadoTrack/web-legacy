<template>
  <v-app>
    <ToolBar />
    <BetaBanner v-if="showBanner" @close="closeBanner" />
      <div :style="{ paddingTop: `${bannerOffset}px` }">
        <vue-page-transition name="fade">
          <router-view />
        </vue-page-transition>
      </div>
    <Footer />
    <Wizard />
    <Snackbar />
    <FloatingHelp />
  </v-app>
</template>

<script>
import { initAuth } from './utils/auth'
import Footer from './components/Footer'
import { ToolBar } from './components/ToolBar'
import Snackbar from './components/Snackbar'
import BetaBanner from './components/BetaBanner'
import Wizard from './components/Wizard'
import FloatingHelp from './components/FloatingHelp'

export default {
  name: 'app',
  components: {
    Footer,
    ToolBar,
    Snackbar,
    BetaBanner,
    Wizard,
    FloatingHelp,
  },
  data: () => ({
    bannerOffset: 0,
    showBanner: true,
  }),
  metaInfo: {
    title: 'MercadoTrack',
  },
  methods: {
    closeBanner () {
      this.showBanner = false
      this.bannerOffset = 0
      window.removeEventListener('resize', this.onResize)
    },
    onResize () {
      const banner = document.querySelector('.banner')
      this.bannerOffset = banner && banner.clientHeight
    }
  },
  mounted () {
    this.onResize()
    window.addEventListener('resize', this.onResize)
    this.$store.dispatch('meta/getBase')
    initAuth()
  },
}
</script>

<style lang="scss">
html {
  overflow-y: auto; // vuetify FAQ - https://bit.ly/2vvHSnJ
}

#app {
  background-color: var(--v-background-base);
}

a {
  text-decoration: none;
}

figure {
  margin: 0;
}

// needs to be global
// ref to ToolBar.vue
.v-toolbar__content {
  .v-input {
    min-height: 40px;
    .v-input__control {
      min-height: 40px;
    }
  }
}

.container {
  @media only screen and (min-width: 1900px) {
    max-width: 1185px;
  }
}

.router-link-active {
  text-decoration: none;
  color: inherit;
}

.pointer {
  cursor: pointer;
}

.strike-through {
  text-decoration: line-through;
}

.v-treeview-node__label {
  font-size: 16px;
}

.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

.w-100 {
  width: 100%;
}

.h-100 {
  height: 100%;
}

.mt-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-carousel {
  &.primary-controls {
    .v-carousel__prev,
    .v-carousel__next{
      .v-btn {
        color: var(--v-primary-base);
      }
    }
  }
  &.secondary-controls {
    .v-carousel__prev,
    .v-carousel__next{
      .v-btn {
        color: var(--v-secondary-base);
      }
    }
  }
}

.social {
  &.fb {
    background-image: url('./assets/facebook.svg');
  }
  &.tw {
    background-image: url('./assets/twitter.svg');
    &.light {
      background-image: url('./assets/twitter_light.svg');
    }
  }
  &.ig {
    background-image: url('./assets/instagram.svg');
  }
}

</style>
