import firebase from 'firebase'

export default{
  namespaced: true,
  state: {
    images: [],
  },
  getters: {
    images: state => state.images.sort( (a,b) => a.sortOrder - b.sortOrder ),
  },
  mutations: {
    setImages (state, payload) {
      state.images = payload
    },
  },
  actions: {
    getImages ( context, property ) {
      console.log("Property: ", property)
      let imagesArray = []
      let propertiesRef = firebase.firestore().collection('properties')
      let imagesRef = propertiesRef.doc(property.propertyId).collection("images")
      imagesRef.get()
      .then( (docs) => {
        if ( docs.size ) {
          docs.forEach( (doc) => {
            let obj = doc.data()
            if ( !obj.DELETED ) {
              obj.KEY = doc.id
              obj.DOCID = doc.id
              imagesArray.push(obj)
            }
          })
          // console.log("resourceArray.length: ", resourceArray.length)
          context.commit('setImages', imagesArray)
        }
      })
      .catch((error) => {
        console.log("Error getting images:", error)
      })
    },

  }
}  