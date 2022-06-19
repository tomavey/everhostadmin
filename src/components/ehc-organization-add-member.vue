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
        <ehc-form :meta="metaForForm" v-model="formData" @submit="submitNewUser()"></ehc-form>
      </ehc-dialog>
</v-container>  
</template>

<script>
export default {
  props: ['org'], 
  data: function() {
    return {
      formData: {},
      meta: [
        {type: 'text',              label: 'User Id',                   key: 'uid',        existingUser: true},
        {type: "text",              label: "Display Name",              key: "displayName",        existingUser: false},
        {type: "email",             label: "Email",                     key: "email",        existingUser: false},
        {type: "intPhoneNumber",    label: "Phone",                     key: "phone",        existingUser: false},
        {type: "button",            label: "submit",                    key: "submit",          emitOnClick: "submit"},
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
    }
  },
 
  methods: {
    submitNewUser: function(){
      this.tab ? this.submitNewUserFromExistingUser() : this.submitNewUserFromNewUser();
    },
    submitNewUserFromExistingUser: function(){
      let payload = {
        uid: this.formData.uid,
        orgId: this.org.orgId,
      }
      console.log("submitNewUserFromExistingUser", payload)
      this.$store.dispatch('addUserToOrg',payload)
    },
    submitNewUserFromNewUser: function(){
      alert('submitNewUserFromNewUser not hooked up yet');
    },
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