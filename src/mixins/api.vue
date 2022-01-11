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
      } 
  },
  computed: {

  }
}
</script>