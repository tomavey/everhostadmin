<template>
  <div class="home">
    <v-container>

    <component-tool-bar :color=toolBarBackground />

    <v-scroll-y-reverse-transition>
      <v-card 
        class="main-menu" 
        v-if="showCard" 
        >
        <v-card-title>{{pageTitle}}</v-card-title>
        <v-card-text>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime nulla odit nemo animi dolores laboriosam, ab recusandae eaque accusamus atque beatae vitae voluptatum? Inventore consectetur sapiente voluptatibus quia, ut doloremque?
        </v-card-text>
      </v-card>
    </v-scroll-y-reverse-transition>

    </v-container>    
  </div>
</template>

<script>
import ComponentToolBar from '../components/component-tool-bar.vue'

export default {
  components: {
    ComponentToolBar
  },
  data() {
    return {
      pageTitle: "Deals",
      showCard: false,
      toolBarBackground: "transparent",
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
}
</style>