<template>
<v-container>
  <v-card>
    <v-card-text class="text-center text-h4">USERS</v-card-text>
    <v-card-actions v-if="userIsAdmin">
      <v-btn @click="showNewUser = !showNewUser" class="float-right">
        Create a new user
      </v-btn>
      <ehc-dialog v-model="showNewUser" title="Create a new user" width="500" close>
        <ehc-form :meta="newUserMeta" v-model="newUserFormData" @submit="submitNewUser()"></ehc-form>
      </ehc-dialog>

      <v-btn @click="showPromote = !showPromote" class="float-right">
        Promote user to admin
      </v-btn>
      <ehc-dialog v-model="showPromote" :title="title" width="500" close>
        <ehc-form :meta="meta" v-model="formData" @submit="submitPromotion()"></ehc-form>
      </ehc-dialog>

    </v-card-actions>
  </v-card>

  <div>
    <v-data-table
      :headers="headers"
      :items="users"
      item-key="createdAt"
      class="elevation-1"
      :search="search"
      :single-expand="singleExpand"
      :expanded.sync="expanded"    
      :show-expand = userIsAdmin  
      :footer-props="{
        showFirstLastPage: true,
        itemsPerPageOptions: [50,100,150.-1]
      }"
    >
    <template v-slot:top>

      <v-card>
      <v-text-field
        v-model="search"
        label="Search"
        class="mx-4"
      ></v-text-field>
      </v-card>


    </template>
      <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="showThisUidProperties(item)"
      >
        mdi-file-find
      </v-icon>
    </template>

    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <span style="font-size: .8em;">This feature is in 'beta'. Be sure you enter a valid propertyId<br/></span>
        Add an existing property to {{item.email}}:&nbsp;
        <v-col cols="4">
        <v-text-field
          v-if="!newPropertyMessage"
          v-model="newPropertyId"
          label="New Property Id"
          :append-outer-icon="newPropertyId ? 'mdi-send' : ''"
          @click:append-outer="addPropertyToUser(item.uid)"
          >
        </v-text-field>
        <v-checkbox
          v-model="moveGuestInfo"
          label="Move guest contact info also"
          value=true
          class="my-1"
        ></v-checkbox>
        <p v-if="newPropertyMessage">{{newPropertyMessage}}</p>
        </v-col>
      </td>
    </template>
    </v-data-table>
  </div>

</v-container>  
</template>

<script>
import mixins from '@/mixins'
import auth from '@/mixins/auth'

export default {
  mixins: [mixins,auth],
  data: function() {
    return {
      pageTitle: "USERS",
      search: null,
      showPromote: false,
      showNewUser: false,
      expanded: [],
      singleExpand: false,
      newPropertyId: null,
      newPropertyMessage: null,
      moveGuestInfo: null,
      formData: {},
      title: "UserId for new admin",
      newUserFormData: {},
      newUserFormData: {},
      meta: [
          {type: "text",         label: "UserId",                     key: "uid"},
          {type: "button",        label: "submit",                    key: "submit",          emitOnClick: "submit"},
      ],
      newUserMeta: [
        {type: "email",         label: "email",                     key: "email"},
        {type: "password",         label: "password",               key: "password"},
        {type: "button",        label: "submit",                    key: "submit",          emitOnClick: "submit"},
      ],
    }
  },
  methods: {
    showThisUidProperties: function(item){
      console.log(item)
      this.$router.push({name: "Properties", query: {search: item.uid, showAll: true}})  
    },
    submitPromotion: function(){
      let uid = this.formData.uid
      this.$store.dispatch('makeAdmin',uid)
      this.showPromote = false
    }, 
    //TODO: add validation in firebase functions
    submitNewUser: async function(){
      let obj = {
        'email': this.newUserFormData.email,
        'password': this.newUserFormData.password
      }
      if ( !this.newUserFormData.email || !this.newUserFormData.password ){
        this.$store.commit('setAlertMessage', "Please fill in all fields")
        this.$store.commit('setShowAlert',true)
        return
      }
      await this.$store.dispatch('createUserWithEmailAndPassword',obj)
      this.showNewUser = false
    },  
    addPropertyToUser: async function(uid){
      let propertyId = this.newPropertyId
      console.log("addPropertyToUser: ", uid, propertyId)
      if ( this.moveGuestInfo ) { await this.$store.dispatch("moveGuestDataToUser", {uid: uid, propertyId: propertyId}) }
      return await this.$store.dispatch('doesPropertyExist',propertyId)
      .then( (response) => {
        if(!response){
          this.newPropertyMessage = "Not a valid property id"
          setTimeout( () => {
            this.expanded = []
            this.newPropertyMessage = ""
            this.newPropertyId = null
          }, 3000)
        } else {
          this.$store.dispatch("updatePropertyUid", {uid:uid, propertyId: propertyId}).then( () => {
            this.newPropertyMessage = "Updated"
            setTimeout( () => {
              this.expanded = []
              this.newPropertyMessage = ""
              this.newPropertyId = null
            }, 3000)
          })
        }
      })
      .catch(err => {
        console.log(err)
        this.newPropertyMessage = err
      })
    },
  },
  computed: {
    users: function(){
      return this.$store.getters.users
      .map( el => {
        el.createdAtAsString = this.dateFormat(el.createdAt,"dateOnly")
        if ( el.rights && el.rights.admin ) { el.admin = "yes" }
        el.picLink = `<a href="${el.photoURL}">link</a>`
        return el
      })
      .sort( (a,b) => {
          if ( a.createdAt < b.createdAt ) {return 1}
          else { return -1 }
      })
    },
    headers: function(){
      return [
          {
            text: 'Email',
            align: 'start',
            sortable: true,
            value: 'email',
          },
          {
            text: 'User Id',
            value: 'uid',
          },
          {
            text: 'Admin?',
            value: 'admin',
          },
          { text: 'Created', value: "createdAtAsString", sortable: true },
          { text: 'View These Properties', value: 'actions', sortable: false },
          { text: '', value: 'data-table-expand' },
        ]
    }
  },
  created(){
    if ( !this.userIsAdmin ) { this.$router.push( {name: "Properties"} ) }
    this.$store.dispatch('subscribeToUsers')
  }
}

</script>

