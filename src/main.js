import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import wysiwyg from 'vue-wysiwyg'
import ehcPage from '@/components/ehc-page.vue'
import ehcForm from '@/components/ehc-form.vue'
import ehcDialog from '@/components/ehc-dialog.vue'
import ehcDrawer from '@/components/ehc-drawer.vue'
import VueTheMask from 'vue-the-mask'





Vue.component('ehc-page', ehcPage)
Vue.component('ehc-form', ehcForm)
Vue.component('ehc-dialog', ehcDialog)
Vue.component('ehc-drawer', ehcDrawer)

  
Vue.use(VueTheMask)


Vue.config.productionTip = false

Vue.use(wysiwyg, {
  hideModules: {
    'link': false,
    'code': true,
    'image': false,
    'table': true,
    'forcePlainTextOnPaste': true,
    'removeFormat': true,
    'orderedList': true,
  },
})

const firebaseConfig = {
  apiKey: "AIzaSyCBdJqwfDdjwB75S2MsjKkJelQdw1ggNUc",
  authDomain: "everhostio.firebaseapp.com",
  databaseURL: "https://everhostio-default-rtdb.firebaseio.com",
  projectId: "everhostio",
  storageBucket: "everhostio.appspot.com",
  messagingSenderId: "355449850402",
  appId: "1:355449850402:web:4ee9935f1cb5e947b1587b",
  measurementId: "G-ZLJS89XE0W"
};

firebase.initializeApp(firebaseConfig);

const app = new Vue({
  router,
  store,
  vuetify,
  wysiwyg,
  render: h => h(App)
})

app.$mount('#app') 


