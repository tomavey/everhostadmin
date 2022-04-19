import firebase from 'firebase'

export default {
  state:{
    metaPage: null,
  },
  getters: {
    metaPage: state=> state.metaPage,
  },
  mutations: {
    setMetaPage(state, payload){
      state.metaPage = payload
    }
  },
  actions: {
    saveMetaPage: function(context, payload){
      let docId = payload.docId
      let metaObj = {}
      metaObj.content = payload.content
      metaObj.createdAt = Date.now()

      firebase.firestore().collection('meta').doc(docId).set(metaObj)
      .then( console.log("metaObj ",metaObj))
    },
    getMetaPage: async function(context, payload){
      let docId = payload
      return await
      firebase.firestore().collection('meta').doc(docId).get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          context.commit('setmetaPage', doc.data().content)
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
