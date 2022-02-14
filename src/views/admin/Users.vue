<template>
<v-container>
<template>
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

export default {
  mixins: [mixins,auth],
  data: function() {
    return {
      pageTitle: "USERS",
      search: null,
      showPromote: false,
      formData: {},
      title: "UserId for new admin",
      formData: {},
      meta: [
          {type: "email",         label: "email",                     key: "email"},
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
      let email = this.formData.email
      this.$store.dispatch('makeAdmin',email)
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

