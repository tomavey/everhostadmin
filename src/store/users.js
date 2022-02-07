import firebase from 'firebase'

export default {
  state:{
    users: [],
  },
  getters: {
    users: state => state.users
  },
  mutations: {
    setUsers(state,payload) {
      state.users = payload
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
  }
}
