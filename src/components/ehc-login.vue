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
                                <v-text-field 
                                    v-model="credentials.email"
                                    outlined
                                    label="e-mail" 
                                    ></v-text-field>
                                <v-text-field 
                                    outlined
                                    v-model="credentials.password"
                                    label="Password" 
                                    type="password"
                                    class="ma-0"
                                    ></v-text-field>  
                            </v-card-text>
                            <v-card-actions class="pt-0">
                                <v-btn 
                                    plain 
                                    color="primary" 
                                    class="mr-5" 
                                    large ><strong>Forgot password</strong></v-btn>
                                <v-spacer></v-spacer>
                                <v-btn 
                                    color="primary" 
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
export default {
  props: {
      value: Boolean
  },
  components: {EhcNewOrgPrompt},
  mixins: [auth],
  data () {
    return {
        alwaysFalse: false,
        credentials: {
            email: null,
            password: null
        },
        picOptions: [
            {fileName: "shutterstock_62211796.jpg", position: "bottom -5rem left -30rem"},
            {fileName: "shutterstock_557019241.jpg", position: "top 0px left -48rem"},
            {fileName: "shutterstock_1141204517.jpg", position: "bottom 0px left -7rem"},
        ]
    }
  },
  watch: {
    loggedIn(val) {
        if (val) {
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