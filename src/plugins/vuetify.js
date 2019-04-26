import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: '#3483FA',
    secondary: '#FDE500',
    accent: '#1259C3',
    error: colors.red.accent3,
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.use(Vuetify, {
  iconfont: 'md'
})
