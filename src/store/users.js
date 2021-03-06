import firebase from 'firebase'

export default {
  state:{
    users: [],
    user: {},
  },
  getters: {
    users: state => state.users,
    user: state => state.user
  },
  mutations: {
    setUsers(state,payload) {
      state.users = payload
    },
    setUser(state,payload) {
      state.user = payload
    }
  },
  actions: {
    getUsers: function(context){
      const usersRef = firebase.firestore().collection('users').get()
        .then(docs => {
          let usersArray = []
          docs.forEach( doc => {
            let user = doc.data()
            if ( !user.deletedAt ) {
              usersArray.push(user)
            }
          });
          context.commit('setUsers',usersArray)
        })
    },
    subscribeToUsers: function(context){
      const usersRef = firebase.firestore().collection('users')
      usersRef.onSnapshot( docs => {
        let usersArray = []
        docs.forEach( doc => {
          let user = doc.data()
          //zdPoborxuEgOHo8x1CwlfwUGgWJ2 = check for this uid in users collection and authentication
          if ( user.uid ){
            usersArray.push(user)
          }
        })
        context.commit('setUsers',usersArray)
      })
    },
    getUser: function(context, uid){
      const usersRef = firebase.firestore().collection('users').doc(uid).get()
        .then(doc => {
            let user = doc.data()
            context.commit("setUser", user)
          });
    },
    doesUserExist: async function(context, uid){
      console.log("doesUserExist: ", uid)
      const usersRef = firebase.firestore().collection('users').doc(uid)
      return await usersRef.get()
        .then(doc => {
          if ( doc.exists ) {
            return true
          } else {
            return false
          }
        });
    }
  }
}
