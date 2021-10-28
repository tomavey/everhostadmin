<template>
  <div>
    <v-container>
    <v-form @submit.prevent="submit">

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

      <v-row>
        <v-col
          cols="12"
          md="4"
        >
          <v-text-field
            v-model="image.sortOrder"
            label="Image Sort Order"
            tabindex="2"
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
  
    </v-form>
    </v-container>
  </div>
</template>

<script>
import mixins from '@/mixins'

export default {
  mixins: [mixins],
  data(){
    return {
      pageTitle: "Edit Image",
      image: {}
    }
  },
  computed: {
    propertyId: function(){
      return this.$store.getters.propertyId
    }
  },
  methods: {
    submit: function(){
      this.image.propertyId = this.propertyId
      this.$store.dispatch("submitImage",this.image)
      .then( this.goToRoute("ImageGallery") )
      .catch( (err) => console.log(err) )
    },
    getImages: function(){
      this.$store.dispatch.getImages(this.propertyId)
    },
    getImage: function(docid){
      alert("get image")
    }
  },
  created(){
  }
  
}
</script>