<template>
<!-- <v-app> -->
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
                      name="displayName"
                      label="Display Name"
                      id="displayName"
                      v-model="displayName"
                      type="text"
                      required>
                    </v-text-field>    
                  </v-flex>
                </v-row>
                <!-- <v-row dense>
                  <v-flex xs12>
                    <v-text-field
                      name="phoneNumber"
                      label="Phone Number"
                      id="phoneNumber"
                      v-model="phoneNumber"
                      type="text">
                    </v-text-field>    
                  </v-flex>
                </v-row> -->
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
                <v-row dense>
                  <v-flex xs12>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]"
                      ></v-text-field>    
                  </v-flex>
                </v-row>
                <v-row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading">
                      Sign Up
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
<!-- </v-app> -->
</template>

<script>
import mixins from '@/mixins/'
import firebase from 'firebase'

let authRef = firebase.auth()

export default {
  mixins: [mixins],
  data () {
    return {
      message: 'Welcome to Signup',
      email: '',
      password: '',
      displayName: "",
      alert: true,
      confirmPassword: '',
      displayName: null,
      phoneNumber: null
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
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
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  },
  methods: {
    onSignup () {
      authRef.createUserWithEmailAndPassword(this.email, this.password)
      .then( (result) => {
        return result.user.updateProfile({
          displayName: this.displayName
        })
      })
      .then( () => {
        this.$store.commit('setUserDisplayName',this.displayName)
      })
      .then( () => {
        this.$store.commit('clearError')
        this.$router.replace("/")
      })
      .catch( (error) => {
         this.$store.commit('setError', error.message)
      })
    },
    onDismissed () {
      alert('Closed')
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