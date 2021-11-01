<template>
<!-- <v-app> -->
  <div class="Home">
  <v-container fluid>
    <v-row dense>
      <v-flex xs12 sm6 offset-sm3>
        <v-alert :value="true" type="error" v-model="alert" dismissible v-if="error">
          {{ error }}
        </v-alert>
      </v-flex>
    </v-row>
    <v-row dense>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignin">
                <v-row dense>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required></v-text-field>    
                  </v-flex>
                </v-row>
                <v-row dense>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required></v-text-field>    
                  </v-flex>
                </v-row>
                <v-row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading">
                      Sign In
                      <span slot="loader" class="custom-loader">
                        <v-icon light>mdi-cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-row>
              </form>
                <v-row dense class="bottomButtons" v-if="showBottomButtons">
                  <v-flex xs12 sm4 text-xs-center>
                    <v-btn @click="goToSignUp" text small>Create a new user</v-btn>
                  </v-flex>
                  <v-flex xs12 sm4 text-xs-center>
                    <v-btn @click="resetUserPassword" text small>Reset your password</v-btn>
                  </v-flex>
                </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
  </div>
<!-- </v-app> -->
</template>

<script>
import mixins from '@/mixins/'

export default {
  mixins: [mixins],
  data () {
    return {
      message: 'Welcome to Sign In',
      email: '',
      password: '',
      alert: true,
      showBottomButtons: false,
    }
  },
  watch:{
    userIsAuthenticated: function(){
      if ( this.userIsAuthenticated ) {
        this.goToRoute("Welcome")
      }
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    loading: function () {
      return this.$store.getters.loading
    },
    error: function () {
      return this.$store.getters.error
    }
  },
  // watch: {
  //   user (value) {
  //     if (value !== null && value !== undefined) {
  //       this.$router.push('/')
  //     }
  //   }
  // },
  methods: {
    onSignin () {
      const payload = {
        "email":this.email,
        "password":this.password
      }
      console.log(payload)
      this.$store.dispatch('signInWithEmailAndPassword', payload)
      .then(() => {
        this.$store.commit('clearError')
        // this.$store.commit('setAdminDrawer', true)
        console.log("logged in")
        this.goToRoute("Welcome")
        }
      )
      .catch( error => {
        this.$store.commit('setError', error.message)
      })
    },
    goToSignUp () {
      this.$router.push({name: 'Signup'})
    },
    resetUserPassword () {
      this.$store.dispatch('resetUserPassword', {email: this.email})
    }
  }
}
</script>

<style>
  .bottomButtons {
    margin-top:30px
  }
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>