import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import Auth from './auth'
import Org from './org'
import Properties from './properties'
import GuestData from './guestdata'
import Feedbacks from './feedbacks'
import Mail from './mail'
import Support from './support'
import Users from './users'
import UpdatesLog from './updateslog.js'
import Meta from './meta'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    devAppSite: "http://localhost:5000/",
    prodAppSite: "https://everhost.io/",
    loading: false,
    feedback: {
      show: false,
    },
    alert: {
      show: false,
      message: null,
    },
    confirm: {
      show: false,
      message: null,
    },
    drawer: {
      show: false
    }
  },
  getters: {
    drawer: state=>state.drawer,
    appSite: state=> { 
      if (window.location.hostname === "localhost") {
       return state.devAppSite 
      }
      return state.prodAppSite
    },
    loading: state=> state.loading,
    feedback: state=> state.feedback,
    showAlert: state => state.alert.show,
    alertMessage: state => state.alert.message,
    showConfirm: state => state.confirm.show,
    confirmMessage: state => state.confirm.message,
  },
  mutations: {
    setDrawer(state, payload) {
      for (var key in payload) {
        state.drawer[key] = payload[key]
      }
    },
    setLoading (state,payload) {
      // console.log("setLoading", payload)
      state.loading = payload
    },
    setFeedback (state,payload) {
      for (var key in payload) { //change only the settings that were input everything else keep the same
        state.feedback[key] = payload[key]
      }
    },
    setShowAlert (state,payload){
      state.alert.show = payload
    },
    setAlertMessage (state,payload){
      state.alert.message = payload
    },
    setShowConfirm (state,payload){
      state.confirm.show = payload
    },
    setConfirmMessage (state,payload){
      state.confirm.message = payload
    }
  },
  actions: {
    submitFeedback(context, feedback){
      return new Promise((resolve, reject) => {
        var docRef = firebase.firestore().collection("feedbacks");
        feedback.uid = context.getters.user.uid
        feedback.uemail = context.getters.user.email
        feedback.createdAt = Date.now()
        docRef.add(feedback).then((ret) => {
          resolve(ret)
        })
      })
    }
  },
  modules: {Auth, Org, Properties, GuestData, Feedbacks, Mail, Users, UpdatesLog, Support, Meta},
})
