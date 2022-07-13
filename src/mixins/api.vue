<script>
import firebase from 'firebase'


export default {
  data () {
    return {

    }
  },
  created() {
  },
  methods:{
      async apiGetUser(id) {
        console.log("apiGetUser", id)
        const userRef = firebase.firestore().collection('users').doc(id)
        return await userRef.get().then((doc) => {
            if (doc.exists) {
                let user = doc.data()
                console.log("got user", user)
                return user
            } else {
                console.log("user does not exist")
            }
        })
      },
      async apiUpdateUser(id, payload) {
        console.log("apiUpdateUser", id, payload)
        const userRef = firebase.firestore().collection('users').doc(id)

        return await userRef.update(payload).then((resp) => {
          console.log('apiUpdateUser success!', resp)
          return true
        })
      },
      async apiUpdateProperty(id, payload) {
        console.log("apiUpdateProperty", id, payload)
        const propRef = firebase.firestore().collection('properties').doc(id)

        return await propRed.update(payload).then((resp) => {
          console.log("apiUpdateProperty success", resp)
          return true
        })
      },
      async apiGetDoc(collection, docID) {
        console.log("apiGetDoc", collection, docID)

        const docRef = firebase.firestore().collection(collection).doc(docID) 
        return await docRef.get().then((doc) => {
            if (doc.exists) {
                let data = doc.data()
                console.log("got doc", data)
                return data
            } else {
                console.log("data doesn't exist")
            }
        })
      },
      async apiUpdateDoc(collection, docID, payload){
        console.log("apiUpdateDoc", collection, docID)

        const docRef = firebase.firestore().collection(collection).doc(docID) 

        return await docRef.update(payload).then((resp) => {
          console.log("updated", resp)
          return true
        })
      },


      async apiGetAppSettings() {
        console.log("apiGetAppSettings") 

        await this.apiGetDoc("settings", "globalAppSettings").then((data) => {
          console.log("commit app settings", data)
          
            console.log("commit app settings")
            this.$store.commit('setAppSettings', data)
        })
      },
      async apiUpdateAppSettings(payload) {
        console.log("apiUpdateAppSettings")
        this.apiUpdateDoc("settings", "globalAppSettings",payload).then((data)  => {
          this.apiGetAppSettings()
        })
      }



  },
  computed: {

  }
}
</script>