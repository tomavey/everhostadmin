<template>
  <v-app>
    <v-container>
    <p v-if="error">You may need to refresh this page to view newly added images</p>  
    <v-text-field
      id='search-images'
      name='search--images-input'
      label='Search by filename'
      v-model='searchString'
    >
    </v-text-field>

    <v-row dense wrap>
      <v-btn @click="showDialog = true"  v-if="!loading">Add a new image</v-btn>
      <v-progress-linear :indeterminate="true" v-else></v-progress-linear>
    </v-row>
    <div class="gridContainer">
      <div class="gridItem" v-for="(image, index) in images" :key=index>
            <a :href="image.src" target="_new">{{image.src}}</a>
        <v-img 
          :src='getThumbnail(image)'
          max-width="100"
          class="img"          
        >
        </v-img>
        <v-icon class="pointer" @click="deleteImageRecord(image)">mdi-trash-can</v-icon>
      </div>

    </div>

    <v-dialog
      v-model="showDialog"
    >
      <component-image-dialog ></component-image-dialog>
    </v-dialog>

    </v-container>  
  </v-app>
</template>

<script>
import mixins from '@/mixins/'
import componentImageDialog from '../../components/admin/component-image-dialog.vue'

export default {
  components: { componentImageDialog },
  mixins: [mixins],
  data() {
    return {
      message: "Images",
      searchString: "",
      useThumbNail: false,
      showDialog: false
    }
  },
  methods: {
    deleteImageRecord: function(DOCID){
      let r = confirm("Are you sure")
      if ( r ) {
        this.$store.dispatch("deleteImageRecord",DOCID)
        .then( this.$store.dispatch('updateFromFirestore', 'images') )
      }
    },
    getThumbnail: function(image){
      let fileName = image.src
      if ( !this.useThumbNail ) {
        return image.fileUrl
      }
      let name = fileName.replace(/\..+$/, '')
      let ext = fileName.split('.').pop()
      let path = "https://firebasestorage.googleapis.com/v0/b/access2021app.appspot.com/o/resources%2F"
      let queryString = "?alt=media"
      return path + name + '_200x200.' + ext + queryString
    },
    addNew: function () {
      this.$router.push( {name:'ImagesDialog'} )
    },
  },
  computed: {
    error: function() { return this.$store.getters.error },
    images: function(){
      return this.$store.getters.images
    },
    property: function() { return this.$store.getters.property }
  },
  async created() {
    await this.$store.dispatch('getProperty')
    await this.$store.dispatch('getImages')
  }
}
</script>

<style scoped>
  .gridContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 10px;
    grid-auto-rows: minmax(50px, auto);
    align-content: stretch;
    margin: 20px 40px;
  }

  .mobile {
    margin: 5px 5px;
  }
  
  .gridItem {
    padding:10px 5px;
    color: white;
    border: 2px solid grey;
    border-radius: 10px;
    box-shadow: 3px 3px 5px grey;
    overflow: hidden;
    text-align: center;
  }
  
  .pointer {
    cursor: pointer;
  }
   .img {
     margin: 0 auto;
   }

</style>