<template>
    <div>
        <v-fade-transition leave-absolute>
        <v-container fluid v-model="loginDialog" class="ma-0 pa-0" v-if="loginDialog">
            <v-row align="center">
                <v-col cols=4 >
                    <v-img class="bgFixed"  height="100vh" src="https://picsum.photos/1000" transition="scroll-x-transition" ></v-img>
                </v-col>
                <v-col cols=7>
                    <v-card flat max-width="400px" class="mx-auto" >
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
                                @click="show=!show"
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
                </v-col>
            </v-row>
        </v-container>
        </v-fade-transition>


        <template v-if="!loginDialog">
            <slot></slot>
        </template>
    </div>

</template>

<script>
import auth from "@/mixins/auth.vue"
export default {
  props: {
      value: Boolean
  },
  mixins: [auth],
  data () {
    return {
        show: true,
        alwaysFalse: false,
        credentials: {
            email: null,
            password: null
        },
    }
  },
  watch: {

  },
  computed: {
        loginDialog: function() {
            if (this.user==null) {
                return true
            } else {
                return false
            }
        },
  },
  methods: {

  }
}
</script>

<style>
.bgFixed .v-image__image--cover{
      background-attachment: fixed;
      min-height: 100%;
}
</style>