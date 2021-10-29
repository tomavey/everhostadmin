<template>
  <v-app>

    <component-navdrawer-side 
      :navItems=navItems 
      :error=error 
      :drawer=drawer
      @logout="logout()"
      @signin="signin()"
    />

    <component-toolbar-top 
      @toggleDrawer="toggleDrawer()" 
      :error=error 
      @logout="logout()"
      @signin="signin()"
      />

    <v-main>
      <v-container>
        <router-view :key="$route.fullPath"/>
      </v-container>
    </v-main>

    <p class="float-right">
      PropertryId: {{propertyId}}
      <span v-if="userIsAdmin" class="float-right">&nbsp;*</span>
    </p>


  </v-app>
</template>

<script>
import ComponentToolbarTop from './components/admin/component-toolbar-top.vue';
import ComponentNavdrawerSide from './components/admin/component-navdrawer-side.vue';
import mixins from "@/mixins"

export default {
  components: { ComponentToolbarTop, ComponentNavdrawerSide, },
  mixins: [mixins],
  name: 'App',

  data: () => ({
    drawer: null,
    showSignin: false,
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
  }),
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
  },
  computed: {
    error: function(){ return this.$store.getters.error },
    propertyId: function() { return this.$store.getters.propertyId }
  },
  created() {
    let setPropertyId = this.$route.params.propertyId || "lux"
    this.$store.commit('setPropertyId', setPropertyId)
    this.$store.dispatch('getProperty')
    this.$store.dispatch('getInstructions')
  }  
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.pointer {
  cursor: pointer;
}

body,
.v-application,
.v-application .text-md-body-1{
  font-family:"Circular Std"!important;
}

.v-application .v-card__subtitle, .v-application .v-card__text, .v-application .v-card__title {
	padding: 20px;
}
.v-application .v-card__text{
  font-size:1rem;
  line-height:1.5;
}

.v-sheet.v-card {
	border-radius: 16px!important;
}

@font-face {
    font-family: 'Circular Std Book';
    src: url('assets/fonts/CircularStd-Book.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Circular Std';
    src: url('assets/fonts/CircularStd-Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Circular Std';
    src: url('assets/fonts/CircularStd-Medium.woff2') format('woff2');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}
</style>
