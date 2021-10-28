<template>
  <div class="home">
    <v-container class="container-home pa-0">

    <component-tool-bar :color=toolBarBackground />
    <component-floating-button v-if="userIsAuthenticated" />
      <transition name="slide-up" tag="p">
        <div v-if="showCard" class="property-info=cards">
        <div v-for="section in subSections" :key=section.label>
          <v-card 
            class="main-menu" 
            v-if="propertyTab === section.tabLabel"   
            :loading=loading
            >
            <v-card-title>Property Info</v-card-title>
            <component-property-menu></component-property-menu>
            <v-card-text :class="cardClass" v-html="property[section.docid]">
            </v-card-text>
          </v-card>
        </div>
        </div>
      </transition>  


    </v-container>    
  </div>
</template>

<script>
import ComponentPropertyMenu from '../components/component-property-menu.vue'
import ComponentToolBar from '../components/component-tool-bar.vue'
import mixins from '@/mixins/'
import ComponentFooterMenu from '../components/component-footer-menu.vue'
import ComponentFloatingButton from '../components/component-floating-button.vue'

export default {
  components: {
    ComponentToolBar,
    ComponentPropertyMenu,
    ComponentFooterMenu,
    ComponentFloatingButton
  },
 mixins: [mixins],
 data() {
    return {
      pageTitle: "Property Information",
      showCard: false,
      toolBarBackground: "transparent",
      cardClass: "text-md-body-1",
    }
  },
  methods: {
    goToDialog: function() {
      this.$router.push({name: "PropertyInfoDialog"})
    },
  },
  computed: {
    subSections: function(){
      return this.$store.getters.subSections
    },
    propertyId: function() {
      return this.$store.getters.propertyId
    },    
    property: function() { return this.$store.getters.property },
    propertyTab: function() { return this.$store.getters.propertyTab },
    loading: function() { 
      if ( !this.subSections.length ) {
        return true
      } else { return false }
    }  
  },
  created() {
  },
  mounted(){
    this.showCard = true
  }
}
</script>

<style scoped>

  .property-info-cards {
      padding-bottom: 30px;
  }

  .home {
    background-color:#1f1e52;
    color: white;
    height: 100%;
    padding-top: 20px;
  }

  .main-menu {
    width:800px;
    border-radius: 20px;
  }

  .slide-up-enter-active {
    transition: all .2s ease;
  }
  .slide-up-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-up-enter, .slide-fade-leave-to {
    transform: translateY(100vh);
    opacity: 0;
  }
</style>