import firebase from 'firebase'

export default {
  state:{
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    sendMail: function(context, payload){
      let mailObj = {}
      mailObj.to = payload.to
      mailObj.message = {
        subject: payload.subject,
        html: payload.html
      }
      firebase.firestore().collection('mail').add(mailObj)
      .then( console.log("mailObj ",mailObj))
    }
  }
}
