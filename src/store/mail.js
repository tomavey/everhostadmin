import firebase from 'firebase'
import WelcomeEmailStyle from '../store/emailStyle.js';

export default {
  state:{
    emailStyle: WelcomeEmailStyle.style,
    bodyTableWrapper: WelcomeEmailStyle.bodyTableWrapper,
    bodyTableEnd: WelcomeEmailStyle.bodyTableEnd,
  },
  getters: {
    emailStyle: state => state.emailStyle,
    emailBodyTableWrapper: state => state.bodyTableWrapper,
    emailBodyTableEnd: state => state.bodyTableEnd,
  },
  mutations: {
  },
  actions: {
    sendMail: function(context, payload){
      let mailObj = {}
      mailObj.to = payload.to
      if ( payload.bcc ){ mailObj.bcc = payload.bcc }
      if ( payload.cc ){ mailObj.cc = payload.cc }
      mailObj.message = {
        subject: payload.subject,
        html: payload.html
      }
      firebase.firestore().collection('mail').add(mailObj)
      .then( console.log("sent mailObj ",mailObj))
    }
  }
}
