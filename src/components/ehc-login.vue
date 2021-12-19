<template>
    <div>
        <v-dialog 
            v-model="loggedOut"
            persistent
            max-width="400" 
        >
            <v-card >
                <v-toolbar  flat>
                    <v-img src="@/assets/Everhost-Logo_Green-Circle_300x73.png" contain height="50px"></v-img>
                </v-toolbar>
                <v-card-text>
                    <v-text-field 
                        v-model="credentials.email"
                        dense
                        outlined
                        label="e-mail" 
                        ></v-text-field>
                    <v-text-field 
                        dense
                        outlined
                        v-model="credentials.password"
                        label="Password" 
                        type="password"
                        class="ma-0"
                        ></v-text-field>     
                    <v-btn color="primary" dark width="100%" class="ma-0 pa-0" @click="login(credentials)">login</v-btn>   
                </v-card-text>
            </v-card>
        </v-dialog>


        <tempalate v-if="loggedIn">
            <slot></slot>
        </tempalate>
    </div>

</template>

<script>
import auth from "@/mixins/auth.vue"
export default {
  props: [],
  mixins: [auth],
  data () {
    return {
        credentials: {
            email: null,
            password: null
        },
        loggedIn: false,
    }
  },
  computed: {
        loggedOut: function() {
            return !this.loggedIn
        },
        user: function () {
            return this.$store.getters.user
        },
  },
  methods: {

  }
}
</script>