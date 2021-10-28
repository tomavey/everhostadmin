<template>
  <v-bottom-navigation
    :value = value
    color="primary"
    hide-on-scroll
    fixed
    height="70"
  >
    <v-btn
      v-for="link in links"
      @click=goToRoute(link.routeName)
      :key=link.label
      x-large
    >
      <span>{{ link.label }}</span>
      <v-icon :color=link.iconColor>{{link.icon}}</v-icon>
    </v-btn>

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
          label: "Deals",
          routeName: "Deals",
          icon: "mdi-handshake-outline",
          iconColor: "green"
        },
        {
          label: "Contact",
          routeName: "Admin",
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