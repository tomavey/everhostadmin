<template>
<v-app>
  <v-container>
    {{image}}
  <v-form v-model="valid">
    <v-text-field
      v-model="image.description" 
      label="Image Description"
      required
    ></v-text-field>

    <v-text-field
      v-model="image.tags"
      label="Tags"
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
          @change="onFilePicked">
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
        :disabled="!valid"
        @click="submit"
      >
      Submit your image!
      <v-icon right dark>mdi-location-center</v-icon>
      </v-btn>
      </v-flex>
    </v-row>    

  </v-form>
  </v-container>
</v-app>  
</template>

<script>
  import firebase from 'firebase'
  import mixins from "@/mixins"

  const resourcesRef = firebase.firestore().collection('resources')

  export default {
    mixins: [mixins],
    data: () => ({
      // cohort: '',
      image: {
      },
      imageButtonText: 'Select a file from your device to upload.',
      valid: false
    }),
    computed: {
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
          this.resource.fileName = files[0].name
          // console.log("this.resource.fileName: ",this.resource.fileName)
          //I think this makes sure there is a . in the filename
          if (this.resource.fileName.lastIndexOf('.') <= 0) {
            alert('Select a valid file')
          }
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.resource.fileUrl = fileReader.result
          })
          // console.log(files[0])
          fileReader.readAsDataURL(files[0])
          this.resource.file = files[0]
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
        let newResource = {...this.resource, ...userData, ...createdAt}
        console.log("this.resource: ", this.resource)
        console.log("newResource: ", newResource)
        this.$store.dispatch('updateIdeas', newResource)
        .then( () => {
          this.$store.dispatch('updateFromFirestore', 'courses')
        })
        .then( () => {
          if ( this.resource.collection === "resources") {
            this.$router.push('/resources/' + this.resource.cohort)
          } else {
            this.$store.commit("setError", true)
            this.$store.dispatch('updateFromFirestore', 'images')
            this.$router.push('/images/')
          }
          // this.$router.push({path: `/${newResource.collection}`, params: {searchString: newResource.cohort}})
        })
      },
      buildImageObj: function(){
        let imageObj = {}
        imageObj.description = ""
        imageObj.tags = ""
        imageObj.fileName = null
        this.image = imageObj
      }
    },
    created () {
      this.buildImageObj()
    }  
  }
</script>


