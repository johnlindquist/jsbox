import "vuetify/dist/vuetify.css"
import "material-design-icons/iconfont/material-icons.css"
import "typeface-roboto/index.css"
import Vue from "vue"
import App from "./App.vue"
import * as R from "ramda"
import Vuetify from "vuetify"

Vue.use(Vuetify)

new Vue({
  el: "#app",
  render: h => h(App)
})
