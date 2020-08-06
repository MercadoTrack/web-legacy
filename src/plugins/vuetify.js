import Vue from 'vue'
import Vuetify from 'vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  iconfont: 'md',
  options: {
    customProperties: true
  },
  theme: {
    primary: '#3483FA',
    secondary: '#FFF158',
    accent: '#1259C3',
    error: colors.red.accent3,
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFE600',
    background: '#EBEBEB',
  },
})
