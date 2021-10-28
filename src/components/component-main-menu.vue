<template>
  <div class="outside mb-5">
    <v-container class="pa-4">
    
    <div class="inside">

    <transition name="fade3">
      <v-list
      class="mx-auto list transparent"
      max-width=""
      tile
      >
        <v-list-item v-for="(item, index) in cardItems" :key="index" class="listItem" @click="goToPageName(item.link)">
          <v-list-item-avatar class="main-menu-icon">
            <img :alt="item.title" v-bind:src="`/img/${item.icon}`">
          </v-list-item-avatar>        
          <v-list-item-content>
            <v-list-item-title class="text-left">{{item.title}}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <p class="details">Details</p>
          </v-list-item-action>        
        </v-list-item>
      </v-list>
    </transition>
    
    </div>
    
    </v-container>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      pageTitle: "Main Menu",
    }
  },
  computed: {
    cardItems: function() {
      return this.$store.getters.cardItems
    }
  },
  methods: {
    goToPageName: function(routeName){
      this.$router.push( { name: routeName} )
    }
  }
}
</script>

<style scoped>
/* div.outside {
  padding-bottom: 15px;
}
  div.inside {
  padding-bottom: 15px;
} */
.listItem {
  border: 0;
  border-radius: 12px;
  margin-bottom: 1rem;
  background-color: white;
  padding: .4rem 0.9rem;
}
.listItem:last-child {margin-bottom:0!important;}
.listItem .v-list-item__title{
  font-size:1.2rem;
}
.listItem .v-list-item__action {
  margin-bottom:0;
}
.listItem .details{
	background-color: #1B98FF14;
	padding: 10px 16px;
	color: #1B98FF;
	border-radius: 19px;
	font-size: 0.9em;
}
.listItem .main-menu-icon{
  border-radius:0;
  height: 54px!important;
  min-width: 54px!important;
  width: 54px!important;
}
.details {
  background-color: #EDF4F6;
  padding: 5px 10px;
  color: rgb(60, 99, 99);
  border-radius: 10px;
  font-size: .8em;
}
.fade3-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade3-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.v-list-item--link:hover::before {
	border-radius:12px;
  opacity:.02;
}
</style>