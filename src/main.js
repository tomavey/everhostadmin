import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import wysiwyg from 'vue-wysiwyg'

import CKEditor from 'ckeditor4-vue'

import ehcPage from '@/components/ehc-page.vue'
import ehcForm from '@/components/ehc-form.vue'
import ehcDialog from '@/components/ehc-dialog.vue'
import ehcDrawer from '@/components/ehc-drawer.vue'
import ehcButton from '@/components/ehc-btn.vue'
import ehcButtonSmall from '@/components/ehc-button-small.vue'

import VueTheMask from 'vue-the-mask'




Vue.component('ehc-page', ehcPage)
Vue.component('ehc-form', ehcForm)
Vue.component('ehc-dialog', ehcDialog)
Vue.component('ehc-drawer', ehcDrawer)
Vue.component('ehc-btn', ehcButton)
Vue.component('ehc-button-small', ehcButtonSmall)


  
Vue.use(VueTheMask)


Vue.config.productionTip = false

Vue.use(CKEditor)

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

const firebaseConfigDev = {
  apiKey: "AIzaSyD_b46PYlea0ZdTl-op1vyezssQyrSteTM",
  authDomain: "dev-everhostio.firebaseapp.com",
  projectId: "dev-everhostio",
  storageBucket: "dev-everhostio.appspot.com",
  messagingSenderId: "333205235104",
  appId: "1:333205235104:web:b2e0a905dc7ecc929570c5"
};

firebase.initializeApp(firebaseConfig)

const analytics = firebase.analytics()

const app = new Vue({
  router,
  store,
  vuetify,
  wysiwyg,
  render: h => h(App)
})

app.$mount('#app') 


