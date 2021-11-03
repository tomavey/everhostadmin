import firebase from 'firebase'

export default{
  actions: {
    getImages(context,payload){
      let images = []
      const imagesRef = firebase.firestore().collection('properties')
      imagesRef.doc(payload).collection("images").get()
      .then ( (docs) => {
        docs.forEach( (doc) => {
          let obj = doc.data()
          obj.docid = doc.id
          images.push(obj)
        })
        this.commit('setImages', images) 
      })
    },
    submitImage(context,payload){
      console.log("Payload: ",payload)
      const imagesRef = firebase.firestore().collection('properties')
      imagesRef.doc(payload.propertyId).collection("images").doc(payload.docid).set(payload, {merge:true})
      .then( ()=> console.log("image saved",payload) )
      .catch( (err)=> console.log(err) )
    },
    deleteImage(context,payload){
      const imagesRef = firebase.firestore().collection('properties')
      imagesRef.doc(payload.propertyId).collection("images").doc(payload.docid).delete()
      .then( ()=> console.log("image deleted") )
      .catch( (err)=> console.log(err) )
    },
    moveImageUp(context,payload){
      payload.sortOrder = payload.sortOrder - 1.5
      context.dispatch("submitImage", payload)
    },
    moveImageDown(context,payload){
      payload.sortOrder = payload.sortOrder + 1.5
      context.dispatch("submitImage", payload)
    },
    reOrderImages(context,payload){
      let obj = context.getters.images
      let counter = 1
      obj.forEach(function(el){
        el.sortOrder = counter
        el.propertyId = context.getters.propertyId
        context.dispatch("submitImage", el)
        counter++
      })
      // console.log(obj)
    },
    setAsHomeImage(context,image){
      // console.log("DocId: ",docid)
      let docid = image.docid
      let obj = {}
      obj.homeImage = true
      let propertyId = context.getters.propertyId
      const propertiesRef = firebase.firestore().collection('properties')
      const propertyRef = propertiesRef.doc(propertyId)
      const imageRef = propertyRef.collection("images").doc(docid)
      imageRef.set(obj, {merge:true})
      .then( ()=> console.log("image made default ",docid) )
      .then( () => {
        propertyRef.set({homeImage: image.src}, {merge:true})
      } )
      .catch( (err)=> console.log(err) )
    },
    clearAllHomeImageFields(context){
      let obj = context.getters.images
      obj.forEach(function(el){
        el.homeImage = false
        el.propertyId = context.getters.propertyId
        context.dispatch("submitImage", el)
      })
      console.log(obj)
    }
  },
}
