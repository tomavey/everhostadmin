<template>
      <v-navigation-drawer
        expand-on-hover
        permanent
        clipped
        app
      >
        <v-list
          nav
          dense
        >
          <v-list-item link @click="$router.push('/users')">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push('/feedbacks')">
            <v-list-item-icon>
              <v-icon>mdi-message-alert</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Feedback</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push('/organizations')">
            <v-list-item-icon>
              <v-icon>mdi-group</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Organizations</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="forgotPassword(email)">
            <v-list-item-icon>
              <v-icon>mdi-lock-reset</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Reset Password</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="$router.push('/updateslog')">
            <v-list-item-icon>
              <v-icon>mdi-update</v-icon>
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
  }
}
</script>