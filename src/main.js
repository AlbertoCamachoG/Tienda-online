import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Notifications from 'vue-notification'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faShoppingBag, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { faCanadianMapleLeaf, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faShoppingBag);
library.add(faTwitter);
library.add(faFacebookF);
library.add(faInstagram);
library.add(faShoppingCart);
library.add(faCanadianMapleLeaf);
library.add(faPlus);
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Notifications)

import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)


import Novedades from './components/Novedades.vue'
import Productos from './components/Productos.vue'
import Home from './components/Home.vue'
import Carrito from './components/Carrito.vue'
Vue.use(VueRouter);

Vue.config.productionTip = false
const routes = [
  { path: '/', component: Home,props: true},
  { path: '/carro', component: Carrito,props: true},
  { path: '/main', name:'Main',components:{
    default:Novedades,
    productos:Productos},props: true}
]
const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
