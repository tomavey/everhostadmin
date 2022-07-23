// https://firebase.google.com/docs/auth/web/manage-users

import firebase from 'firebase'
// import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
  state:{
    org: {},
    orgStatus: {
      checked: false,
      found: false,
      loading: false
    },
    orgID: null,
    orgs: [],
    members: [],
  },
  getters: {
    org: state=> state.org,
    orgID: state=> state.orgID,
    orgStatus: state=> state.orgStatus,
    orgs: state=> state.orgs,
    members: state=> state.members,
  },
  mutations: {
    setOrg (state, payload) {
      state.org = payload
    },  
    setOrgs (state, payload) {
      state.orgs = payload
    },  
    setOrgID (state, payload) {
      state.orgID = payload
    },  
    setOrgStatus (state,payload) {
      for (var key in payload) { //change only the settings that were input everything else keep the same
        state.orgStatus[key] = payload[key]
      }
    },
    setMembers (state, payload) {
      state.org.members = payload
    },
  },   
  actions: {
    async getOrg({commit, getters}) { 
      commit('setOrgStatus', {loading: true})
      const userID = getters.user.uid
      var docRef = firebase.firestore().collection("organizations");
      console.log("Getting org For",userID)

      docRef.where("members", "array-contains", userID).get().then((docs)=>{
                  console.log("testing ", docs)
                  let obj = null
                  let id = null
                  docs.forEach( (doc) => {
                    obj = doc.data()
                    id = doc.id
                    console.log("found org - if you see more than one there is a problem", obj)
                  })
                  commit('setOrgStatus', {checked: true, loading: false})
                  if (obj !== null) {
                    console.log("Found org", obj.name)
                    commit('setOrg', obj)
                    commit('setOrgID', id)
                    commit('setOrgStatus', {found: true})
                  } else {
                    console.log("No org Found")
                    commit('setOrgStatus', {found: false})
                  }
                })
    },
    async makeOrg(context, payload) {
      context.commit('setOrgStatus', {loading: true})
      var docRef = firebase.firestore().collection("organizations");
      const userID = context.getters.user.uid
      let org = {
        members: [userID],
        creator: userID,
        ...payload
      }
      docRef.add(org).then(() => {
        context.dispatch('getOrg')
      })
    },
    async getOrgs(context) {
      let obj = {}
      var orgsRef = firebase.firestore().collection("organizations")
      return await orgsRef.get()
      .then( docs => {
        let orgsArray = []
        docs.forEach(doc => {
          obj = doc.data()
          obj.orgId = doc.id
          orgsArray.push(obj)
        })
        context.commit("setOrgs", orgsArray)
        return true
      })
    },
    async getOrganization(context, payload) {
      let org = {}
      var orgRef = firebase.firestore().collection("organizations").doc(payload)
      orgRef.get()
      .then( doc => {
        org = doc.data()
        org.orgId = doc.id
        context.commit("setOrg",org)  //set the org in the store  so it can be used in the component
      })
    },
    async addWhiteLabel (context, payload) {
      console.log("Adding White Label", payload)
      let orgRef = firebase.firestore().collection("organizations").doc(payload.orgId)
      let obj = {companyLabel: payload.label}
      console.log("Adding White Label2", obj)
      orgRef.update(obj)
      .then( () => {
        console.log(`White Label - ${obj.companyLabel} added to ${payload.orgId}`)  
      }) 
    },
    async updateOrg (context, payload) {
      console.log("Updating Org", payload)
      let orgRef = firebase.firestore().collection("organizations").doc(payload.orgId)
      let obj = {...payload}
      orgRef.update(obj)
      .then( () => {
        console.log(`Org - ${obj.name} updated`)  
      })   
    },
    async getMembers (context, orgId) {
      let membersArr = []  
      let members = [] //members is an array of user objects
      let orgRef = firebase.firestore().collection("organizations").doc(orgId)
      await orgRef.get()
      .then( doc => {
        membersArr = doc.data().members
        })
      membersArr.forEach( async (member) => {
        let userRef = firebase.firestore().collection("users").doc(member)
        await userRef.get()
        .then( doc => {
          members.push(doc.data())
        })
        console.log("members", members)
      })
      context.commit("setMembers",members)
    },
    async addUserToOrg (context, payload) {
      console.log("Adding User to Org", payload)
      //check is user exists
      // let userExists = await this.$store.dispatch('doesUserExist', payload.uid)
      let usersRef = firebase.firestore().collection('users').doc(payload.uid)
      let userExists = await usersRef.get()
      if (userExists) {
        console.log("Adding Member", payload)
        let orgRef = firebase.firestore().collection("organizations").doc(payload.orgId)
        return await orgRef.update({members: firebase.firestore.FieldValue.arrayUnion(payload.uid)})
        .then( () => {console.log("Member Added")})
      } else {
        console.log("User does not exist")
      }
    }
  }
}