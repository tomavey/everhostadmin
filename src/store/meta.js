import firebase from 'firebase'

export default {
  state:{
    metaPage: null,
    showWelcomePage: true,
  },
  getters: {
    metaPage: state=> state.metaPage,
    showWelcomePage: state=> state.showWelcomePage,
  },
  mutations: {
    setMetaPage(state, payload){
      state.metaPage = payload
    },
    setShowWelcomePage(state, payload){
      state.showWelcomePage = payload
    },
    toggleWelcomePage(state){
      state.showWelcomePage = !state.showWelcomePage
    },
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
      console.log("getMetaPage", docId)
      return await
      firebase.firestore().collection('meta').doc(docId).get()
      .then(function(doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          context.commit('setMetaPage', doc.data().content)
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
