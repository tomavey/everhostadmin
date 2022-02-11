import firebase from 'firebase'


export default {
  state: {
    properties: [],
    propertiesStatus: {
      loading: false,
    }
  },
  getters: {    
    properties: state=> state.properties,
    propertiesStatus: state=> state.propertiesStatus,

  },
  mutations: {
    setProperties (state,payload) {
        state.properties = payload
    },
    setPropertiesStatus (state,payload) {
      for (var key in payload) { //change only the settings that were input everything else keep the same
        state.propertiesStatus[key] = payload[key]
      }
    },
  },
  actions: {
    makeNewProperty(context){
      context.commit('setPropertiesStatus', {loading: true})
      let uid = context.getters.user.uid
      console.log("I'm gonna makeNewProperty", uid)
      const addProperty = firebase.functions().httpsCallable('makeNewProperty')
      return addProperty(uid)
      .then(res => {
        context.commit('setPropertiesStatus', {loading: false})
        console.log("madeNewProperty ",res)
      })
      .catch( err => {
        console.log(err)
        context.commit('setPropertiesStatus', {loading: false})
      })
    },
    getProperties(context){
      return new Promise((resolve, reject) => {

        context.commit("setPropertiesStatus", {loading: true})  
        let tenantID = context.getters.tenantID
        const userId = context.getters.user.uid
        // console.log(userId)
        const propertiesRef = firebase.firestore().collection('properties')
        propertiesRef
        .where("uid", "==", userId)
        .where("deletedAt", "==", null)
        .get()
        .then( (docs) => {
          // console.log(docs.size)
          let properties = []
          docs.forEach( (doc) => {
            let obj = doc.data()
            properties.push(obj)  
          })
          console.log("got the properties ", properties)
          context.commit("setProperties",properties)
          context.commit("setPropertiesStatus", {loading: false})  
          resolve(docs)
        }).catch(err => {
          reject(err)
        })
      })
    },
    subscribeToProperties(context,payload){
      let userId = context.getters.user.uid
      if ( payload && payload.uid ) { userId = payload.uid }
      let showAll = false
      if ( payload && payload.showAll ) { showAll = true }
      let propertiesRef = firebase.firestore().collection('properties')
      .where("deletedAt", "==", null)
      .where("uid","==", userId)

      if ( showAll ) {
        propertiesRef = firebase.firestore().collection('properties')
        .where("deletedAt", "==", null)
      }

      propertiesRef
      .onSnapshot( (docs) => {
        let propertiesArray = []
        docs.forEach( (doc) => {
            let obj = doc.data()
            obj.searchAble = obj.name + obj.city + obj.state + obj.address
            // console.log("obj name ",obj.name)
            propertiesArray = [...propertiesArray, obj]
        })
        console.log("properties ", propertiesArray)
        context.commit("setProperties",propertiesArray)  
      })
    },
    markPropertyDeletedAt(context,propertyId){
      return new Promise((resolve, reject) => {
        context.commit("setPropertiesStatus", {loading: true})  
        console.log("markPropertyDeletedAt", propertyId)
        let obj = {}
        obj.deletedAt = Date.now()
        // console.log('markPropertyDeletedAt',obj)
        const propertyRef = firebase.firestore().collection('properties').doc(propertyId)
        propertyRef.set(obj, { merge:true })
        .then(res => {
          console.log("marked as deleted")
          context.commit("setPropertiesStatus", {loading: false})  
          resolve(res)
        }).catch(err => {
          console.log(err)
          reject(err)
        })  
      })
    },
    markPropertyPublishedAt(content,payload){
      return new Promise((resolve, reject) => {
        // console.log("payld",payload)
        let propertyId = payload.propertyId
        let obj = {}
        if ( payload.publishedAt ) { obj.publishedAt = Date.now() } else { obj.publishedAt = null }
        const propertyRef = firebase.firestore().collection('properties').doc(propertyId)
        propertyRef.set(obj, { merge:true })
        .then( (res) => {
          console.log(`${propertyId} marked published ${payload.publishedAt}` )
          resolve(res)
        }).catch( (err) => {
          console.log(err)
          reject(err)
        })  
      })
    },
  }
}
