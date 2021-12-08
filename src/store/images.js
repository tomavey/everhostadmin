import firebase from 'firebase'

const newUrl = function(url){
  const dimensions = "300x300"
  const extIndex = url.lastIndexOf('.');
  const ext = url.substring(extIndex);
  return `${url.substring(0, extIndex)}_${dimensions}${ext}`;
}

export default{
  state: {
    images: [],
    percentageUploaded: 0,
  },
  getters: {
    images: state => state.images.sort( (a,b) => a.sortOrder - b.sortOrder ),
  },
  mutations: {
    setImages (state, payload) {
      state.images = payload
    },
    setPercentageUploaded (state, payload) {
      state.percentageUploaded = payload
    },
  },
  actions: {
    deleteImageDocument(context,payload){
      console.log("image obj to delete: ", payload)
      const propertyId = context.rootGetters.propertyId
      const imageDocumentsRef = firebase.firestore().collection('properties').doc(propertyId).collection('images')
      imageDocumentsRef.doc(payload.DOCID).delete()
      .then( ()=> console.log("image deleted: ", payload.DOCID) )
      .then( () => context.dispatch('deleteImage',payload) )
      .catch( (err)=> console.log(err) )
    },
    deleteImage( context, imageObj ){
      console.log("deleteImage: ", imageObj)
      let fileName = imageObj.fileName
      console.log(fileName)
      let storageRef = firebase.storage().ref(`/images/${fileName}`)
      storageRef.delete()
      .then( () => context.dispatch('getImages') )
      .catch( (err)=> console.log(err) )
    },
    storeImage ({commit, dispatch}, payload) {
      console.log("Payload: ", payload)
      commit('setLoading', true)
      let databaseRef = firebase.firestore().collection('properties').doc(payload.propertyId).collection('images')
      let storageRef = firebase.storage().ref('/images/' + payload.fileName)
      // console.log(databaseRef)
      let thisDatabaseRef = ''
      if (payload.file) {
        payload.fileName = payload.file.name
        let task = storageRef.put(payload.file)
        task.on('state_changed', 
          function progess (snapshot) {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100   
            commit('setPercentageUploaded', percentage)
          },
          function error(err){

          },
          function complete() {

          })
        task
          .then((snapshot) => {
            snapshot.ref.getDownloadURL()
              .then((url) => {
                payload.fileUrl = newUrl(url)
                console.log("then: ",url)
              })
          .then(() => {
              payload.file = null
              payload.base64 = null
              payload.fileName = newUrl(payload.fileName)
              databaseRef.doc().set(payload)
              .then( () => {
                console.log("property image record created") 
                dispatch('getImages')
              })
              .catch( err => console.log(err) )
          })
          .then( function() { commit('setLoading', false)} )
          .catch((error) => {
            console.log(error)
          })
        })
      } else {
        databaseRef.add(payload).catch((error) => { console.log(error) })
      }
      commit("setLoading",false)
    },
    getImages ( context ) {
      let propertyId = context.rootGetters.propertyId
      console.log("Property Id: ", propertyId)
      let imagesArray = []
      let propertiesRef = firebase.firestore().collection('properties')
      let imagesRef = propertiesRef.doc(propertyId).collection("images")
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