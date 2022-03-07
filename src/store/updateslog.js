import firebase from 'firebase'

export default {
  state:{
    updatesLog: []
  },
  getters: {
    updatesLog: state => state.updatesLog
  },
  mutations: {
    setUpdatesLog( state, payload ){
      state.updatesLog = payload
    }
  },
  actions: {
    getUpdateLogs: function({commit}){
      let updatesLog = []
      const updatesLogRef = firebase.firestore().collection('updateslog')
      updatesLogRef.get()
      .then( docs => {
        docs.forEach( doc => {
          let obj = doc.data()
          updatesLog.push(obj)
        })
        console.log("updatesLog ", updatesLog)
        commit('setUpdatesLog', updatesLog)
      })
    }
  }
}
