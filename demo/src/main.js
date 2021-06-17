import Vue from 'vue'
import App from './App.vue'
import VueDebugger from './../../src/index'
import './../../dist/vue-debugger.css'

Vue.config.productionTip = false
Vue.use(VueDebugger)

new Vue({
  render: h => h(App),
}).$mount('#app')
