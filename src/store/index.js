import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import Auth from './auth'
import Org from './org'
import Properties from './properties'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appSite: "http://localhost:5002/"
  },
  getters: {
    getAppSite: state=> state.appSite,

  },
  mutations: {

  },
  actions: {

  },
  modules: {Auth, Org, Properties},
})
