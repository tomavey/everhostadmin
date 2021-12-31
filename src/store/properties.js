import firebase from 'firebase'


export default {
  state: {
    properties: [],
    propertiesLoading: false,
  },
  getters: {    
    properties: state=> state.properties,
    propertiesLoading: state=> state.propertiesLoading,

  },
  mutations: {
    setProperties (state,payload) {
        state.properties = payload
    },
    setPropertiesLoading (state,payload) {
        state.propertiesLoading = payload
    },
  },
  actions: {
    makeNewProperty(context){
        // console.log("oncall")
        let uid = context.getters.user.uid
        // console.log('makeNewProperty', uid)
        const addProperty = firebase.functions().httpsCallable('makeNewProperty')
        addProperty(uid)
        .then( (res) => {
            context.dispatch('getProperties')
            console.log("makeNewProperty ",res)
        })
    },
    getProperties(context){
        context.commit("setPropertiesLoading", true)
        let tenantID = context.getters.tenantID
        const userId = context.getters.user.uid
        // console.log(userId)
        const propertiesRef = firebase.firestore().collection('properties')
        propertiesRef.where("uid", "==", userId).get()
        .then( (docs) => {
          // console.log(docs.size)
          let properties = []
          docs.forEach( (doc) => {
            let obj = doc.data()
            properties.push(obj)  
          })
          console.log("got the properties ", properties)
          context.commit("setProperties",properties)
          context.commit("setPropertiesLoading", false)  
        })
    },
  },
}
