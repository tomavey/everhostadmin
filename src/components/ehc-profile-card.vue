<template>
    <v-card width="350" flat height="100%">

      <v-container class="pa-1 ma-1">
        <v-row>
          <v-col
            class="pt-4 pl-5"
            justify="center">
            {{org.name}}
          </v-col>
          <v-col self-align="end" cols="2">
            <v-tooltip bottom >
                <template v-slot:activator="{ on, attrs }">
                <v-btn plain small fab v-on="on" v-bind="attrs" @click="$store.dispatch('logout')"><v-icon>mdi-logout</v-icon></v-btn>
                </template>
                <span>Logout</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row class="pa-0 ma-0">
          <v-col align="center"
                justify="center"
                cols="4"
                class="pl-0 pr-0 ma-0">
            <ehc-user-avattar size="100" :photoURL="user.photoURL"></ehc-user-avattar>
          </v-col>
          <v-col cols="1" class="pl-0 pr-0 ma-0">
            <v-divider vertical />
            </v-col>
          <v-col align="left"
                justify="left"
                cols="6"
                class="pl-0 pr-0 ma-0">
            <strong>{{user.displayName}}</strong>
            {{user.email}}
            <a href="#" color="Black2" @click="$emit('changeProfilePic')">Change Profile Picture</a>
          </v-col>
        </v-row>
        <v-row></v-row>
      </v-container>
    </v-card>
</template>


<script>
import auth from "@/mixins/auth.vue"
import EhcUserAvattar from "@/components/ehc-user-avatar.vue"
import ehcImageUpload from "@/components/ehc-image-upload.vue"

import api from "@/mixins/api.vue"


export default {
  props: [],
  mixins: [api, auth],
  components:{EhcUserAvattar, ehcImageUpload},
  data () {
    return {
      picDialog: false
    }
  },
  mounted() {
    this.apiGetUser(this.user.uid)
  },
  computed: {
    org() {
      return this.$store.getters.org
    },

  },
  methods: {
    openDialog() {
      console.log("openDialog")
      this.picDialog= true
    }

  }
}
</script>