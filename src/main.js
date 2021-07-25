import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueSimpleAlert from "vue-simple-alert";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import * as VueGoogleMaps from "vue2-google-maps";

import Antd from 'ant-design-vue';

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyA2puzdXIFqUCnySBgc8RuQCCL-eSB9Hq4",
    libraries: "places"
  }
});

Vue.use(Antd);
Vue.use(VueSweetalert2);
Vue.use(VueSimpleAlert);

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
