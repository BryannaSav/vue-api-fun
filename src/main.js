import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import DungeonsAndDragons from './components/DungeonsAndDragons.vue'
import vuetify from './plugins/vuetify';

Vue.use(VueRouter);
Vue.config.productionTip = false

const routes = [
  { path: '/dnd', component: DungeonsAndDragons }
];

const router = new VueRouter({
  routes: routes, 
})

new Vue({
  router: router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
