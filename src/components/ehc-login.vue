<template>
    <div>
        <v-fade-transition leave-absolute>
        <v-container fluid  class="ma-0 pa-0 login" v-if="!showApp">
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
                            <v-progress-circular
                                v-if="createAccountLoading"
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
                            <v-card-text v-if="showSignUp" class="text-h4">Create A New Account</v-card-text>
                            <v-card-title v-else><h1>Welcome Back</h1></v-card-title>
                            <v-card-subtitle v-if="showSignUp">All information is required</v-card-subtitle>
                            <v-card-subtitle v-else>Please enter your credentials to log in</v-card-subtitle>
                            <v-card-text class="pb-0">
                                <ehc-form :meta="loginForm" v-model="credentials"></ehc-form>
                                <span class="error--text mt-0 pt-0" >{{loginError}}</span>
                            </v-card-text>
                            <v-card-actions class="pt-0 px-4">
                                <v-btn 
                                    v-if="!showSignUp"
                                    @click="forgotPassword(credentials.email)"
                                    plain 
                                    color="button" 
                                    class="mr-5" 
                                    large ><strong>Forgot password</strong></v-btn>
                                <v-btn 
                                    text
                                    v-if="false"
                                    color="button" 
                                    dark 
                                    class="ma-0 px-4" 
                                    @click="showSignUp=!showSignUp" 
                                    small
                                    >
                                    Create a new account</v-btn>
                                     <v-spacer></v-spacer>
                                <v-btn 
                                    v-if="!showSignUp"
                                    color="button" 
                                    dark 
                                    class="ma-0 px-9" 
                                    @click="login(credentials)" 
                                    large>
                                    <strong>Login</strong></v-btn>
                                <v-btn 
                                    v-if="showSignUp"
                                    width="100%"
                                    color="button" 
                                    dark 
                                    class="ma-0 pa-0" 
                                    @click="createNewAccount(credentials)" 
                                    large>
                                    <strong>Create new account</strong></v-btn>
                                
                            </v-card-actions>
                            <v-card-actions>
                                <v-btn 
                                    v-if="false"
                                    @click="showSignUp=!showSignUp"
                                    plain 
                                    color="button" 
                                    class="mr-5" 
                                    large 
                                    width="100%"
                                    >Login to an existing account</v-btn>
                               
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
        <ehc-alert></ehc-alert>
    </div>

</template>

<script>
import EhcNewOrgPrompt from '@/components/ehc-new-org-prompt.vue';
import auth from "@/mixins/auth.vue"
import api from "@/mixins/api.vue"
import EhcAlert from './ehc-alert.vue';

export default {
  props: {
      value: Boolean
  },
  components: {EhcNewOrgPrompt,EhcAlert},
  mixins: [auth, api],
  data () {
    return {
        loginError: "",
        alwaysFalse: false,
        credentials: {
            email: null,
            password: null
        },
        picOptions: [
            {fileName: "shutterstock_62211796.jpg", position: "bottom -5rem left -30rem"},
            {fileName: "shutterstock_557019241.jpg", position: "top 0px left -48rem"},
            {fileName: "shutterstock_1141204517.jpg", position: "bottom 0px left -7rem"},
        ],
        showSignUp: false,
        createAccountLoading: false,
        // sendEmailTo: ['tom@everhost.io', 'ed@everhost.io', 'grant@everhost.io'],
        sendEmailTo: ['tom@everhost.io'],
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
    loginForm() {
        let loginFields = [
            {type: "email",     label: "Email",     key: 'email',     required: true},
            {type: "password",  label: "Password",  key: 'password',  required: true}
        ]
        let signupFields = [
            {type: "password",  label: "Confirm Password",  key: 'passwordCheck',  required: true},
            {type: "text",      label: "Name", key: 'displayName', required: true},
            {type: "intPhoneNumber",     label: "Phone",   key: 'phoneNumber',  required: true},
        ]
        return this.showSignUp ? [...loginFields,...signupFields] : loginFields
        },
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
            this.loginError=""
            return true
        } else {
            return false
        }
    },
    loginDialog: function() {
        return !this.loggedIn
    },
    intro: function(){
        this.$store.dispatch('getMetaPage','intro')
        return this.$store.getters.metaPage
    },
    style: function(){
        return this.$store.getters.emailStyle
    },
    bodyTableWrapperStart: function(){
        return this.$store.getters.emailBodyTableWrapper
    },
    bodyTableEnd: function(){
        return this.$store.getters.emailBodyTableEnd
    },
    emailCustomContent: function(){
        let email = this.credentials.email
        let displayName = this.credentials.displayName || "User"
        return `<p class="displayName">Hi ${displayName},</p>
                <p>Thank you for joining the Everhost community. Here is your account information:</p>
                https://manage.everhost.io<br/>
                u: ${email}<br/>
                p: ***********<br/><br/>
                <p>Excited to see some amazing property welcome books! We're always looking to hear from our users.  Don't hesitate to contact support@everhost.io with your feedback.</p>
                <p>Cheers,<br/>
                Nomad</p>`
    },
    emailHead: function(){
        return `<head>
                    <style>
                        ${this.style}
                    </style>
                </head>`
    },
    mailObj: function(){
        let email = this.credentials.email
        let mailObj = {
            to: [email],
            bcc: ['tom@everhost.io'],
            subject: "Welcome to Everhost!",
            html: `
                <html>
                ${this.emailHead}                
                <body>
                ${this.bodyTableWrapperStart}
                ${this.emailCustomContent}
                ${this.bodyTableEnd}
                </body>
                </html>
            `
            }
        return mailObj
    },
    
  },
  methods: {
    createNewAccount: async function(){
        this.createAccountLoading = true      
      let obj = {
        'email': this.credentials.email,
        'password': this.credentials.password,
        'displayName': this.credentials.displayName,
        'phoneNumber': this.credentials.phoneNumber
      }
      console.log("createNewAccount", obj)
      if ( !this.credentials.email || !this.credentials.password ){
        this.$store.commit('setAlertMessage', "Please fill in all fields")
        this.$store.commit('setShowAlert',true)
        this.createAccountLoading = false
        return
      }
      if ( this.credentials.password.length < 6 ){
        this.$store.commit('setAlertMessage', "Password must be at least 6 characters")
        this.$store.commit('setShowAlert',true)
        this.createAccountLoading = false
        return
      } 
      if ( this.credentials.password !== this.credentials.passwordCheck ){ 
        this.$store.commit('setAlertMessage', "Passwords do not match")
        this.$store.commit('setShowAlert',true)
        this.createAccountLoading = false
        return
      }
      await this.$store.dispatch('createUserWithEmailAndPassword',obj)
      .then( res => {
        this.$store.commit('setAlertMessage', `Account for ${this.credentials.email} was created`)
        this.$store.commit('setShowAlert',true)
        this.sendMail(this.mailObj)
        this.createAccountLoading = false      
        this.showSignUp = false
        this.$route.push({name: "Properties"})
      })
      .catch( err => {
          console.log("error creating user", err)
      })
    },

    sendMail: function(mailObj) {
        console.log("sendMailMethod", mailObj)
        try {
            this.$store.dispatch('sendMail',mailObj)
        } catch (error) {
            console.log("error sending mail", error)
        }
    },

    login: function(credentials) {
        console.log("login", credentials)
        this.$store.dispatch('signInWithEmailAndPassword', credentials).then(res=>{
                    console.log("logged in")
                }).catch((err) => {
                    this.loginError = err.message
                })
    },
    logout: function() {
        this.$store.dispatch('logout')
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
    confirmAction: function(){
        alert("confirm ation")
    },
  },
  mounted() {
      //this removes the signup psudo route from the url if it is there
      if ( this.$route.path === '/signup' ) {
          this.showSignUp = true
          this.$router.push('/')
      }
        // this.sendMail(this.mailObj)
  },  
}
</script>

<style>
.bgFixed .v-image__image--cover{
      background-attachment: fixed;
      min-height: 100%;
      
}
.login {
    background-color: white;
}
</style>