import firebase from 'firebase'

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
      .then( () => context.dispatch('deleteImage',payload))
      .catch( (err)=> console.log(err) )
    },
    deleteImage( context,imageObj ){
      let fileName = imageObj.fileName.replace(/\.[^/.]+$/, "")
      console.log(fileName)
      let storageRef = firebase.storage().ref(`/images/${fileName}_300x300.jpeg`)
      storageRef.delete()
    },
    storeImage ( context, imageObj ) {
      let imageFile = imageObj.file
      console.log("store image: ", imageFile)
      imageObj.fileName = imageObj.file.name
      let storageRef = firebase.storage().ref('/images/' + imageObj.fileName)
      let task = storageRef.put(imageObj.file)
      task.on('state_changed', 
        function progess (snapshot) {
          let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100   
          context.commit('setPercentageUploaded', percentage)
        },
        function error(err){
          console.log(err)  
        },
        function complete() {
          context.commit('setLoading', false)
        })
        task.then((snapshot) => {
          snapshot.ref.getDownloadURL()
            .then((url) => {
              imageObj.fileUrl = url
              console.log("ImageObj: ",imageObj)
            })
          })      
        .then( context.dispatch("putImageDocument", imageObj) )          
    },
    putImageDocument ( context, imageObj ) {
      imageObj.file = null
      console.log("new imageObj: ", imageObj)
      let propertiesRef = firebase.firestore().collection("properties")
      let propertyId = context.getters.propertyId
      let propertyRef = propertiesRef.doc(propertyId)
      let propertyImagesRef = propertyRef.collection("images")
      propertyImagesRef.doc().set(imageObj, {merge: true})
      .then( (doc) => console.log("Doc: ", doc))
      .catch( (err) => console.log(err) )
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