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
      // takes an array of user ID's and returns a array of objects with user info
      async apiGetListOfUsers(uidList) {
        console.log("apiGetListOfUsers", uidList) 
        let members= []

        uidList.forEach( async (member) => {
        let userRef = firebase.firestore().collection("users").doc(member)
        await userRef.get()
            .then( doc => {
              members.push(doc.data())
            })
          })
        return members
      },



      async apiUpdateProperty(id, payload) {
        console.log("apiUpdateProperty", id, payload)
        const propRef = firebase.firestore().collection('properties').doc(id)

        return await propRed.update(payload).then((resp) => {
          console.log("apiUpdateProperty success", resp)
          return true
        })
      },

//GENERIC get and update doc by ID
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

//Gets list of docs  
      //takes collection name and conditions and order by returns array of objects
      async apiGetDocs(collection) {
        console.log("apiGetDocs", collection)
        const docsRef = firebase.firestore().collection(collection) 

        let query = docsRef
          .whereField
        let results = []
        return await docsRef.get().then((docs) => {
          console.log("got Docs", docs)
          docs.forEach( doc => {
            let obj = doc.data()
            results.push(obj)
          })
          return results
        })
      },  


//HANDLING SETTINGS
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
      },


// ORGANIZATION MANIPULATION
      async apiGetOrg(orgID) {
        console.log("apiGetOrg", orgID)

        return await this.apiGetDoc("organizations", orgID).then((data)=> {
          console.log("api gotOrg", data)
          return data
        })
      },
      async apiUpdateOrg(orgID, payload) {
        console.log("apiUpdateOrg", orgID, payload)

        if ( this.payload.webSite ) {
          this.formData.webSite = this.apiPrependHttp(this.formData.webSite)
        }

        this.apiUpdateDoc('organizations', orgID, payload).then((resp)=>{
          console.log("successfull org update")
        })
      },









// THESE METHODS USED FOR PROCESSING DATA FOR UPLOADING
      apiPrependHttp(url, {https = true} = {}) {
        if (!url.length) {return null}
        if (typeof url !== 'string') {
            throw new TypeError(`Expected \`url\` to be of type \`string\`, got \`${typeof url}\``);
        }

        url = url.trim();

        if (/^\.*\/|^(?!localhost)\w+?:/.test(url)) {
            return url;
        }

        return url.replace(/^(?!(?:\w+?:)?\/\/)/, https ? 'https://' : 'http://');
      },
  },
  computed: {

  }
}
</script>