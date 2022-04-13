<template>
  <div >
    <!-- {{image}} -->
    <!-- <v-btn 
      icon
      @click="closeDialog"
      class="float-right"
      >
      <v-icon>mdi-close-outline</v-icon>
    </v-btn> -->
  <!-- <slot name="header"> <h2>Upload and insert an image</h2></slot>   -->
  <slot name="instructions"><p>This will upload your image and insert it at the end of the content you are editing.  You can then move it up or align it center or right.</p></slot>  

  
  <v-form>
    <!-- <ehc-file-input   
            color="button" 
            v-model="image" 
            :props="uploadProps"></ehc-file-input> -->
    <v-text-field
      v-if="askDescription"
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
        <v-btn raised class="button" dark @click="onPickFile" block>
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
      <v-img
        v-if="image.base64"
        :src=image.base64
        ></v-img>
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
      {{uploadButtonText}}
      <v-icon right dark>mdi-location-center</v-icon>
      </v-btn>
      </v-flex>
    </v-row>    

  </v-form>
  </div>
</template>

<script>
  import mixins from "@/mixins"
  import EhcFileInput from '@/components/support/ehc-file-input.vue'


  export default {
    mixins: [mixins],
    components: {EhcFileInput},
    props: {
      imageButtonText: {
        default: 'Select an image.',
      },
      uploadButtonText: {
        default: "Upload this image"
      },
      askDescription: {
        default: true
      },
      isAvatarImg: {
        default: false
      }
    },
    data: () => ({
      uploadProps: {type: "fileInput", label: "upload screenshot(s)", key: "upload", multiple:false},
      image: {},
      formData: {},
      showTagsField: false,
      form: [
          {type: "fileInput",     label: "Select Image",      key: "upload",          multiple:true},           
      ],
    }),
    computed: {
      valid: function(){
        if ( !this.askDescription && this.image.fileName ) { return true }
        if ( this.image.description !== '' && this.image.fileName ) { return true }
        return false
      },
      propertyId: function(){
        return this.$store.getters.propertyId
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
            this.image.base64 = fileReader.result
          })
          // console.log(files[0])
          fileReader.readAsDataURL(files[0])
          this.image.file = files[0]
          console.log("this.image:", this.image)
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
        let propertyInfo = {
          propertyId: this.propertyId
        }
        let isAvatarImg = {
          isAvatarImg : this.isAvatarImg
        }
        let imageObj = {...this.image, ...userData, ...createdAt, ...propertyInfo, ...isAvatarImg}
        console.log("imageObj : ", imageObj)
        this.$store.dispatch('storeImage', imageObj)
        .then( () => {
          this.$store.dispatch('getImages')
          this.buildEmptyImageObj()
          this.closeDialog()
         } )
      },
      closeDialog: function(){
        this.$emit("closeDialog")
      },
      //probably need to just create default obj in data
      buildEmptyImageObj: function(){
        this.image = {
          description: "",
          tags: "",
          fileName: "",
          fileUrl: "",
          file: null,
          base64: null
        }
      }
    },
    created () {
      this.buildEmptyImageObj()
    }  
  }
</script>

<style scoped>
</style>


