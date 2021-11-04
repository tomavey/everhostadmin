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
    everhostUrl: "https://everhostio.web.app/",
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
        editable: false,
      },
      {
        fieldName: "name",
        validMinLength: 10,
        validType: "string",
        validRegex: "",
        editable: true,
      },
      {
        fieldName: "address",
        validMinLength: 10,
        validType: "string",
        validRegex: "",
        editable: true,
      },
      {
        fieldName: "telephone",
        validMinLength: 3,
        validType: "string",
        validRegex: "",
        editable: true,
      },
      {
        fieldName: "platform",
        validMinLength: 3,
        validType: "string",
        validRegex: "",
        editable: false,
      },
      {
        fieldName: "airbnb",
        validMinLength: 5,
        validType: "binary",
        validRegex: "",
        editable: true,
      },
      {
        fieldName: "vrbo",
        validMinLength: 5,
        validType: "binary",
        validRegex: "",
        editable: true,
      },
    ]
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
    everhostUrl: state => state.everhostUrl,
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
    getProperty(context){
      const propertiesRef = firebase.firestore().collection('properties')
      const propertyId = context.getters.propertyId
      propertiesRef.doc(propertyId).get()
      .then( (doc) => this.commit('setProperty', doc.data()) )
    },
    getMyProperties(context){
      const uid = context.getters.user.data.uid
      const propertiesRef = firebase.firestore().collection('properties')
      propertiesRef.where("uid", "==", uid).get()
      .then( (docs) => {
        let properties = []
        docs.forEach( (doc) => {
          let obj = doc.data()
          if ( obj.createdAt ) {
            obj.dateString = Date(obj.createdAt).toString()
          }
          obj.searchAble = obj.name+obj.propertyId+obj.email
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
    }
  },
  modules: {Auth,ActionsImages},
})
