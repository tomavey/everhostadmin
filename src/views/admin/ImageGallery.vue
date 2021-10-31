<template>
<v-container fluid>
  <h1>{{pageTitle}}</h1>
      <p>The home page will use the image indicated by the <v-avatar color="green" size='25'><v-icon color="white" >mdi-home-heart</v-icon></v-avatar> icon.</p>
        <component-image-gallery-dialog
        ></component-image-gallery-dialog>
    <div class="gridContainer">
      <div class="gridItemClass" v-for="(image,index) in images" :key="index">
          <v-img :src=image.src class="image" >

        <!-- icon/button to move image up one -->
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              color="primary"
              size="30"
              @click="moveImageUp(image)"
              class="pointer"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="white" >mdi-arrow-up-left</v-icon>
            </v-avatar>
          </template>
            <span>Move image up</span>
        </v-tooltip>

        <!-- icon/button to move image down one -->
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              color="primary"
              size="30"
              @click="moveImageDown(image)"
              class="pointer"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="white" >mdi-arrow-down-right</v-icon>
            </v-avatar>
          </template>
          <span>Move image down</span>
        </v-tooltip>    

        <!-- icon/button to delete image -->
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              color="primary"
              size="30"
              @click="deleteImage(image)"
              class="pointer"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="white" >mdi-delete</v-icon>
            </v-avatar>
          </template>
          <span>Delete Image</span>
        </v-tooltip>
              
        <!-- icon/button to set home image -->
        <v-tooltip left v-if="!image.homeImage">
          <template v-slot:activator="{ on, attrs }">
            <v-avatar
              color="primary"
              size="30"
              @click="setAsHomeImage(image)"
              class="pointer"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="white" >mdi-home-plus-outline</v-icon>
            </v-avatar>
          </template>
          <span>Set as home page image.</span>
        </v-tooltip>

        <!-- icon/button to indicate home image -->
        <v-tooltip left v-if="image.homeImage">
          <template v-slot:activator="{ on, attrs }">
              <v-avatar
              color="green"
              size="30"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon color="white" >mdi-home-heart</v-icon>
            </v-avatar>
          </template>
          <span>This is the home page image</span>
        </v-tooltip>
      </v-img>
      </div>
    </div>

</v-container>
</template>

<script>
import mixins from "@/mixins"
import ComponentImageGalleryDialog from '../../components/admin/component-image-gallery-dialog.vue'

export default {
  mixins: [mixins],
  components: {ComponentImageGalleryDialog,},
  data(){
    return {
    }
  },
  methods: {
    deleteImage: function(n){
      this.$store.dispatch("deleteImage",n)
      this.$store.dispatch("getImages", this.propertyId)
    },
    reOrderImages: function(){
      this.$store.dispatch("reOrderImages")
    },
    moveImageUp: function(image){
      this.$store.dispatch("moveImageUp", image)
      .then( () => this.reOrderImages() )
    },
    moveImageDown: function(image){
      this.$store.dispatch("moveImageDown", image)
      .then( () => this.reOrderImages() )
    },
    setAsHomeImage: function(image){
      this.$store.dispatch("clearAllHomeImageFields")
      .then( () => {
        this.$store.dispatch("setAsHomeImage", image)
      })
      .then( () => {
        this.$store.dispatch("getImages", this.propertyId)
      })
    }      
  },
  computed: {
    images: function(){
      return this.$store.getters.images
    },
    propertyId: function(){
      return this.$store.getters.propertyId
    },
    propertyName: function(){
      return this.$store.getters.property.name
    },
    pageTitle: function(){
      return "Images for " + this.propertyName
    },
    cols: function(){
      if ( window.innerWidth < 500 ) { return 3 }
      return 4
    }
  },
  created(){
    this.$store.dispatch("getImages", this.propertyId)
  }

}
</script>

<style>
.gridContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 10px;
    grid-auto-rows: minmax(200px, auto);
    align-content: stretch;
    margin: 20px 40px;
}

.grid-item {
  background-color: #1976D2;
  padding:10px 5px;
  color: white;
  border-radius: 10px;
  box-shadow: 3px 3px 5px grey;
}

.image {
  height:200px;
}

.pointer {
  cursor: pointer;
}
</style>