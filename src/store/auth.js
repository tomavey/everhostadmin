// https://firebase.google.com/docs/auth/web/manage-users

import firebase from 'firebase'
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
  state:{
    user: null
  },
  getters: {
    user: state => state.user,
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserProfile (state, payload) {
      state.userProfile = payload
    },
  },   
  actions: {
    logout ({commit}) {
      firebase.auth().signOut()
    },
    async signInWithEmailAndPassword({ commit },payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then( (userCredential) => {
        console.log("signed in ", userCredential.user)
        return userCredential.user
      }).catch( error => {
        console.log(error.message)
      })
    },
    async monitorAuth({commit}) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          console.log("auth State Changed", user)
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          commit('setUser', user)
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
    }
  }
}

