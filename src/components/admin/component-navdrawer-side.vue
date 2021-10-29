<template>
  <v-navigation-drawer
    v-model="drawer2"
    app
    class="pt-4"
    color="grey lighten-3"
    >

    <v-list>
      <div
        v-for="n in navItems"
        :key=n.n
      >
        <v-list-item
          v-if="showNavItem(n)"
          :color="`grey ${n === 1 ? 'darken' : 'lighten'}-1`"
          :size="n === 1 ? 36 : 20"
          class="d-block text-center mx-auto mb-9"
          @click="goToRoute(n.routeName)"
        ><v-btn text>
            {{n.label}}
          </v-btn>
        </v-list-item>

      </div>
      <div v-if="userIsAuthenticated">
        <v-list-item 
          v-if="userIsAdmin"         
          class="d-block text-center mx-auto mb-9"
          @click="logout"
        >
          Logout
        </v-list-item>
        <v-list-item 
          v-if="userIsAdmin"         
          class="d-block text-center mx-auto mb-9 text-caption"
        >
          User is admin
        </v-list-item>
      </div>
      <div v-if="!userIsAuthenticated">
        <v-list-item 
          class="d-block text-center mx-auto mb-9"
          @click="showSignin = !showSignin"
        >
          Signin
        </v-list-item>
      </div>
    </v-list>

  </v-navigation-drawer>

</template>

<script>
import mixins from "@/mixins"

export default {
  props: ['navItems','error','drawer'],
  mixins: [mixins],
  data() {
    return {
      showSignin: false,
    }
  },
  computed: {
    drawer2: {
      get() { return this.drawer },
      set(value) { return }
    }
  },
  methods: {
    showNavItem: function(n){
      if ( this.userIsAdmin ) { return true }
      if ( !n.adminOnly && this.userIsAuthenticated ) { return true }
      return false
    },
    logout(){ this.$emit("logout") },
    signin() { this.$emit("signin")},
  }
}
</script>