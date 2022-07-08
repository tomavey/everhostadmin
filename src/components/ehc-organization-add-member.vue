<template>
<v-container>
    <!-- CREATE NEW USER BUTTON -->
      <v-btn @click="showNewUser = !showNewUser" class="float-right mr-2">
        Add a new member
      </v-btn>
      <!-- CREATE A NEW USER DIALOG -->
      <ehc-dialog v-model="showNewUser" title="Add a new member..." width="700" close>
        <v-tabs
          v-model="tab"
          align-with-title
          class="ml-n5"
        >
          <v-tabs-slider color="yellow"></v-tabs-slider>

          <v-tab
            v-for="item in items"
            :key="item"
          >
            {{ item }}
          </v-tab>
        </v-tabs>
        <ehc-form :meta="metaForForm" v-model="formData" @submit="submitNewMember()"></ehc-form>
        <span class="error--text mt-0 pt-0" >{{loginError}}</span>

      </ehc-dialog>
</v-container>  
</template>

<script>
import Auth from '@/mixins/auth'

export default {
  props: ['org'], 
  mixins: [Auth],
  data: function() {
    return {
      formData: {},
      credentials: {},
      meta: [
        {type: 'text',              label: 'User Id',                   key: 'uid',           existingUser: true},
        {type: "text",              label: "Display Name",              key: "displayName",   existingUser: false},
        {type: "email",             label: "Email",                     key: "email",         existingUser: false},
        {type: "text",              label: "Temporary Password",        key: "password",      existingUser: false},
        {type: "intPhoneNumber",    label: "Phone",                     key: "phoneNumber",         existingUser: false},
        {type: "button",            label: "submit",                    key: "submit",        emitOnClick: "submit"},
      ],
      shakeVariable: true,
      isValid: false,
      showInfo: true,
      showForm: false,
      showNewUser: false,
      tab: null,
      items: [
          '...from a brand new user', '... from an existing user',
        ],
      loginError: "",
    }
  },
 
  methods: {
    login: function(credentials) {
        console.log("login", credentials)
        this.$store.dispatch('signInWithEmailAndPassword', credentials).then(res=>{
                    console.log("logged in")
                }).catch((err) => {
                    this.loginError = err.message
                })
    },
    submitNewMember: function(){
      this.tab ? this.submitNewMemberFromExistingUser() : this.submitNewMemberFromNewUser();
    },
    submitNewMemberFromExistingUser: async function(){
      let payload = {
        uid: this.formData.uid,
        orgId: this.org.orgId,
      }
      // add userId to org
      await this.$store.dispatch('addUserToOrg',payload)
      // Refresh org members
      await this.$store.dispatch('getMembers',payload.orgId)
      // close dialog
      this.showNewUser = false

    },
    submitNewMemberFromNewUser: async function(){
      // create a new user
      let credentials = this.formData
      let obj = {
        'email': credentials.email,
        'password': credentials.password,
        'displayName': credentials.displayName,
        'phoneNumber': credentials.phoneNumber
      }
      await this.$store.dispatch('createUserWithEmailAndPassword',obj)
      // get the uid of the new user
      let userId = await this.$store.dispatch('getNewUserIDFromEmail',obj.email)
      console.log("userId", userId)
      let payload = {
        uid: userId,
        orgId: this.org.orgId,
      }
      console.log("payload", payload)
      await this.$store.dispatch('addUserToOrg',payload)
      await this.$store.dispatch('getMembers',payload.orgId)
      this.showNewUser = false
    },
  },

  created(){
    },

  computed: {
    metaForForm: function(){
      return this.meta.filter( el => el.existingUser === this.existingUser || el.key === 'submit' )
    },  
    existingUser: function(){
      return this.tab ? true : false
    },

  },
}
</script>