import firebase from 'firebase'

export default {
  state:{
    supportPage: null,
  },
  getters: {
    supportPage: state=> state.supportPage,
  },
  mutations: {
    setSupportPage(state, payload){
      state.supportPage = payload
    }
  },
  actions: {
    saveSupportPage: function(context, payload){
      let supportObj = {}
      supportObj.content = payload
      supportObj.createdAt = Date.now()

      firebase.firestore().collection('meta').doc("supportPage").set(supportObj)
      .then( console.log("supportObj ",supportObj))
    },
    getSupportPage: async function(context, payload){
      return await
      firebase.firestore().collection('meta').doc("supportPage").get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          context.commit('setSupportPage', doc.data().content)
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }
  }
}
