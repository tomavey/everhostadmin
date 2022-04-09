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
      item-key="name"
      class="elevation-1"
      :search="search"
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
      formData: {},
      newUserFormData: {},
      title: "UserId for new admin",
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
      this.$store.commit('setUidToShowAdmin', item.uid)
      this.$router.push({name: "Properties"})
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
        ]
    }
  },
  created(){
    if ( !this.userIsAdmin ) { this.$router.push( {name: "Properties"} ) }
    this.$store.dispatch('subscribeToUsers')
  }
}

</script>

