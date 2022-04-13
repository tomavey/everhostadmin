import firebase from 'firebase'

export default {
  state:{
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    saveSupportDoc: function(context, payload){
      let supportObj = {}
      supportObj.content = payload
      supportObj.createdAt = Date.now()

      firebase.firestore().collection('meta').doc("supportdoc").set(supportObj)
      .then( console.log("supportObj ",supportObj))
    }
  }
}
