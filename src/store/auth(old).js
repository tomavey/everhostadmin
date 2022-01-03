import firebase from 'firebase'

export default {
  state:{
    user: {
      loggedIn: false,
      data: null,
    }
  },
  getters: {
    user: state => state.user,
    isAdmin: state => {
      if ( !state.user.data ) { return false }
      if (state.user.data.admin) {
        return true
      } else { return false }
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    },
    SET_ADMIN(state, value) {
      state.user.admin = value
    },
    setUser (state, payload) {
      state.user = payload
    },
    setUserProfile (state, payload) {
      state.userProfile = payload
    },
    setUserDisplayName (state, displayName) {
      state.user.displayName = displayName
    }
  },   
  actions: {
    setUserProfile ({commit}, payload) {
      const uuid = payload.id
      if (uuid) {
        firebase.database().ref('/users/' + uuid).set({
          displayName: payload.displayName,
          phoneNumber: payload.phoneNumber,
          email: payload.email,
          id: uuid
        })
          .then(function () {
            // console.log('after update profile: ' + uuid)
            commit('setLoading', false)
            const newProfile = {
              email: payload.email,
              displayName: payload.displayName,
              phoneNumber: payload.phoneNumber,
              id: uuid
            }
            // console.log('Set This User: ' + JSON.stringify(newProfile))
            commit('setUser', newProfile)
          })
      }
    },
    resetUserPassword ({commit}, payload) {
      firebase.auth().sendPasswordResetEmail(payload.email)
        .then(function(){
          let errorMessage = "A password reset link was sent to " + payload.email
          commit('setError', errorMessage)
        }).catch(function(error) {
          console.log(error)
        })      
    },
    logout ({commit}) {
      console.log("logout")
      commit('setLoading', true)
      firebase.auth().signOut()
      commit('setLoading', false)
    },
    updateUserImageAndProfile ({commit, getters}, payload) {
      if (payload.image) {
        let imageName = payload.image.name
        let storageRef = firebase.storage().ref('/userImages/' + imageName)
        storageRef.put(payload.image)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL()
              .then((url) => {
                payload.imageUrl = url
                commit(('setImageUrl'), url)
              })
              .then(() => {
                firebase.database().ref('/users/' + getters.user.id)
                  .update(payload)
                  .then(() => {
                    commit('setUser', payload)
                  })
                  .catch((error) => {
                    console.log(error)
                  })
              })
              .catch((error) => {
                alert('not uploaded')
                console.log(error)
              })
          })
      } else {
        firebase.database().ref('/users/' + getters.user.id)
          .update(payload)
          .then(() => {
            commit('setUser', payload)
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    updateUserProfile ({commit, getters}, payload) {

      let newProfile = payload
      firebase.database().ref('/users/' + getters.user.id)
        .update(newProfile)
        .then(() => {
          commit('setUser', newProfile)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    //NEW actions
    removeUser( {commit}, user ){
      
      console.log(`${user.uid} was deleted`)
    },
    createUserWithEmailAndPassword( {commit}, payload ) { 
      firebase.auth().signOut().then( () => {
        firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then( () => {
          commit('clearError')
          return true
        })
        .catch( error => {
          console.log("createUserWithEmailAndPasswordError: ",error.message)
          commit('setLoading', false)
          commit('setError', error.message)
        }) 
      })
    },
    signInWithEmailAndPassword({ commit },payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then( () => {
        commit('clearError')
      }).catch( error => {
        console.log(error.message)
        commit('setLoading', false)
        commit('setError', error.message)
      })
    },
    getUserData( {commit}, payload ) {
      firebase.firestore().collection('Users').doc(payload.uid).get().then( doc => {
        const user = doc.data()
        commit("SET_USER", user)
      })
    },
    getUserClaims({ commit }, user){

    },
    fetchUser({ commit }, user) {
        commit("SET_LOGGED_IN", user !== null);
        if (user) {
            user.getIdTokenResult().then((idTokenResult) => {
            user.admin = idTokenResult.claims.admin
            const obj = {}
            obj.email = user.email
            obj.displayName = user.displayName
            obj.uid = user.uid
            obj.admin = user.admin
            console.log("User obj: ", obj)
            commit("SET_USER", obj)
            // this.dispatch("getUserData", obj )          
          })
        } else {
          commit("SET_USER", null);
        }
    },
  }
}

