import firebase from 'firebase'

export default {
  state:{
    guests: []
  },
  getters: {
    guests: state => state.guests
  },
  mutations: {
    setGuests (state,payload) {
      state.guests = payload
    },
  },
  actions: {
    getGuests: function(context){
      const guestDataRef = firebase.firestore().collection("guests").get()
      .then( (docs) => {
        let guests = []
        docs.forEach(doc => {
          let obj = doc.data()
          guests.push(obj)
        })
        context.commit("setGuests", guests)
      })
    }
  }
}
