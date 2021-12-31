// https://firebase.google.com/docs/auth/web/manage-users

import firebase from 'firebase'
// import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
  state:{
    tenant: {},
    tenantStatus: {
      checked: false,
      found: false,
      loading: false
    },
    tenantID: null
  },
  getters: {
    tenant: state=> state.tenant,
    tenantID: state=> state.tenantID,
    tenantStatus: state=> state.tenantStatus,
  },
  mutations: {
    setTenant (state, payload) {
      state.tenant = payload
    },  
    setTenantID (state, payload) {
      state.tenantID = payload
    },  
    setTenantStatus (state,payload) {
      for (var key in payload) { //change only the settings that were input everything else keep the same
        state.tenantStatus[key] = payload[key]
      }
    },
  },   
  actions: {
    async getTenant({commit, getters}) { 
      commit('setTenantStatus', {loading: true})
      const userID = getters.user.uid
      var docRef = firebase.firestore().collection("tenants");
      console.log("Getting Tenant For",userID)

      docRef.where("members", "array-contains", userID).get().then((docs)=>{
                  console.log("testing ", docs)
                  let obj = null
                  let id = null
                  docs.forEach( (doc) => {
                    obj = doc.data()
                    id = doc.id
                    console.log("found tenant - if you see more than one there is a problem", obj)
                  })
                  commit('setTenantStatus', {checked: true, loading: false})
                  if (obj !== null) {
                    console.log("Found Tenant", obj.name)
                    commit('setTenant', obj)
                    commit('setTenantID', id)
                    commit('setTenantStatus', {found: true})
                  } else {
                    console.log("No Tenant Found")
                    commit('setTenantStatus', {found: false})
                  }
                })
    },
    async makeTenant(context, payload) {
      context.commit('setTenantStatus', {loading: true})
      var docRef = firebase.firestore().collection("tenants");
      const userID = context.getters.user.uid
      let tenant = {
        members: [userID],
        creator: userID,
        ...payload
      }
      docRef.add(tenant).then(() => {
        context.dispatch('getTenant')
      })
    }
  }
}





