<template>
<v-container>
  {{searchString}}
  <v-card>

<!-- DOWNLOAD BUTTON -->
    <v-card-text>
        <ehc-download-button 
          :label="'Download as CSV'" 
          :fileName="'USERS'" 
          :data="usersForDownload"
          :header="'EVERHOST USER DATA'"
          :type="'csv'"
        />  
    </v-card-text>

<!-- TABLE HEADER -->
    <v-card-text class="text-center text-h4">USERS</v-card-text>

<!-- FOR ADMIN ONLY -->
    <v-card-actions v-if="userIsAdmin">
    <!-- CREATE NEW USER BUTTON -->
      <v-btn @click="showNewUser = !showNewUser" class="float-right mr-2">
        Create a new user
      </v-btn>
      <ehc-dialog v-model="showNewUser" title="Create a new user" width="500" close>
        <ehc-form :meta="newUserMeta" v-model="newUserFormData" @submit="submitNewUser()"></ehc-form>
      </ehc-dialog>

    <!-- MAKE USER ADMIN -->
      <v-btn @click="showPromote = !showPromote" class="float-right mr-1">
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

    <!-- LINK TO VIEW THIS USERS PROPERTIES -->
      <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="showThisUidProperties(item)"
      >
        mdi-file-find
      </v-icon>
    </template>

    <!-- EXPANSION ITEMS -->
    <!-- MOVE AN EXISTING PROPERTY TO THIS USER -->
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
          @click:append-outer="transferProperty(item)"
          >
        </v-text-field>
        <v-checkbox
          v-if="!newPropertyMessage"
          v-model="moveGuestInfo"
          label="Transfer guest data also"
          :value=moveGuestInfo
          class="my-1"
        ></v-checkbox>
        <p v-if="newPropertyMessage">{{newPropertyMessage}}</p>
        </v-col>
      </td>
    </template>
    </v-data-table>

    <ehc-alert-confirm @confirmAction="confirmAction" ></ehc-alert-confirm>
  </div>

</v-container>  
</template>

<script>
import mixins from '@/mixins'
import auth from '@/mixins/auth'
import ehcAlertConfirm from '@/components/ehc-alert-confirm'
import EhcDownloadButton from '@/components/ehc-download-button.vue'


export default {
  mixins: [mixins,auth],
  components: {
    'ehc-alert-confirm': ehcAlertConfirm,
    'ehc-download-button': EhcDownloadButton
  },  
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
      moveGuestInfo: true,
      item: {},
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
      if ( obj.password.length < 6 ){
        this.$store.commit('setAlertMessage', "Password must be at least 6 characters")
        this.$store.commit('setShowAlert',true)
        return
      }
      await this.$store.dispatch('createUserWithEmailAndPassword',obj)
      this.showNewUser = false
    },
    async confirmAction(){
      await this.addPropertyToUser(this.item.uid)
      this.$store.commit("setShowConfirm",false)
      this.$store.commit("setConfirmMessage",'')
    },
    transferProperty(item){
      this.item = item
      this.$store.commit("setShowConfirm",true)
      let message = "Are you sure that you want to transfer this property"
      if ( this.moveGuestInfo ) { message += " and guest data" } else { message += " without guest data" }
      message = message + " to " + item.uid + "?"
      this.$store.commit("setConfirmMessage", message)
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
        el.searchAble = `${el.uid} ${el.email} ${el.displayName} ${el.createdAtAsString}`
        return el
      })
      .filter( el => {
        if ( this.searchString ) {
          return el.searchAble.toLowerCase().includes(this.searchString.toLowerCase())
        } else {
          return true
        }
      })
      .sort( (a,b) => {
          if ( a.createdAt < b.createdAt ) {return 1}
          else { return -1 }
      })
    },
    usersForDownload: function(){
      let usersForDownload = []
      let user = {}
      this.users.forEach( el => {
        user = {}
        user.ID = el.uid
        user.EMAIL = el.email
        user.NAME = el.displayName || ""
        user.CREATED = el.createdAtAsString
        usersForDownload.push(user)
      })
      return usersForDownload
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
            text: 'Display Name',
            value: 'displayName',
          },
          {
            text: 'Admin?',
            value: 'admin',
          },
          { text: 'Created', value: "createdAtAsString", sortable: true },
          { text: 'View These Properties', value: 'actions', sortable: false },
          { text: '', value: 'data-table-expand' },
        ]
    },
    searchString: function(){
      return this.$store.getters.searchString
    },
  },
  created(){
    if ( !this.userIsAdmin ) { this.$router.push( {name: "Properties"} ) }
    if ( this.$route && this.$route.query ) {
      this.$store.commit('setSearchString', this.$route.query.search)
    }
    this.$store.dispatch('subscribeToUsers')
  }
}

</script>

