// https://firebase.google.com/docs/auth/web/manage-users

import firebase from 'firebase'
// import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
  state:{
    user: null,
    newUserId: null,
  },
  getters: {
    user: state => state.user,
    isAdmin: state => {
      if( !state.user ) { return false }
      if ( !state.user.rights ) { return false }
      if (state.user.rights.admin) {
        return true
      } else { return false }
    },
    newUserId: state => state.newUserId,

  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserProfile (state, payload) {
      state.userProfile = payload
    },
    setNewUserFromId (state, payload) {
      state.newUserId = payload
    }
  },   
  actions: {
    logout ({commit}) {
      firebase.auth().signOut()
    },
    async createUserWithEmailAndPassword(context, payload) {
      // if ( payload.phoneNumber ) { payload.phoneNumber = `+1${payload.phoneNumber}` }
      const createUser = firebase.functions().httpsCallable('createUser');
      return await createUser(payload)
        .then(console.log)
        .catch(console.error);
    },  
    async resetPassword(context,email){
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
    },
    async getNewUserIDFromEmail(context, email) {
      console.log("getNewUserIDFromEmail", email)
      const getUserFromEmail =  firebase.functions().httpsCallable('getUserObjFromEmail')
      return await getUserFromEmail({email: email})
      .then( (user) => {
        console.log("gotUserIdFromEmail", user.data.uid)
        return user.data.uid
      }).catch( error => {
        console.log("first catch",error)
      })
    }  
  }
}




