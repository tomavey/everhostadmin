<template>
  <div class="home">
    <v-container class="pa-0">

    <component-tool-bar :color=toolBarBackground />

     <v-scroll-y-reverse-transition>
      <v-card 
        class="main-menu" 
        v-if="showCard"
        >
        <vue-weather
          class="eh-ww" 
          api-key="f2bee44b2597fa9b0c406e0ece8b8480" 
          units="us" 
          :address=address
        >
          <template v-slot:header><h3>Weather for {{address}}</h3></template>
        
        </vue-weather>
      </v-card>
    </v-scroll-y-reverse-transition>

    </v-container>    
  </div>
</template>

<script>
import ComponentToolBar from '../components/component-tool-bar.vue'
import VueWeather from "vue-weather-widget";

export default {
  components: {
    ComponentToolBar,
    VueWeather
  },
  data() {
    return {
      pageTitle: "Weather",
      showCard: false,
      toolBarBackground: "transparent",
    }
  },
  computed: {
    address: function(){
      return "Detroit"
      // return this.$store.getters.property.address
    }
  },
  mounted(){
    this.showCard = true
  }
}
</script>

<style scoped>
.home {
  background-color:#1f1e52;
  color: white;
  height: 100%;
  padding-top: 20px;
}

.main-menu {
  width:800px;
  padding:20px;
}

.vww__widget.eh-ww .vww__content{
  padding:20px!important;
}

</style>