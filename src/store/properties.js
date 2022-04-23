import firebase from 'firebase'


export default {
  state: {
    properties: [],
    property: {},
    propertiesStatus: {
      loading: false,
    },
    uidToShowAdmin: null,
    showAll: false,
    showAllLoading: false,
    areaguide: [],
    propertyinfo: [],
    defaultPropertyId: "default12821"
  },
  getters: {    
    properties: state=> state.properties,
    propertiesStatus: state=> state.propertiesStatus,
    property: state => state.property,
    uidToShowAdmin: state=> state.uidToShowAdmin,
    showAll: state=> state.showAll,
    showAllLoading: state=> state.showAllLoading,
    defaultPropertyId: state => state.defaultPropertyId
  },
  mutations: {
    setProperties (state,payload) {
        state.properties = payload
    },
    setProperty (state,payload) {
      state.property = payload
    },
    setPropertiesStatus (state,payload) {
      for (var key in payload) { //change only the settings that were input everything else keep the same
        state.propertiesStatus[key] = payload[key]
      }
    },
    setUidToShowAdmin (state,payload) {
      state.uidToShowAdmin = payload
    },
    setShowAll (state,payload) {
      state.showAll = payload
    },
    setShowAllLoading (state,payload) {
      state.showAllLoading = payload
    },
    setPropertyinfo (state,payload) {
      state.propertyinfo = payload
    },
    setAreaguide (state,payload) {
      state.areaguide = payload
    },
  },
  actions: {
    makeNewProperty(context){
      context.commit('setPropertiesStatus', {loading: true})
      let uid = context.getters.user.uid
      let orgid = context.getters.orgID
      let orgName = context.getters.org.name
      let obj = {
        'uid': uid,
        'orgid': orgid,
        'orgName': orgName
      }
      console.log("I'm gonna makeNewProperty", obj)
      const addProperty = firebase.functions().httpsCallable('makeNewProperty') 
      return addProperty(obj)
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
      console.log("subscribeToProperties ", payload)
      let userId = context.getters.user.uid
      if ( payload && payload.uid ) { userId = payload.uid }
      let userIsAdmin = context.getters.isAdmin
      if ( payload && payload.showAll ) { showAll = true }
      let propertiesRef = firebase.firestore().collection('properties')
      .where("deletedAt", "==", null)
      .where("uid","==", userId)

      if ( userIsAdmin ) {
        propertiesRef = firebase.firestore().collection('properties')
        .where("deletedAt", "==", null)
      }

      propertiesRef
      .onSnapshot( (docs) => {
        let propertiesArray = []
        docs.forEach( (doc) => {
            let obj = doc.data()
            obj.searchAble = obj.name + obj.city + obj.state + obj.address + obj.propertyId + obj.uid
            // console.log("obj name ",obj.name)
            propertiesArray = [...propertiesArray, obj]
        })
        // console.log("properties ", propertiesArray)
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
          // console.log("marked as deleted")
          context.commit("setPropertiesStatus", {loading: false})  
          resolve(res)
        }).catch(err => {
          console.log(err)
          reject(err)
        })  
      })
    },
    markPropertyPublishedAt(context,payload){
      return new Promise((resolve, reject) => {
        console.log("payld",payload)
        let propertyId = payload.propertyId
        let obj = {}
        if ( payload.publishedAt ) { obj.publishedAt = Date.now() } else { obj.publishedAt = null }
        const propertyRef = firebase.firestore().collection('properties').doc(propertyId)
        propertyRef.set(obj, { merge:true })
        .then( (res) => {
          console.log(`${propertyId} marked published ${obj.publishedAt}` )
          resolve(res)
        }).catch( (err) => {
          console.log(err)
          reject(err)
        })  
      })
    },
    copyProperty(context,payload){
      console.log('payload ',payload)
      context.commit('setPropertiesStatus', {loading: true})
      let obj = {
        'propertyId': payload.propertyId   
      }
      const copyProperty = firebase.functions().httpsCallable('copyProperty')
      return copyProperty( obj )
      .then(res => {
        context.commit('setPropertiesStatus', {loading: false})
        // console.log("copyProperty ",payload)
      })
      .catch( err => {
        console.log(err)
        context.commit('setPropertiesStatus', {loading: false})
      })

    },
    getProperty(context, propertyId){
      return new Promise((resolve, reject) => {
        console.log("getting property")
        const propertiesRef = firebase.firestore().collection('properties')
        propertiesRef.doc(propertyId).get()
        .then( (doc) => {
          let obj = doc.data()
          console.log("got property", obj)
          this.commit('setProperty', obj) 
          resolve(doc)
        })
      })
    },
    getCustomSubsections(context,payload){
      let type = payload.type
      let propertyId = payload.propertyId

      const propertySubsectionsRef = firebase.firestore().collection("properties").doc(propertyId).collection(type).doc('subsections')
      propertySubsectionsRef.get()
      .then( (doc) => {
        let sections = []
        let obj = doc.data()
        Object.keys(obj).forEach(key => {
        sections.push(obj[key])
        })      
        if ( type === "propertyinfo" ) { context.commit('setPropertyinfo',sections) }
        if ( type === "areaguide" ) { context.commit('setAreaguide',sections) }
      })
      .catch ( (err) => console.log(err) )
    },
    updatePropertyUid(context,payload){
      let propertyId = payload.propertyId
      let uid = payload.uid
      let obj = {}
      obj.uid = uid
      const propertyRef = firebase.firestore().collection('properties').doc(propertyId)
      propertyRef.set(obj, { merge:true })
      .then( (res) => {
        console.log(`${propertyId} uid updated ${uid}` )
      }).catch( (err) => {
        console.log(err)
      })  
    },
    async isPropertyMine(context,payload){
      let propertyId = payload.propertyId
      let uid = payload.uid
      let isMine = false
      const propertiesRef = firebase.firestore().collection('properties')
      await propertiesRef.doc(propertyId).get()
      .then( (doc) => {
        let obj = doc.data()
        if ( obj.uid === uid ) { isMine = true }
        console.log("isPropertyMine? ", isMine)
        return isMine
      })
    },
    async doesPropertyExist(context,propertyId){
      const propertiesRef = firebase.firestore().collection('properties')
      return await propertiesRef.doc(propertyId).get()
      .then( (doc) => {
        if (doc.exists) { return true }
        else { return false }
      })
    }
  }
}
