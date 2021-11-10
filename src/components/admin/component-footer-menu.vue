<template>
  <v-bottom-navigation
    :value = value
    color="primary"
    hide-on-scroll
    dense
    fixed
    height="50"
  >
    <v-btn
      text
      bottom
      v-if="userIsAuthenticated"
    >{{user.data.email}}</v-btn>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-icon 
          @click="goToRoute('Users')"
          v-bind="attrs"
          v-on="on"
          x-small
          dense
          >mdi-asterisk</v-icon>
      </template>
      <span>User is admin</span>
    </v-tooltip>

    <v-spacer></v-spacer>
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn>
          <v-icon 
            @click="goToRoute('Welcome')"
            v-bind="attrs"
            v-on="on"
            >mdi-home-circle-outline</v-icon>
        </v-btn>    
      </template>
      <span>Home</span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn>
          <v-icon 
            @click="returnHome()"
            v-bind="attrs"
            v-on="on"
            >mdi-skip-backward-outline</v-icon>        </v-btn>    
      </template>
      <span>Home</span>
    </v-tooltip>

    <v-spacer></v-spacer>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
          <v-icon 
            @click="logout"
            v-bind="attrs"
            v-on="on"
            >mdi-logout</v-icon>
      </template>
      <span>Logout</span>
    </v-tooltip>

  </v-bottom-navigation>    
</template>

<script>
import mixins from '@/mixins'

export default {
  mixins: [mixins],
  data() {
    return {
      value: 1,
      links: [
        {
          label: "Home",
          routeName: "Home",
          icon: "mdi-home-circle-outline",
          iconColor: "blue"
        },
        {
          label: "Back",
          routeName: "Deals",
          icon: "mdi-undo",
          iconColor: "green"
        },
        {
          label: "Contact",
          routeName: "Contact",
          icon: "mdi-contacts-outline",
          iconColor: "red"
        },
      ],
    }
  },
  computed:{
    propertyId: function(){
      return this.$store.getters.propertyId
    }
  }
}
</script>

<style>

.v-bottom-navigation .v-btn{
  height: 70px!important;
}

.theme--light.v-bottom-navigation .v-btn .v-btn__content .v-icon {margin-bottom:5px;}
.theme--light.v-bottom-navigation .v-btn:not(.v-btn--active) {
	color: rgba(0, 0, 0, 0.4) !important;
}
</style>