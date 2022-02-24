// https://firebase.google.com/docs/auth/web/manage-users

import firebase from 'firebase'
// import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
  state:{
    user: null
    
  },
  getters: {
    user: state => state.user,
    isAdmin: state => {
      if( !state.user ) { return false }
      if ( !state.user.rights ) { return false }
      if (state.user.rights.admin) {
        return true
      } else { return false }
    }
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
    async createUserWithEmailAndPassword(context, payload) {
      let email = payload.email
      let password = payload.password
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      console.log("created, ",email)
    },
    async resetPassword(context){
      let email = context.getters.user.email
      console.log("email ", email)
      return await firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        console.log('reset sent')
      })
      .catch((error) => {
       console.log(error)
      })
    },
    async signInWithEmailAndPassword({ commit },payload){
      return await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then( (userCredential) => {
        console.log("signed in ", userCredential.user)
        return true
      }).catch( error => {
        console.log("first catch",error)
        throw error
      })
    },
    logout ({commit}) {
      console.log("logout")
      commit('setLoading', true)
      firebase.auth().signOut()
      commit('setLoading', false)
    },
    async monitorAuth({commit}) {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          console.log("auth State Changed", user)
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          commit('setUser', {
            uid: user.uid,
          })
          // ...
        } else {
          // User is signed out
          // ...
          commit('setUser', null)
        }
      });
    },
    async makeAdmin(context,uid){
      let addAdmin  = firebase.functions().httpsCallable('addAdminRoleByUid')
      let userRef = firebase.firestore().collection("users").doc(uid)
      await addAdmin({'uid': uid})
      await userRef.set({rights: {"admin": true}}, {merge:true})
    }
  }
}





