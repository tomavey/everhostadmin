import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import Auth from './auth'
import Org from './org'
import Properties from './properties'
import GuestData from './guestdata'
import Feedbacks from './feedbacks'



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    devAppSite: "http://localhost:5000/",
    prodAppSite: "https://everhostio.web.app/",
    loading: false,
    feedback: {
      show: false,
    }
  },
  getters: {
    appSite: state=> { 
      if (window.location.hostname === "localhost") {
       return state.devAppSite 
      }
      return state.prodAppSite
    },
    loading: state=> state.loading,
    feedback: state=> state.feedback,
  },
  mutations: {
    setLoading (state,payload) {
      // console.log("setLoading", payload)
      state.loading = payload
    },
    setFeedback (state,payload) {
      for (var key in payload) { //change only the settings that were input everything else keep the same
        state.feedback[key] = payload[key]
      }
    },
  },
  actions: {
    submitFeedback(context, feedback){
      return new Promise((resolve, reject) => {
        var docRef = firebase.firestore().collection("feedbacks");
        feedback.uid = context.getters.user.uid
        feedback.uemail = context.getters.user.email
        docRef.add(feedback).then((ret) => {
          resolve(ret)
        })
      })
    }
  },
  modules: {Auth, Org, Properties, GuestData, Feedbacks},
})
