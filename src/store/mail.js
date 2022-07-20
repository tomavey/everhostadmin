import firebase from 'firebase'
import WelcomeEmailStyle from '../store/emailStyle.js';

export default {
  state:{
    emailStyle: WelcomeEmailStyle.style,
  },
  getters: {
    emailStyle: state => state.emailStyle,
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
      .then( console.log("sent mailObj ",mailObj))
    }
  }
}
