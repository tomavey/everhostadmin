<template>
  <div class="home text-center">
    <v-container class="pa-0 mb-10">
      <component-tool-bar :color=toolBarBackground />
      <v-avatar :size="avatarSize" class="mb-3">
        <v-img 
          :src=pageImage
          lazy-src="../assets/img/placeholder.png" 
          />
      </v-avatar>
      <h1 class="mb-5">{{pageTitle}}&nbsp;</h1>

      <transition name="slide-up">
        <component-main-menu 
          class="main-menu" 
          v-if="showComponent"
          >
        </component-main-menu>
      </transition>

    </v-container>
  </div>
</template>

<script>
import ComponentMainMenu from '../components/component-main-menu.vue'
import ComponentToolBar from '../components/component-tool-bar.vue'

  export default {
    name: 'Home',

    components: {
      ComponentMainMenu,
      ComponentToolBar
    },
    data() {
      return {
        showComponent: false,
        toolBarBackground: "transparent"
      }
    },
    computed: {
      avatarSize: function() {
        return 150
      },
      pageTitle: function() {
        return this.$store.getters.property.name
      },
      propertyId: function(){
        return this.$store.getters.propertyId
      },
      pageImage: function(){
        let homeImage =  this.$store.getters.images.filter( (el) => {
          return el.homeImage === true
        })
        console.log(homeImage.length)
        if ( homeImage.length ) { return homeImage[0] }
        return this.$store.getters.images[0]
      }
    },
    created(){
      this.$store.dispatch("getImages", this.propertyId)
    },
    mounted(){
      this.showComponent = true
    }
  }
</script>

<style>

  .home {
    background-image: url("../assets/img/app-bg-purple.png"); 
    background-attachment: fixed;
    background-position: center top;
    background-size: cover;
    color: white;
    height: 100%;
    padding-top: 20px;
    padding-bottom:80px;
  }

  .main-menu {
    border-radius: 20px;
    background-color: #EDF4F6;
    margin: auto;
    max-width: 800px
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  .slide-up-enter-active {
    transition: all 0.6s ease-in-out;
    transition-delay: .3s;
  }
  .slide-up-leave-active {
    transition: all .4s ease-in-out;
  }
  .slide-up-enter, .slide-fade-leave-to {
    transform: translateY(8vh);
    opacity: 0;
  }
</style>