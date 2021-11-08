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
      <wysiwyg v-model="content"/>
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
      pencilColor: "green",
      content: "",
    }
  },
  computed: {
    propertyId: function() {
      return this.$store.getters.propertyId
    },
    instruction: function() {
      let instructionArray = this.$store.getters.instructions.filter( (el) => el.docId === this.contentName )
      if ( instructionArray.length ) {
        return this.$store.getters.instructions.filter( (el) => el.docId === this.contentName )[0].content
      } else { return "no instructions yet" }
    },
    contentName: function(){
      return this.$store.getters.contentName
    }
  },
  methods: {
    submit: async function() {
      let obj = {}
      obj[this.contentName] = this.content
      let docId = this.propertyId
      console.log('Now I will set: ',obj)
      console.log('To docId: ', docId)
      propertiesRef.doc(docId).set(obj, {merge: true})
      .then( () => console.log("Property content updated successfully", docId) )
      await this.clearContent()
      await this.$store.dispatch('getProperty')
      await this.$store.dispatch('setContentNameToNext')
      await this.goToContentDialog()
    },
    goToContentDialog: function(){
      if ( this.contentName === "images" ) {
        this.$router.push({name:'ImageGallery'})
      } else {
        this.goToRoute('NewPropertyInfoDialog')
      }
    },
    setContent: function(){
      let content = this.$store.getters.property[this.contentName]
      this.$store.commit('setContent',content)
    },
    clearContent: function(){
      this.content = ""
    }
  },
  created(){
    // this.$store.dispatch("getProperty")
    this.setContent()
  }
}
</script>

<style scoped>
  .pointer {
    cursor:pointer
  }  
</style>

