<template>
  <v-app>

    <component-navdrawer-side 
      :error=error 
    />

    <component-toolbar-top 
      @toggleDrawer="toggleDrawer()" 
      :error=error 
      />

    <v-main>
      <v-container>
        <router-view :key="$route.fullPath" />
      </v-container>
    </v-main>

    <p>
    <span
      class="float-right pointer"
      @click="toggleShowSetPropertyCodeDialog()"
      v-if="propertyId"
      >
      PropertyId: {{propertyId}}
    </span>
    <v-spacer></v-spacer>
    <span v-if="userIsAuthenticated">
      {{this.user.data.email}}
      <span v-if="userIsAdmin" class="float-right">&nbsp;*</span>
    </span>  
    </p>

    <component-footer-menu></component-footer-menu>

  </v-app>
</template>

<script>
import ComponentToolbarTop from './components/admin/component-toolbar-top.vue';
import ComponentNavdrawerSide from './components/admin/component-navdrawer-side.vue';
import mixins from "@/mixins"
import ComponentFooterMenu from './components/admin/component-footer-menu.vue';

export default {
  components: { ComponentToolbarTop, ComponentNavdrawerSide, ComponentFooterMenu, },
  mixins: [mixins],
  name: 'App',

  data: () => ({
    drawer: null,
    navItems: [
      {
        n: 1,
        label: "New Property",
        routeName: "NewPropertyCreateDialog",
        adminOnly: false
      }, 
      {
        n: 2,
        label: "All Properties",
        routeName: "PropertiesList",
        adminOnly: true
      }, 
      {
        n: 2,
        label: "My Properties",
        routeName: "PropertiesGallery",
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
      {
        n: 4,
        label: "Set Property Code",
        routeName: "SetPropertyCodeDialog",
        adminOnly: true
      }, 
    ],
  }),
  watch: {
  },
  methods: {
  },
  computed: {
    error: function(){ return this.$store.getters.error },
    propertyId: function() { return this.$store.getters.propertyId }
  },
  created() {
    this.$store.dispatch('getInstructions')
    this.$store.dispatch('subscribeToProperties')
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
