<template>
  <v-app id="app">
    <ehc-login>
        <ehc-app-toolbar></ehc-app-toolbar>
        <ehc-admin-drawer v-if="userIsAdmin"/>

        <v-main height="100%">
            <router-view :key="$route.fullPath" />
        </v-main>
        <ehc-feedback></ehc-feedback>

    </ehc-login>
  </v-app>
</template>

<script>
import ehcAppToolbar from './components/ehc-app-toolbar.vue';
import ehcLogin from './components/ehc-login.vue';
import EhcAppToolbar from './components/ehc-app-toolbar.vue';
import EhcFeedback from './components/ehc-feedback.vue';
import updateMixin from '@/mixins/updateMixin.js';
import EhcAdminDrawer from './components/ehc-admin-drawer.vue'
import auth from "@/mixins/auth.vue"

export default {
  components: { ehcAppToolbar, ehcLogin, EhcAppToolbar, EhcFeedback, EhcAdminDrawer },
  mixins: [updateMixin,auth],
  name: 'App',

  data: () => ({
    
  }),
  watch: {
  },
  methods: {
  },
  computed: {
    user: function(){
      this.$store.getters.user
    }
  },
  created() {
    this.$store.dispatch("monitorAuth")
    console.log("app created")
    try {
      this.$store.dispatch("makeAdmin","zdPoborxuEgOHo8x1CwlfwUGgWJ2")
    } catch (error) {
      console.log(error)
    }
  }  
};
</script>

<style>

a {
  color:  rgb(71, 113, 250) !important;
  text-decoration: none;
  font-weight: bold;
}

a:hover {
  color: rgb(15, 5, 128) !important;
}

.pointer {
  cursor: pointer;
}

@font-face {
    font-family: 'Sailec Black';
    src: url('~@/assets/fonts/Sailec Black.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Sailec';
    src: url('~@/assets/fonts/Sailec Bold.woff2') format('woff2');
    font-weight: bold;
    font-style: normal;
}
@font-face {
    font-family: 'Sailec';
    src: url('~@/assets/fonts/Sailec Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Sailec Medium';
    src: url('~@/assets/fonts/Sailec Medium.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Sailec Light';
    src: url('~@/assets/fonts/Sailec Light.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: 'Sailec';
    src: url('~@/assets/fonts/Sailec Thin.woff2') format('woff2');
    font-weight: normal;
    font-style: italic;
}
</style>
