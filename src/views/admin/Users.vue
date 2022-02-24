<template>
<v-container>
  <p style="text-align: center; font-weight: bold; font-size: 1.3em">USERS</p>
<template>
  <v-btn @click="showNewUser = !showNewUser" class="float-right">
    Create a new user
  </v-btn>
  <ehc-dialog v-model="showNewUser" title="Enter email and password" width="500" close>
    <ehc-create-new-user />
  </ehc-dialog>
  <v-btn @click="showPromote = !showPromote" class="float-right">
    Promote user to admin
  </v-btn>
  <ehc-dialog v-model="showPromote" :title="title" width="500" close>
    <ehc-form :meta="meta" v-model="formData" @submit="submitPromotion()"></ehc-form>
  </ehc-dialog>

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
        <v-text-field
          v-model="search"
          label="Search"
          class="mx-4"
        ></v-text-field>
      </template>
      <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="showProperty(item)"
      >
        mdi-file-find
      </v-icon>
    </template>
    </v-data-table>
  </div>
</template>
</v-container>  
</template>

<script>
import mixins from '@/mixins'
import auth from '@/mixins/auth'
import ehcCreateNewUser from '../../components/admin/ehc-create-new-user.vue'

export default {
  components: { ehcCreateNewUser },
  mixins: [mixins,auth],
  data: function() {
    return {
      pageTitle: "USERS",
      search: null,
      showPromote: false,
      showNewUser: false,
      formData: {},
      title: "UserId for new admin",
      formData: {},
      meta: [
          {type: "uid",         label: "UserId",                     key: "uid"},
          {type: "button",        label: "submit",                    key: "submit",          emitOnClick: "submit"},
      ],


    }
  },
  methods: {
    showProperty: function(item){
      console.log(item)
      this.$store.commit('setUidToShowAdmin', item.uid)
      this.$router.push({name: "Properties"})
    },
    submitPromotion: function(){
      let uid = this.formData.uid
      this.$store.dispatch('makeAdmin',uid)
      this.showPromote = false
    } 
  },
  computed: {
    users: function(){
      return this.$store.getters.users
      .map( el => {
        el.createdAtAsString = this.dateFormat(el.createdAt,"dateOnly")
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
          { text: 'Created', value: "createdAtAsString", sortable: true },
          { text: 'View These Properties', value: 'actions', sortable: false },
        ]
    }
  },
  created(){
    if ( !this.userIsAdmin ) { this.$router.push( {name: "Properties"} ) }
    this.$store.dispatch('getUsers')
  }
}
</script>

