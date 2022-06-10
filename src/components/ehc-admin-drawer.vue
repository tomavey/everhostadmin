<template>
      <v-navigation-drawer
        class="px-0 mx-0"
        width="190px"
        clipped
        app
        v-model="drawerShow"
      >
        <v-list
          nav
          dense
        >
          <v-list-item link @click="$router.push('/users')">
            <v-list-item-icon>
              <v-img :src="require('@/assets/icons/2 User@3x.svg')"></v-img>
            </v-list-item-icon>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push('/feedbacks')">
            <v-list-item-icon>
              <v-img :src="require('@/assets/icons/Support-outline@3x.svg')"></v-img>
            </v-list-item-icon>
            <v-list-item-title>Feedback</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push('/organizations')">
            <v-list-item-icon>
              <v-img :src="require('@/assets/icons/Home@3xplain.svg')"></v-img>
            </v-list-item-icon>
            <v-list-item-title>Organizations</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="forgotPassword(email)">
            <v-list-item-icon>
              <v-icon color="drawerIcons">mdi-lock-reset</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Reset Password</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="showWelcomePage()" v-if="$route.path==='/'">
            <v-list-item-icon>
              <v-img :src="require('@/assets/icons/Support-outline@3x.svg')"></v-img>
            </v-list-item-icon>
            <v-list-item-title>Welcome Page</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push('/updateslog')">
            <v-list-item-icon>
              <v-img :src="require('@/assets/icons/clock@3x.svg')"></v-img>
            </v-list-item-icon>
            <v-list-item-title>Updates Log</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: "Admin Drawer"
    }
  },
  computed: {
    drawerShow: {
      get() {
        return this.$store.getters.drawer.show
      },
      set(val) {
        this.$store.commit('setDrawer',{show: val})
      } 
    },
    email: function(){
      return this.$store.getters.user.email
    }    
  },
  methods: {
    resetPassword() {
      this.$store.dispatch('resetPassword')
    },
    forgotPassword: async function(email){
        if ( !this.emailIsValid(email) ) { 
            this.$store.commit("setAlertMessage", "Please fill in your email address.")
            this.$store.commit('setShowAlert', true)
            }
        else {
            await this.$store.dispatch('resetPassword',email)
            this.$store.commit("setAlertMessage", `A reset link has been sent to ${email}.  Be sure to check your junk mail`)
            this.$store.commit('setShowAlert', true)
        }    
    },
    emailIsValid: function(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) { return (true) }
        else { return (false) }
    },
    showWelcomePage() {
      this.$store.commit('toggleWelcomePage')
    } 
  },
  watch: {
    $route(val) {
        console.log("tab changed", val)
        let clearSearchStringOn = [
            "GuestData",
            "Support",
            "Users"
        ]
        if ( clearSearchStringOn.includes(this.$route.name) ) {
            this.$store.commit('setSearchString', null)
        }
    },
  },
}
</script>