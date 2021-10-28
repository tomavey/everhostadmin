<template>
<div>
  <v-form @submit.prevent="submit">
    <v-container>
      <wysiwyg v-model="instruction" />
      <v-btn
        class="mr-4"
        color="primary"
        type="submit"
        block
      >
        submit
      </v-btn>
    </v-container>
  </v-form>
  </div>
</template>  

<script>
import firebase from 'firebase'
import mixins from '@/mixins'

const instructionsRef = firebase.firestore().collection('instructions')

export default {
  mixins: [mixins],
  data() {
    return {
      pageTitle: "welcome to instructions dialog",
      instruction: "",
      contentName: "",
    }
  },
  computed: {
  },
  methods: {
    submit: function() {
      let obj = {}
      obj.content = this.instruction
      let docId = this.contentName
      console.log(obj)
      instructionsRef.doc(docId).set(obj, {merge: true})
      .then( () => {
        console.log("Instruction updated successfully")
        this.$store.dispatch('getInstructions')
      } )
      .catch( e => console.log(e) )
      this.$router.go(-1)
    },
  },
  created(){
    this.contentName = this.$route.params.contentName
    this.instruction = this.$store.getters.instructions.filter( (el) => el.docId === this.contentName )[0].content
  }

}
</script>

<style scoped>
  .pointer {
    cursor:pointer
  }  
</style>

