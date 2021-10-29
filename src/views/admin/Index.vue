<template>
  <div>

  </div>
</template>

<script>
import mixins from "@/mixins"
import componentSigninUser from '../../components/admin/component-signin-user.vue'
import ComponentToolbarTop from '../../components/admin/component-toolbar-top.vue'
import ComponentsNavdrawerSide from '../../components/admin/component-navdrawer-side.vue'

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