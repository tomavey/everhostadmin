<template>
    <div>
        <v-fade-transition leave-absolute>
        <v-container fluid  class="ma-0 pa-0" v-if="!showApp">
            <v-row align="center">
                <v-col cols=4 class="pb-0">
                    <v-slide-x-reverse-transition>
                        <v-img 
                            v-if="!showApp"
                            class="bgFixed pa-0 ma-0"  
                            height="100vh" 
                            :src="require('@/assets/img/loginPagePics/' + pic.fileName)" 
                            :position="pic.position" 
                        ></v-img>
                    </v-slide-x-reverse-transition>
                </v-col>
                <v-col cols=7>
                    <v-fade-transition :leave-absolute="true">
                        <v-card max-width="400px" flat class="mx-auto d-flex justify-center mb-6" >
                            <v-progress-circular
                                v-if="loading"
                                class="mx-auto"
                                indeterminate
                                color="primary"
                                :size="100"
                                :width="7"
                                ></v-progress-circular>
                        </v-card>
                    </v-fade-transition>
                    <v-slide-y-transition :leave-absolute="true">
                        <ehc-new-org-prompt v-if="newOrgPrompt" flat max-width="400px" class="mx-auto" ></ehc-new-org-prompt>
                    </v-slide-y-transition>

                    <v-slide-y-transition :leave-absolute="true">
                        <v-card flat max-width="400px" class="mx-auto" v-if="loginDialog">
                            <v-card-title><h1>Welcome Back</h1></v-card-title>
                            <v-card-subtitle>Please enter your credentials to log in</v-card-subtitle>
                            <v-card-text class="pb-0">
                                <ehc-form :meta="loginForm" v-model="credentials"></ehc-form>
                            </v-card-text>
                            <v-card-actions class="pt-0 px-4">
                            <!-- <v-btn 
                                    plain 
                                    color="button" 
                                    class="mr-5" 
                                    large ><strong>Forgot password</strong></v-btn> -->
                                <v-spacer></v-spacer>
                                <v-btn 
                                    width="40%"
                                    color="button" 
                                    dark 
                                    class="ma-0 pa-0" 
                                    @click="login(credentials)" 
                                    large>
                                    <strong>Login</strong></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-slide-y-transition>
                </v-col>
            </v-row>
        </v-container>
        </v-fade-transition>


        <template v-if="showApp">
            <slot></slot>
        </template>
    </div>

</template>

<script>
import EhcNewOrgPrompt from '@/components/ehc-new-org-prompt.vue';
import auth from "@/mixins/auth.vue"
import api from "@/mixins/api.vue"

export default {
  props: {
      value: Boolean
  },
  components: {EhcNewOrgPrompt},
  mixins: [auth, api],
  data () {
    return {
        alwaysFalse: false,
        credentials: {
            email: null,
            password: null
        },
        loginForm: [
            {type: "email",     label: "Email",     key: 'email',     required: true},
            {type: "password",  label: "password",  key: 'password',  required: true}
        ],
        picOptions: [
            {fileName: "shutterstock_62211796.jpg", position: "bottom -5rem left -30rem"},
            {fileName: "shutterstock_557019241.jpg", position: "top 0px left -48rem"},
            {fileName: "shutterstock_1141204517.jpg", position: "bottom 0px left -7rem"},
        ]
    }
  },
  watch: {
    async loggedIn(val) {
        if (val) {
            this.apiGetUser(this.user.uid).then((user) => {
                console.log("got the userarino ", user)
                this.$store.commit('setUser', user)
            })
            this.$store.dispatch('getOrg')
        }
    },
    showApp(val) {
        this.$emit("input", val)
    }
  },
  computed: {
    loading() {
        let status = this.orgStatus
        if (this.loggedIn == true && status.loading == true) {return false}
    },
    newOrgPrompt() {
        let status = this.orgStatus
        if (status.checked == true && status.found == false && status.loading == false) {return true}
        return false
    },
    orgStatus() {
        return this.$store.getters.orgStatus
    },
    pic() {
        let max = this.picOptions.length;
        let index = Math.floor(Math.random() * max)
        return this.picOptions[index]
    },
    showApp() {
        let status = this.orgStatus
        if (this.loggedIn == true && status.found == true ) {
            return true
        } else {
            return false
        }
    },
    loginDialog: function() {
        return !this.loggedIn
    },
  },
  methods: {
    login: function(credentials) {
        console.log("login", credentials)
        this.$store.dispatch('signInWithEmailAndPassword', credentials).then(res=>{
            console.log("logged in", res)
        })
    
    },
    logout: function() {
        this.$store.dispatch('logout')
    },
  }
}
</script>

<style>
.bgFixed .v-image__image--cover{
      background-attachment: fixed;
      min-height: 100%;
}
</style>