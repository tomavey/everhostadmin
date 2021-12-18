<template>
  <v-navigation-drawer
    v-model="drawer"
    class="pt-4"
    color="grey lighten-3"
    absolute
    temporary
    >

    <v-list>
      <div
        v-for="(n,i) in navItems"
        :key=i
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
        <v-list-item 
          v-if="userIsAdmin"         
          class="d-block text-center mx-auto mb-9"
          @click="createDefaultProperty"
        >
          Create Default Property
        </v-list-item>
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
          @click="goToRoute('Signin')"
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
  props: ['navItems','error',],
  mixins: [mixins],
  data() {
    return {
    }
  },
  computed: {
    drawer: {
      get(){ return this.$store.getters.adminDrawer },
      set(value) { this.$store.commit('setAdminDrawer', value)}
    }
  },
  methods: {
    createDefaultProperty: function(){
      this.$store.dispatch('createDefaultProperty')
    },
    showNavItem: function(n){
      if ( this.userIsAdmin ) { return true }
      if ( !n.adminOnly && this.userIsAuthenticated ) { return true }
      return false
    },
  }
}
</script>