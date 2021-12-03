<template>
  <v-card class="container">
    <v-btn 
      icon
      @click="closeDialog"
      class="float-right"
      >
      <v-icon>mdi-close-outline</v-icon>
    </v-btn>
  <v-form>
    <v-text-field
      v-model="image.description" 
      label="Image Description"
    ></v-text-field>

    <v-text-field
      v-model="image.tags"
      label="Tags"
      v-if="showTagsField"
    ></v-text-field>
    
    <v-row dense>

      <v-flex xs12>
        <p>File Selected: {{ image.fileName }}</p>
        <v-btn raised class="primary" @click="onPickFile" block>
          {{imageButtonText}}
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
        <input 
          type="file" 
          style="display:none" 
          ref="fileInput"
          @change="onFilePicked"
          >
      </v-flex>

    </v-row>
    
    <v-row dense>

      <v-flex xs12>
        <p>File Selected: {{ image.fileName }}</p>
      </v-flex>

    </v-row>

    <p>&nbsp;</p>

    <v-row dense>
      <v-flex xs12>
      <v-btn
        raised
        color="success"
        large
        block
        :disabled=!valid
        @click="submit"
      >
      Upload your image!
      <v-icon right dark>mdi-location-center</v-icon>
      </v-btn>
      </v-flex>
    </v-row>    

  </v-form>
  </v-card>
</template>

<script>
  import firebase from 'firebase'
  import mixins from "@/mixins"

  const resourcesRef = firebase.firestore().collection('resources')

  export default {
    mixins: [mixins],
    data: () => ({
      image: {},
      imageButtonText: 'Select an image from your device to upload.',
      showTagsField: false
    }),
    computed: {
      valid: function(){
        if ( this.image.description !== '' && this.image.fileName ) { return true }
        return false
      }
    },
    methods: {
      //clicks the hidden file input type="file" 
      onPickFile () {
        this.$refs.fileInput.click()
      },
      //method called when hidden file input event is clicked
      onFilePicked (event) {
        // console.log("onfilepicked")
        //creates a reference an array of files selected - we are only going to use the first one [0]
        const files = event.target.files
        // console.log("files: ",files)
        //is the file size is reasonable size, put the file name in this.resource
        if ( files[0].size < 150000000 ) {
          this.image.fileName = files[0].name
          // console.log("this.resource.fileName: ",this.resource.fileName)
          //I think this makes sure there is a . in the filename
          if (this.image.fileName.lastIndexOf('.') <= 0) {
            alert('Select a valid image')
          }
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.image.fileUrl = fileReader.result
          })
          // console.log(files[0])
          fileReader.readAsDataURL(files[0])
          this.image.file = files[0]
          // console.log("this.resource:", this.resource)
        } else {
          alert('This file size too large: ' + files[0].size/1024/1024 + "MB" + "  - consider submitting a link instead")
        }
      },
      submit: function () {
        this.$store.commit("setLoading",true)
        let userData = {}
        if ( this.userIsAuthenticated ) { 
          userData = {
            authorName: this.user.data.displayName,
            authorEmail: this.user.data.email,
            authorId: this.user.data.uid,
          } 
        }
        let createdAt = {
          'datetime': Date.now(),
          'reverseDatetime': -Date.now()
        }
        let imageObj = {...this.image, ...userData, ...createdAt}
        console.log("imageObj : ", imageObj)
        this.$store.dispatch('storeImage', imageObj)
        .then( () => this.$store.dispatch("getImages") )
        .then( () => {
          console.log("dispatch ran")
          this.closeDialog()
         } )
      },
      buildImageObj: function(){
        let imageObj = {}
        imageObj.description = ""
        imageObj.tags = ""
        imageObj.fileName = null
        this.image = imageObj
      },
      closeDialog: function(){
        this.$emit("closeDialog")
      }
    },
    created () {
      this.buildImageObj()
    }  
  }
</script>

<style scoped>
</style>


