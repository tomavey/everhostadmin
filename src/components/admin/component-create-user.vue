<template>
  <v-container fluid>
    <h2 class="text-center">{{pageTitle}}</h2>
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
              <form @submit.prevent="onSignup">
                <v-row dense>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="Email"
                      id="email"
                      v-model="email"
                      type="email"
                      required>
                    </v-text-field>    
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
                <v-row dense v-if="requirePasswordConfirmation">
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Password (Confirm)"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      required></v-text-field>    
                  </v-flex>
                </v-row>
                <v-row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="!passwordConfirmed" :loading="loading">
                      Create New User
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-flex>
                </v-row>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-row>
  </v-container>
</template>

<script>
import mixins from '@/mixins/'

export default {
  mixins: [mixins],
  data () {
    return {
      pageTitle: 'Create User',
      email: '',
      password: '',
      alert: true,
      confirmPassword: '',
      displayName: null,
      phoneNumber: null,
      requirePasswordConfirmation: true,
    }
  },
  computed: {
    comparePasswords () {
      return true
    },
    user () {
      return this.$store.getters.user
    },
    loading: function () {
      return this.$store.getters.loading
    },
    error: function () {
      return this.$store.getters.error
    },
    passwordConfirmed: function(){
      if ( !this.requirePasswordConfirmation ) {return true}
      return this.password === this.confirmPassword
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup () {
      let user = {}
      user.email = this.email
      user.password = this.password
      user.displayName = this.password
      console.log("onSignup ",user)
      this.$store.dispatch("createUserWithEmailAndPassword", user)
      .then( () => {
        this.$store.commit('clearError')
      })
      .then( () => this.$store.commit("SET_USER, user") )
      .then( () => this.updateUsers() )
      .catch( (error) => {
         this.$store.commit('setError', error.message)
      })
    },
    onDismissed () {
      alert('Closed')
    },
    updateUsers(){
      this.$emit('updateUsers')
    }
  }
}
</script>

<style>
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