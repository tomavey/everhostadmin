import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import firebase from 'firebase'
import Auth from './auth'
// import ActionsImages from "./actions-images"
import Images from "./images"
import Subsections from "./subsections.json"
import BasicMetaInfo from "./basicMetaInfo.json"
import Backgrounds from "./backgrounds.json"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //property
    propertyId: null,
    property: {},
    propertyTab: "Welcome",
    properties: [],
    myProperties: [],

    //instructions
    instructions: [],

    //switches 
    error: "",
    loading: false,
    showAllProperties: false,
    showSetPropertyCodeDialog: false,
    devMode: false,
    adminDrawer: null,

    //settings
    host: window.location.host,
    everhostUrl: "https://everhostio.web.app/",
    devUrl: "http://localhost:5000/",

    //forms data
    contentName: null,
    content: "",
    subSections: Subsections,
    basicMetaInfo: BasicMetaInfo,
    backgrounds: Backgrounds,
  },

  getters: {
    //property
    property: state => state.property,
    propertyId: state => {
      if ( state.propertyId ) { return state.propertyId }
      if ( localStorage.getItem("EHPropertyId") ) { return localStorage.getItem("EHPropertyId") }
      return null
    },
    propertyTab: state => state.propertyTab,
    properties: state => state.properties,
    myProperties: state => state.myProperties,

    //instructions
    instructions: state => state.instructions,
    instruction: state => docId => {
      state.instructions.filter( (el) => el.docId === docId )
    },

    //switches
    adminDrawer: state => state.adminDrawer,
    error: state => state.error,
    showSetPropertyCodeDialog: state => state.showSetPropertyCodeDialog,
    loading: state => state.loading,

    //forms data
    subSections: state => state.subSections,
    subSectionsRoutesArray: state => {
      let array = []
      state.subSections.forEach( (el) => array.push(el.docid) )
      return array
    },
    contentName: function(state,getters){
      if ( !state.contentName ) { return getters.firstContentName }
      else { return state.contentName }
    },
    firstContentName: state => state.subSections[0].docid,
    nextContentName: function(state, getters){
      let namesArray = getters.subSectionsRoutesArray
      let i = namesArray.indexOf(getters.contentName)
      if ( i === namesArray.length ) { return "propertieslist" }
      return namesArray[i + 1] 
    },
    basicMetaInfo: state => state.basicMetaInfo,
    backgrounds: state => state.backgrounds,
    basicMetaInfoFieldNamesArray: state => {
      let fieldNamesArray = []
      state.basicMetaInfo.forEach( (el) => fieldNamesArray.push(el.fieldName) )
      return fieldNamesArray
    },

    //settings
    everhostUrl: state => {
      if ( state.host.includes("localhost:") ) { return state.devUrl }
      else { return state.everhostUrl }
    },
    devMode: state => state.devMode,

  },

  mutations: {
    //property
    setPropertyId (state,payload) {
      state.propertyId = payload
    },
    setPropertyTab (state,payload) {
      state.propertyTab = payload
    },
    setProperty (state,payload) {
      state.property = payload
    },
    setProperties (state,payload) {
      state.properties = payload
    },
    setMyProperties (state,payload) {
      state.myProperties = payload
    },

    //instructions
    setInstructions (state,payload) {
      state.instructions = payload
    },

    //forms
    setContent (state, payload) {
      state.content = payload
    },
    setContentName (state, payload) {
      state.contentName = payload
    },

    //images
    setImages (state,payload) {
      state.images = payload
    },

    //switches
    setError (state,payload) {
      state.error = payload
    },
    setLoading (state,payload ) {
      state.loading = payload
    },
    toggleAdminDrawer ( state ) {
      state.adminDrawer = !state.adminDrawer
    },
    toggleShowSetPropertyCodeDialog ( state ) {
      state.showSetPropertyCodeDialog = !state.showSetPropertyCodeDialog
    },
    setShowPropertyCodeDialog ( state, payload ) {
      state.showSetPropertyCodeDialog = payload
    },
    setAdminDrawer ( state, payload ) {
      state.adminDrawer = payload
    },
    clearError ( state ) {
      state.error = ""
    }
  },

  actions: {

    //property
    createUniquePropertyId ( context ) {
      let randomId = Math.floor(1000000 + Math.random() * 9000000)
      const propertiesRef = firebase.firestore().collection('properties')
      propertiesRef.doc(randomId).get()
      .then( (doc) => {
        if (doc.exists) {
          context.dispatch("getUniquePropertyId")
          console.log("exists")
        } else {
          context.commit("setPropertyId", randomId )
          console.log("unique")
        }
      })
    },
    getProperty(context){
      const propertiesRef = firebase.firestore().collection('properties')
      const propertyId = context.getters.propertyId
      propertiesRef.doc(propertyId).get()
      .then( (doc) => this.commit('setProperty', doc.data()) )
    },
    getMyProperties(context){
      const uid = context.getters.user.data.uid
      const propertiesRef = firebase.firestore().collection('properties')
      const backgrounds = context.getters.backgrounds
      console.log(backgrounds)
      propertiesRef.where("uid", "==", uid).get()
      .then( (docs) => {
        let properties = []
        docs.forEach( (doc) => {
          let obj = doc.data()
          if ( obj.createdAt ) {
            obj.dateString = Date(obj.createdAt).toString()
          }
          obj.searchAble = obj.name+obj.propertyId+obj.email+obj.address
          if ( !obj.backgroundColor ) {
            obj.backgroundColor = "purple"
          }
          obj.backgroundImage = backgrounds[obj.backgroundColor].file
          properties.push(obj)
          })
          context.commit("setMyProperties",properties)
        }
      )
    },
    subscribeToProperties(context){
      const properties = []
      let propertiesRef = firebase.firestore().collection('properties')
      propertiesRef.onSnapshot( (docs) => {
        docs.forEach( (doc) => {
          let obj = doc.data()
          if ( obj.createdAt ) {
            let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }
            obj.dateString = new Date(obj.createdAt).toLocaleDateString("en-US", options)
            obj.searchAble = obj.name+obj.propertyId+obj.email
          }
          properties.push(obj)  
        })
      })
      context.commit("setProperties",properties)  
    },
    deleteProperty(context,payload){
      const propertiesRef = firebase.firestore().collection('properties')
      propertiesRef.doc(payload).delete()
      .then( () => console.log("deleted ", payload))
      .catch( (err) => console.log(err) )
    },
    copyProperty(context,payload){
      let {propertyId, newPropertyId} = payload
      console.log(propertyId,newPropertyId)
      const propertiesRef = firebase.firestore().collection('properties')
      propertiesRef.doc(propertyId).get()
      .then( (doc) => {
        let obj = doc.data()
        obj.docId = newPropertyId
        obj.propertyId = newPropertyId
        obj.createdAt = Date.now()
        obj.updatedAt = Date.now()
        propertiesRef.doc(newPropertyId).set(obj)
        .then ( () => {
          console.log( `Copied ${propertyId} to ${newPropertyId}`)
          context.dispatch("getMyProperties")
        })
        .catch( (err) => console.log(err) )
      })
      .catch( (err) => console.log(err) )
    },
    updateProperty(context,payload){
      let obj = payload
      let docId = obj.docId || obj.propertyId
      obj.updatedAt = Date.now()
      const propertiesRef = firebase.firestore().collection('properties')
      propertiesRef.doc(docId).set(obj, {merge: true})
      .then( () => {
        console.log(`Updated ${docId}`)
        context.dispatch('getMyProperties')
      })
    },

    //forms
    setContentNameToNext (context) {
      context.state.contentName = context.getters.nextContentName
    },

    //instructions
    getInstructions(context){
      const instructionsRef = firebase.firestore().collection('instructions')
      instructionsRef.get()
      .then( (docs) => {
        let instructions = []
        docs.forEach( ( doc ) => {
          let obj = {}
          obj.docId = doc.id
          obj.content = doc.data().content
          instructions.push(obj)
        })
        this.commit('setInstructions',instructions)
       } )
    },

    //images
    copyPropertyImages(context,payload){
      let {propertyId, newPropertyId} = payload
      console.log(propertyId,newPropertyId)
      const propertiesRef = firebase.firestore().collection('properties')
      const propertyRef = propertiesRef.doc(propertyId)
      const propertyImagesRef = propertyRef.collection('images')
      propertyImagesRef.get()
      .then( (docs) => {
        docs.forEach( (doc) => {
          let obj = doc.data()
          obj.docId = newPropertyId
          obj.propertyId = newPropertyId
          obj.createdAt = Date.now()
          obj.updatedAt = Date.now()
          propertiesRef.doc(newPropertyId).collection('images').doc().set(obj)
          .then ( () => {
            console.log( `Copied ${propertyId} to ${newPropertyId}`)
            context.dispatch("getMyProperties")
          })
          .catch( (err) => console.log(err) )
          })
      })
      .catch( (err) => console.log(err) )
    },
  },
  modules: {Auth,Images},
})
