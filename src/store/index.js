import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import Auth from './auth'
import Org from './org'
import Properties from './properties'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appSite: "http://localhost:5002/",
    loading: false
  },
  getters: {
    appSite: state=> state.appSite,
    loading: state=> state.loading,
  },
  mutations: {
    setLoading (state,payload) {
      console.log("setLoading", payload)
      state.loading = payload
  },
  },
  actions: {

  },
  modules: {Auth, Org, Properties},
})
