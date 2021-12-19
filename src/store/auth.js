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
    logout ({commit}) {
      firebase.auth().signOut()
    },
    async signInWithEmailAndPassword({ commit },payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then( (userCredential) => {
        commit('setUser', userCredential)
        return userCredential
      }).catch( error => {
        console.log(error.message)
      })
    },
  }
}

