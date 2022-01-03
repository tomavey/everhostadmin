<template>
<div>
  <v-dialog
    v-model="showSetPropertyCodeDialog"
    transition="dialog-top-transition"
    max-width="600"    
    >
    <component-set-property-code-dialog/>

  </v-dialog>

  <v-app-bar
    dense
    absolute
    width="100%"
    color="black"
    dark
    app
    temporary
    >
    <v-app-bar-nav-icon @click="toggleDrawer" v-if="userIsAdmin"></v-app-bar-nav-icon>

    <v-toolbar-title @click="goToRoute('PropertiesGallery')">Everhost Admin Page</v-toolbar-title>


    <v-alert
      color="blue-grey"
      v-if="error.length"
      v-html="error"
      class="text-uppercase text-h5 mx-15"
    ></v-alert>

    <v-spacer></v-spacer>

    <div v-if="!userIsAuthenticated" >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-icon 
              @click="signin"
              v-bind="attrs"
              v-on="on"
              >mdi-login</v-icon>
        </template>
        <span>Login</span>
      </v-tooltip>
    </div>  

    <div v-if="userIsAuthenticated" >
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-icon 
              @click="logout"
              v-bind="attrs"
              v-on="on"
              >mdi-logout</v-icon>
        </template>
        <span>Logout</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-icon 
              @click="goToRoute('Welcome')"
              v-bind="attrs"
              v-on="on"
              >mdi-home</v-icon>
        </template>
        <span>Home</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-icon 
              @click="returnHome()"
              v-bind="attrs"
              v-on="on"
              >mdi-undo</v-icon>
        </template>
        <span>Go Back</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
            <v-icon 
              @click="returnBack()"
              v-bind="attrs"
              v-on="on"
              >mdi-Home</v-icon>
        </template>
        <span>Back</span>
      </v-tooltip>
    </div>

  </v-app-bar>
</div>
</template>

<script>
import mixins from '@/mixins'
import componentSetPropertyCodeDialog from './component-set-property-code-dialog.vue'

export default {
  components: { componentSetPropertyCodeDialog },
  props: ['error'],
  mixins: [mixins],
  computed: {
    showSetPropertyCodeDialog: {
      get(){ return this.$store.getters.showSetPropertyCodeDialog },
      set(value) { this.$store.commit('setShowPropertyCodeDialog', value)}
    },
  }, 
  methods: {
    toggleDrawer(){ this.$store.commit("toggleAdminDrawer") },
    signin() { 
      this.goToRoute("Signin")
    },
  }
}
</script>