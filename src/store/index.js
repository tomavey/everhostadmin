import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import Auth from './auth'
import Tenant from './tenant'
import Properties from './properties'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {Auth, Tenant, Properties},
})
