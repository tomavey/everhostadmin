<template>
  <v-app id="app"  :style="{ background: $vuetify.theme.themes['light'].background }">
    <ehc-login v-model="showApp" >

        <ehc-app-toolbar></ehc-app-toolbar>
        <ehc-admin-drawer v-if="userIsAdmin"/>

        <v-main height="100%" fill-height>
            <router-view :key="$route.fullPath" />
        </v-main>
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
    showApp: null
  }),
  watch: {
    showApp(val) {
      if (val == true) {
          this.apiGetAppSettings()
      }
    }
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
    // console.log("app created")
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
