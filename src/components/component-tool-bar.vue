<template>
  <v-toolbar dense :color=color class="toolBar white--text">
    
    <v-btn icon @click="goToLink(leftMenuItem.link)">
      <v-icon color="white">{{leftMenuItem.icon}}</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn icon v-for="( item,index) in rightMenuItems" :key="index" @click="goToLink(item.link)">
      <v-icon color="white">{{item.icon}}</v-icon>
    </v-btn>

  </v-toolbar>
</template>

<script>
export default {
  props: ['color'],
  data() {
    return {
      leftMenuItem: 
        {
          icon: "mdi-undo",
          link: "back"
        },
      rightMenuItems: [
        {
          icon: "mdi-share-variant",
          link: "goToLink"
        },
      ]
    }
  },
  methods: {
    goToLink: function(link){
      if ( link === "goToLink") { alert("something will happen later")}
      else if ( link === "back" && this.$route.name !== 'Home' ) { this.$router.go(-1) }
      else if ( link === 'logout' ) { this.$store.dispatch("logout"); return }
      else if ( link !== "back" ) { this.$router.push( {name: link} ) }   
    }
  }
}
</script>

<style scoped>
.toolBar {
  margin-bottom: 20px;
  margin-top: 15px;
  box-shadow:none!important;
}

.toolBar .v-btn{background-color: rgba(255,255,255,0.15);}
</style>