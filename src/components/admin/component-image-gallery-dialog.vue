<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      max-width="600px"
      transition="dialog-bottom-transition hide-on-leave"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          class="ma-auto"
        >
          add a new image
        </v-btn>
      </template>
      <v-container>  
      <v-form @submit.prevent="submit" class="pa-15 white">
      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="image.src"
            label="Image Url"
            tabindex="1"
          ></v-text-field>
        </v-col>  
      </v-row>

      <v-btn
        class="mr-4"
        color="primary"
        type="submit"
      >
        submit
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="dialog = false"
      >
        Close
      </v-btn>
    </v-form>
    </v-container>
    </v-dialog>
  </v-row>
</template>

<script>
import mixins from '@/mixins'

export default {
  mixins: [mixins],
  data(){
    return {
      pageTitle: "Edit Image",
      image: {},
      dialog: false
    }
  },
  computed: {
    propertyId: function(){
      return this.$store.getters.propertyId
    },
    images: function(){
      return this.$store.getters.images
    }
  },
  methods: {
    submit: function(){
      this.image.propertyId = this.propertyId
      this.image.sortOrder = this.images.length + 1
      this.$store.dispatch("submitImage",this.image)
      .then( this.getImages() )
      .then( this.dialog = false )
      .then( this.image = {} )
      .catch( (err) => console.log(err) )
    },
    getImages: function(){
      this.$store.dispatch("getImages", this.propertyId)    
    },
    getImage: function(docid){
      alert("get image")
    }
  },
  created(){
    this.getImages()
  }
  
}
</script>