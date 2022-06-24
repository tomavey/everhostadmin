const functions = require("firebase-functions");
const admin = require('firebase-admin');
const { auth } = require("firebase-admin");
admin.initializeApp();

//Create references to firestore
let db = admin.firestore();
let usersRef = db.collection("users")

exports.addAdminRole = functions.https.onCall( (data, context) => {
  console.log(data)
  return admin.auth().getUserByEmail(data.email).then(user => {
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true
    })
    .then( () => {
      console.log(`Success! ${data.email} has been made admin`)
      return user
    })
  })
  .catch( (error) => {
    console.log(error)
    return error
  })
})

exports.getUserObjFromEmail = functions.https.onCall((data, context) => {
  return admin.auth().getUserByEmail(data.email)
    .then( (user) => {
      return user
    })
    .catch( (err) => {
      return err
    })  
})

exports.addAdminRoleByUid = functions.https.onCall( (data, context) => {
  console.log(data)
    return admin.auth().setCustomUserClaims(data.uid, {
      admin: true
    })
    .then( () => {
      console.log(`Success! ${data.uid} has been made admin`)
      return data
    })
    .catch( (error) => {
      console.log(error)
      return error
    })
})

exports.makeUser = functions.auth.user()
  .onCreate( (user) => {
    const obj = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      phoneNumber: user.phoneNumber,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: user.metadata.creationTime,
    }
    usersRef.doc(user.uid).set(obj,{ merge: true })
    .then(() => {
      if ( user.email.includes("charisfellowship.us") ) {
        admin.auth().setCustomUserClaims(user.uid, {
          admin: true
        }).then( () => {
          console.log(`Success: ${user.email} has been made an admin`)
        }).catch ( (err) => {
          console.log(err)
        })
      }
    }) 
    .then(() => {
      console.log("User Document Created")
    })
    .catch( (err) => console.log(err) )
})

exports.deleteUser = functions.https.onCall( (data,context) => {
  console.log("data :", data)
  return admin.auth().deleteUser(data.uid)
})

exports.removeUserDataOnDelete = functions.auth.user().onDelete((user) => {
  usersRef.doc(user.uid).delete().then(() => {
      console.log("user deleted")
    })
  }
)