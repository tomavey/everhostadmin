import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import wysiwyg from 'vue-wysiwyg'

Vue.config.productionTip = false

Vue.use(wysiwyg, {
  hideModules: {
    'link': true,
    'code': true,
    'image': true,
    'table': true,
    'forcePlainTextOnPaste': true,
  }
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


firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
          unsubscribe();
          resolve(user);
      }, reject);
  })
};

let isAuthenticated = firebase.auth().currentUser

const app = new Vue({
  router,
  store,
  vuetify,
  wysiwyg,
  render: h => h(App)
})

firebase.auth().onAuthStateChanged(user => {
  console.log("onAuthStateChanged: ", user)
  store.dispatch("fetchUser", user)
  .then( app.$mount('#app') )
});
