import firebase from 'firebase'

export default {
  state:{
    feedbacks: []
  },
  getters: {
    feedbacks: state => state.feedbacks,
  },
  mutations: {
    setFeedbacks (state,payload) {
      state.feedbacks = payload
    },
  },
  actions: {
    getFeedbacks: function(context,uid){
      console.log("uid ", uid)
      const guestDataRef = firebase.firestore().collection("feedbacks")
      .get()
      .then( (docs) => {
        let feedbacks = []
        docs.forEach(doc => {
          let obj = doc.data()
          feedbacks.push(obj)
        })
        context.commit("setFeedbacks", feedbacks)
      })
    }
  }
}
