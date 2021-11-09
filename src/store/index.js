import Vue from 'vue'
import Vuex from 'vuex'
// import axios from 'axios'
import firebase from 'firebase'
import Auth from './auth'
import ActionsImages from "./actions-images"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    propertyId: null,
    property: {},
    propertyTab: "Welcome",
    properties: [],
    myProperties: [],
    instructions: [],
    error: "",
    loading: false,
    showAllProperties: false,
    showSetPropertyCodeDialog: false,
    devMode: false,
    adminDrawer: null,
    images: [],
    host: window.location.host,
    everhostUrl: "https://everhostio.web.app/",
    devUrl: "http://localhost:5000/",
    contentName: null,
    content: "",
    subSections: [
      {
        tabLabel: "Welcome",
        pageTitle: "Welcome",
        docid: "description"
      },
      {
        tabLabel: "Check-in/Out",
        pageTitle: "Check-in / Out",
        docid: "checkin"
      },
      {
        tabLabel: "Parking",
        pageTitle: "Parking",
        docid: "parking"
      },
      {
        tabLabel: "How To",
        pageTitle: "How To",
        docid: "howto"
      },
      {
        tabLabel: "Amenities",
        pageTitle: "Amenities",
        docid: "amenities"
      },
      {
        tabLabel: "Images",
        pageTitle: "Images",
        docid: "images",
        routeName: "Images"
      },
    ],
    cardItems: [
      {
        title: "Property Info",
        icon: "mdi-home-circle",
        iconColor: "#FFBF00",
        icon: "property-info.svg",
        actionIcon: "mdi-information",
        link: "PropertyInfo",
      },
      // {
      //   title: "House Rules",
      //   icon: "mdi-shield-home",
      //   iconColor: "#27AE62",
      //   actionIcon: "mdi-information",
      //   link: "HouseRules",
      // },
      {
        title: "Area Guide",
        icon: "mdi-table-chair",
        iconColor: "#FE8D91",
        icon: "area-guide.svg",
        actionIcon: "mdi-information",
        link: "AreaGuide",
      },
      {
        title: "Nearby",
        icon: "mdi-map-marker-circle",
        iconColor: "#6E38DD",
        icon: "nearby.svg",
        actionIcon: "mdi-information",
        link: "Nearby",
      },
      {
        title: "Deals",
        icon: "mdi-ticket-account",
        iconColor: "#EF5645",
        icon: "deals.svg",
        actionIcon: "mdi-information",
        link: "Deals",
      },
      {
        title: "Weather",
        icon: "mdi-weather-cloudy",
        iconColor: "#6E38DD",
        icon: "weather.svg",
        actionIcon: "mdi-information",
        link: "Weather"
      }
    ],
  basicMetaInfo: 
    [
      {
        fieldName: "propertyId",
        label: "Property Code",
        validMinLength: 3,
        validType: "string",
        validRegex: "",
        editable: false,
      },
      {
        fieldName: "name",
        label: "Name",
        validMinLength: 10,
        validType: "string",
        validRegex: "",
        editable: true,
      },
      {
        fieldName: "address",
        label: "Address",
        validMinLength: 10,
        validType: "string",
        validRegex: "",
        editable: true,
      },
      {
        fieldName: "telephone",
        label: "Telephone",
        validMinLength: 3,
        validType: "string",
        validRegex: "",
        editable: true,
      },
      {
        fieldName: "platform",
        label: "Platform",
        validMinLength: 3,
        validType: "string",
        validRegex: "",
        editable: false,
      },
      {
        fieldName: "airbnb",
        label: "Airbnb",
        validMinLength: 5,
        validType: "binary",
        validRegex: "",
        editable: true,
      },
      {
        fieldName: "vrbo",
        label: "Vrbo",
        validMinLength: 5,
        validType: "binary",
        validRegex: "",
        editable: true,
      },
      {
        fieldName: "backgroundColor",
        label: "Background Color",
        validMinLength: 5,
        validType: "string",
        validRegex: "",
        editable: true,
      },
    ],
    backgrounds: {
      teal: { 
        label: 'Teal',
        file: '../../assets/img/app-bg-teal.png'
      },
      blue: { 
        label: 'Blue',
        file: '../../assets/img/app-bg-blue.png'
      },
      pink: { 
        label: 'Pink',
        file: '../../assets/img/app-bg-pink.png'
      },
      purple: { 
        label: 'Purple',
        file: '../../assets/img/app-bg-purple.png'
      },
    }
  },
  getters: {
    property: state => state.property,
    propertyId: state => state.propertyId,
    propertyTab: state => state.propertyTab,
    properties: state => state.properties,
    myProperties: state => state.myProperties,
    instructions: state => state.instructions,
    instruction: state => docId => {
      state.instructions.filter( (el) => el.docId === docId )
    },
    adminDrawer: state => state.adminDrawer,
    error: state => state.error,
    showSetPropertyCodeDialog: state => state.showSetPropertyCodeDialog,
    loading: state => state.loading,
    subSections: state => state.subSections,
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
    everhostUrl: state => {
      if ( state.host.includes("localhost:") ) { return state.devUrl }
      else { return state.everhostUrl }
    },
    basicMetaInfo: state => state.basiMetaInfo,
    backgrounds: state => state.backgrounds,
    basicMetaInfoFieldNamesArray: state => {
      let fieldNamesArray = []
      state.basicMetaInfo.forEach( (el) => fieldNamesArray.push(el.fieldName) )
      return fieldNamesArray
    },
    devMode: state => state.devMode,
    images: state => state.images.sort( (a,b) => a.sortOrder - b.sortOrder ),
    cardItems: state => state.cardItems,
    cardItemsRoutesArray: state => {
      let array = []
      state.cardItems.forEach( (el) => array.push(el.link) )
      return array
    },
    subSectionsRoutesArray: state => {
      let array = []
      state.subSections.forEach( (el) => array.push(el.docid) )
      return array
    }
  },
  mutations: {
    setContent (state, payload) {
      state.content = payload
    },
    setContentName (state, payload) {
      state.contentName = payload
    },
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
    setInstructions (state,payload) {
      state.instructions = payload
    },
    setImages (state,payload) {
      state.images = payload
    },
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
    setAdminDrawer ( state, payload ) {
      state.adminDrawer = payload
    },
    clearError ( state ) {
      state.error = ""
    }
  },
  actions: {
    setContentNameToNext (context) {
      context.state.contentName = context.getters.nextContentName
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
          obj.searchAble = obj.name+obj.propertyId+obj.email
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
    }
  },
  modules: {Auth,ActionsImages},
})
