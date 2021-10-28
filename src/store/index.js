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
    instructions: [],
    error: "",
    loading: false,
    devMode: false,
    adminDrawer: null,
    images: [],
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
        validMinLength: 3,
        validType: "string",
        validRegex: "",
      },
      {
        fieldName: "name",
        validMinLength: 10,
        validType: "string",
        validRegex: "",
      },
      {
        fieldName: "address",
        validMinLength: 10,
        validType: "string",
        validRegex: "",
      },
      {
        fieldName: "platform",
        validMinLength: 3,
        validType: "string",
        validRegex: "",
      },
      {
        fieldName: "telephone",
        validMinLength: 3,
        validType: "string",
        validRegex: "",
      },
      {
        fieldName: "airbnb",
        validMinLength: 5,
        validType: "binary",
        validRegex: "",
      },
      {
        fieldName: "vrbo",
        validMinLength: 5,
        validType: "binary",
        validRegex: "",
      },
    ]
  },
  getters: {
    property: state => state.property,
    propertyId: state => state.propertyId,
    propertyTab: state => state.propertyTab,
    properties: state => state.properties,
    instructions: state => state.instructions,
    instruction: state => docId => {
      state.instructions.filter( (el) => el.docId === docId )
    },
    adminDrawer: state => state.adminDrawer,
    error: state => state.error,
    loading: state => state.loading,
    subSections: state => state.subSections,
    basicMetaInfo: state => state.basicMetaInfo,
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
      state.adminDrawer = !getters.adminDrawer
    },
    clearError ( state ) {
      state.error = ""
    }
  },
  actions: {
    getProperty(context){
      const propertiesRef = firebase.firestore().collection('properties')
      const propertyId = context.getters.propertyId
      propertiesRef.doc(propertyId).get()
      .then( (doc) => this.commit('setProperty', doc.data()) )
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
      const propertiesRef = firebase.firestore().collection('properties')
      propertiesRef.onSnapshot( (docs) => {
        context.commit("setProperties","")        
        docs.forEach( (doc) => {
          let obj = doc.data()
          properties.push(obj)  
        })
        context.commit("setProperties",properties)  
      })
    },
    deleteProperty(context,payload){
      const propertiesRef = firebase.firestore().collection('properties')
      propertiesRef.doc(payload).delete()
      .then( () => console.log("deleted ", payload))
      .catch( (err) => console.log(err) )
    }
  },
  modules: {Auth,ActionsImages},
})
