<template>
  <div class="home text-center">
    <v-container class="pa-0">
      <component-tool-bar :color=toolBarBackground />

      <v-card class="main-menu">
        <v-card-title>{{pageTitle}}</v-card-title>
        <!-- <component-property-menu></component-property-menu> -->
        <v-card-text>
          <v-carousel
            cycle
            interval=5000
            continuous
            >
              <v-carousel-item
                v-for="(item,i) in images"
                :key="i"
                :src="item.src"
                reverse-transition="fade-transition"
                transition="fade-transition"
              ></v-carousel-item>
          </v-carousel>
        </v-card-text>
      </v-card>
    </v-container>    
  </div>
</template>

<script>
import ComponentToolBar from '../components/component-tool-bar.vue'
// import ComponentPropertyMenu from '../components/component-property-menu.vue'

export default {
  components: {
    ComponentToolBar,
    // ComponentPropertyMenu
  },
  data() {
    return {
      pageTitle: "Images",
      showCard: false,
      toolBarBackground: "transparent",
    }
  },
  computed: {
    images: function(){
      return this.$store.getters.images
    }
  },
  methods: {
    getImages: function(){
      this.$store.dispatch("getImages","lux")
    }
  },
  mounted(){
    this.showCard = true
    this.getImages()
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