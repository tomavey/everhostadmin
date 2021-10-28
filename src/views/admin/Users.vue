<template>
  <v-app>
    <v-container>
      <v-btn color="primary" ripple v-if="!showCreateUser" @click="showCreateUser=!showCreateUser">Create a new user</v-btn>
      <v-btn color="primary" ripple v-else @click="showCreateUser=!showCreateUser">Show list of users only</v-btn>

    <component-create-user v-if="showCreateUser" @updateUsers="getUsers"/>    

    <v-data-table
      :headers="headers"
      :items="users"
      :items-per-page=-1
      :search="searchString"
      @click:row="loginAs"
      class="pointer"
    >      
      <template v-slot:top>
          <span @click = "clearSearchString" style="float:right">Clear Search</span>
          <v-text-field
            v-model="searchString"
            label="Search"
            class="mx-4"
          ></v-text-field>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="openDialogAdmin(item)"
        >
          mdi-head-plus-outline
        </v-icon>
        <v-icon
          small
          @click="openDialogDelete(item)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="text-h5">Are you sure you want to delete this user?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteUser">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogAdmin" max-width="500px">
      <v-card>
        <v-card-text class="text-h5 text-center">Are you sure you want to make this user an admin?</v-card-text>
        <v-card-text class="text-center">Be careful. An admin can delete and promote other users</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeAdmin">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="addAdminRole">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-container>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import mixins from '@/mixins/'
import componentCreateUser from '../../components/admin/component-create-user.vue'

let usersRef = firebase.firestore().collection("users")

export default {
  components: { componentCreateUser },
  mixins: [mixins],
  data () {
    return {
      message: "Users Page - coming soon!",
      searchString: "",
      adminUid: "",
      showCreateUser: false,
      users: [],
      dialogDelete: false,
      dialogAdmin: false,
      userToDelete: {},
      userToAdmin: {},
      headers: [
        {text: "Email", value: "email"},
        {text: "User Id", value: "uid"},
        {text: "Admin?", value: "rights.admin"},
        {text: "Created", value: "createdAt"},
        {text: 'Actions', value: 'actions', sortable: false },      
      ]
    }
  },
  methods: {
    closeAdmin(){
      this.dialogAdmin = false
    },
    closeDelete(){
      this.dialogDelete = false
    },
    openDialogDelete(user){
      this.userToDelete = user
      this.dialogDelete = true
    },
    openDialogAdmin(user){
      this.userToAdmin = user
      this.dialogAdmin = true
    },
    deleteUser() {
      let user = this.userToDelete
      let deleteUser = firebase.functions().httpsCallable('deleteUser')
      deleteUser({ uid: user.uid })
      .then( this.dialogDelete = false )
      .catch( (err) => console.log(err) )
    },
    loginAs(row){
      console.log(row)
      let payload = {}
      payload.email = row.email
      payload.password = row.pin
      this.$store.dispatch("signInWithEmailAndPassword", payload )
      .then( () => this.$store.commit("SET_USER", payload) )
      .then( () => {
        console.log("signed in")
        this.$router.push( {name:"SwitchUser"} )
        // this.$router.push( {name:"PortfolioInvestment"} )
       })
      .catch( error => {
        this.$store.commit('setError', error.message)
      })
    },
    clearSearchString() {
      this.searchString = ""
    },
    addAdminRole(){
      this.dialogAdmin = false
      let adminUid = this.userToAdmin.uid
      let addAdmin = firebase.functions().httpsCallable('addAdminRoleByUid')
      addAdmin({ uid: adminUid })
      .then( res => console.log(res) )
      .then( () => {
        let obj = {}
        obj.rights = {
          admin: true
        }
        usersRef.doc(adminUid).set(obj, {merge:true})
        .then( () => console.log(`${adminUid} updated`))
        .catch( err => console.log(err) )
      })
      .then ( function() {
        console.log('admin privileges have been granted and recorded')
      })
      .catch( err => console.log(err) )
    },
    getUsers(){
      this.showCreateUser = false
      let usersArray = []
      usersRef.get()
      .then( (docs) => {
        if ( docs.size ) {
          docs.forEach( (doc) => {
            let obj = doc.data()
            obj.createdAt = this.dateFormat(createdAt)
            obj.DOCID = doc.id
            usersArray.push(obj)
          })
        } 
      })
      .then( () => {
        this.users = usersArray
      })  
    },
    subscribeToUsers(){
      usersRef
      .onSnapshot( (docs) => {
        let users = []
        docs.forEach( (doc) => {
          let obj = doc.data()
          obj.createdAt = this.dateFormat(obj.createdAt, "dateOnly")
          users.push(obj)
        })
        console.log('subscribeToUsers', users)
        this.users = users
      })
    },
    removeUser(user){
      let removeUser = firebase.functions().httpsCallable("removeUser")
      removeUser({user: user})
      .then(console.log("user removed from auth"))
    }
  },
  computed: {
  },
  created(){
    this.subscribeToUsers()
  }
}  

</script>

<style scoped>
  .pointer {
    cursor: pointer
  }
</style>