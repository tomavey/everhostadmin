import firebase from 'firebase'

export default {
  state:{
    guests: []
  },
  getters: {
    guests: state => state.guests,
  },
  mutations: {
    setGuests (state,payload) {
      state.guests = payload
    },
  },
  actions: {
    getGuests: function(context,uid){
      console.log("uid ", uid)
      const guestDataRef = firebase.firestore().collection("guests")
      .where("propertyUid", "==", uid).get()
      .then( (docs) => {
        let guests = []
        docs.forEach(doc => {
          let obj = doc.data()
          guests.push(obj)
        })
        context.commit("setGuests", guests)
      })
    },
    setGuestInfoSwitchOnProperty: function(context, payload){
      console.log("payload ", payload.noguestinfo)
      payload.noguestinfo = !payload.noguestinfo
      console.log("payload after ", payload.noguestinfo)
      firebase.firestore().collection("properties")
      .doc(payload.propertyId).set(payload  , { merge: true })
      .then( () => {
        console.log("property set to info saved")
      })
    },
    moveGuestDataToUser: async function(context, payload){
      console.log("payload ", payload)
      let guestsRef = firebase.firestore().collection("guests")
      await guestsRef.where("propertyId", "==", payload.propertyId).get()
      .then( (docs) => {
        docs.forEach(doc => {
          let obj = doc.data()
          obj.propertyUid = payload.uid 
          console.log("obj ", obj)
          firebase.firestore().collection("guests").doc(doc.id).set(obj  , { merge: true })  
        })
        return "done"
      })
      .catch( err => console.log(err))
    }
  }

}
