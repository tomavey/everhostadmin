<template>
  <v-app-bar
    dense
    absolute
    width="100%"
    color="black"
    dark
    app
    temporary
    >
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

    <v-toolbar-title @click="goToRoute('Welcome')">Everhost Admin Page</v-toolbar-title>


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
    </div>

  </v-app-bar>

</template>

<script>
import mixins from '@/mixins'

export default {
  props: ['NavItems','error'],
  mixins: [mixins], 
  methods: {
    toggleDrawer(){ this.$store.commit("toggleAdminDrawer") },
    logout(){ this.$emit("logout") },
    signin() { this.$emit("signin")},
  }
}
</script>