<template>
  <div>

    <component-toolbar-top 
      @toggleDrawer="toggleDrawer()" 
      :error=error 
      @logout="logout()"
      @signin="signin()"
      />

    <v-dialog
          v-model="showSignin"
          persistent
          max-width="600px"
        >
        <template>
          <component-signin-user @onSignin="signin"/>
        </template>
    </v-dialog>      

    <router-view :key="$route.fullPath"/>

    <components-navdrawer-side 
      :navItems=navItems 
      :error=error 
      :drawer=drawer
      @logout="logout()"
      @signin="signin()"
    />

    <p class="float-right">
      PropertryId: {{propertyId}}
      <span v-if="userIsAdmin" class="float-right">&nbsp;*</span>
    </p>
  </div>
</template>

<script>
import mixins from "@/mixins"
import componentSigninUser from '../../components/admin/component-signin-user.vue'
import ComponentToolbarTop from '../../components/admin/component-toolbar-top.vue'
import ComponentsNavdrawerSide from '../../components/admin/components-navdrawer-side.vue'

export default {
  components: { componentSigninUser, ComponentToolbarTop, ComponentsNavdrawerSide },
  mixins: [mixins],
  data() {
    return {
      drawer: true,
      showSignin: false,
      navItems: [
        {
          n: 1,
          label: "New Property",
          routeName: "NewPropertyCreateDialog",
          adminOnly: false
        }, 
        {
          n: 2,
          label: "My Properties List",
          routeName: "PropertiesList",
          adminOnly: true
        }, 
        {
          n: 3,
          label: "Image Gallery",
          routeName: "ImageGallery",
          adminOnly: false
        }, 
        {
          n: 4,
          label: "Users",
          routeName: "Users",
          adminOnly: true
        }, 
      ],
    }
  },
  methods: {
    signin(){
      this.drawer = true
      this.showSignin = false
    },
    logout(){
      this.$store.dispatch('logout')
      this.showSignin = true
      this.goToRoute("Admin")
    },
    toggleDrawer(){
      if ( this.userIsAuthenticated ) {
        if ( this.drawer !== null ) {
          this.drawer = !this.drawer
        } else { this.drawer = false }
      } else {
        this.setError("Signin before navigating to admin pages.")
        this.showSignin = true   
      } 
    },
    showNavItem: function(n){
      if ( this.userIsAdmin ) { return true }
      if ( !n.adminOnly && this.userIsAuthenticated ) { return true }
      return false
    },
    setError: function(message){
      this.$store.commit("setError",message)
    },
    routeToSigninIfNotAuth(){
      if ( !this.userIsAuthenticated ) { 
        this.goToRoute("Signin") 
        this.drawer = false
      }
    }
  },
  computed: {
    error: function(){ return this.$store.getters.error },
    propertyId: function() { return this.$store.getters.propertyId }
  },
  watch: {
    // userIsAuthenticated: function(){
    //   if ( this.userIsAuthenticated ) {
    //     this.showSignin = false
    //   }
    // }
  },
  mounted(){
    if ( this.isMobile() ) { this.drawer = false }
    // if ( !this.userIsAdmin ) { this.showSignin = true }
  }
}
</script>