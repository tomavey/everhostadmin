<template>
<div>
  <v-form @submit.prevent="submit">
    <v-container>
      <h2 v-html="instruction" />
      <v-icon 
        v-if="userIsAdmin" 
        :color=pencilColor
        @click="$router.push({name: 'InstructionsDialog', params: {contentName: 'description'}})"
        >
          mdi-pencil
      </v-icon>
      <span v-if="userIsAdmin">{{propertyId}}</span>
      <v-icon
        v-if="userIsAuthenticated" 
        color="green" 
        dense
        class="float-right">
        mdi-asterisk
      </v-icon>
      <wysiwyg v-model="content2"/>
      <v-btn
        class="mr-4"
        color="primary"
        type="submit"
        block
      >
       Submit
      </v-btn>
    </v-container>
  </v-form>
  </div>
</template>  

<script>
import firebase from 'firebase'
import mixins from '@/mixins'


const propertiesRef = firebase.firestore().collection('properties')

export default {
  mixins: [mixins],
  data() {
    return {
      content: "",
      contentName: "",
      pencilColor: "green"
    }
  },
  computed: {
    propertyId: function() {
      return this.$store.getters.propertyId
    },
    instruction: function() {
      return this.$store.getters.instructions.filter( (el) => el.docId === this.contentName )[0].content
    },
    nextContentName: function(){
      let namesArray = this.$store.getters.subSectionsRoutesArray
      let i = namesArray.indexOf(this.contentName)
      if ( i === namesArray.length ) { return "propertieslist" }
      return namesArray[i + 1] 
    },
    content2: {
      get() { return this.$store.getters.property[this.contentName] },
      set(value) { this.$store.commit("setContent", value) }
    }
  },
  methods: {
    submit: async function() {
      let obj = {}
      obj[this.contentName] = this.content2
      let docId = this.propertyId
      console.log(obj)
      propertiesRef.doc(docId).set(obj, {merge: true})
      console.log("Property content updated successfully")
      await this.$store.dispatch('getProperty',this.propertyId)
      await this.goToContentDialog(this.nextContentName)
    },
    goToContentDialog: function(contentName){
      if ( contentName === "images" ) {
        this.$router.push({name:'ImageGallery'})
      } else {
        this.$router.push({name:'NewPropertyInfoDialog', params: {contentName:contentName}})
      }
    },
    getContent: function(){
      this.content = this.$store.getters.property[this.contentName]
    }
  },
  created(){
    console.log("created running")
    this.contentName = this.$route.params.contentName
    this.content = ""
    console.log(this.content)
    this.$store.dispatch("getProperty")
    .then( () => {
      this.getContent()
    })
  }
}
</script>

<style scoped>
  .pointer {
    cursor:pointer
  }  
</style>

