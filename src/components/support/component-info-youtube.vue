<template>

    <div>
    <v-card-text class="h4">
      Enter the youTube video url below and that video will be embeded at the end of the content. You can then move it up.
      OR you can type ### where you want the video to appear and it will be embeded at that spot.
    </v-card-text>

    <v-card-text>
      <v-text-field
        v-model="youTubeId"
        label="YouTube Id#"
        placeholder="YouTube Id#"
      ></v-text-field>

      <v-btn color="button" dark block @click="insertYoutube()"><strong>Submit</strong></v-btn>
    </v-card-text>
    </div>

</template>

<script>
export default {
  props: ['section'],
  data() {
    return {
      youTubeId: null,
    }
  },
  methods: {
    youTubeGetID: function (url){
      let ID = ''
      url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/)
      if(url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i)
        ID = ID[0]
      }
      else {
        ID = url
      }
        return ID
    },
    insertYoutube: function(youTubeId = this.youTubeId){
      youTubeId = this.youTubeGetID(youTubeId)
      //the wrapper and iframe styles make the youtube responsive

      const embedCode = `<iframe class="youTubeInsert" width="560" height="400" src="https://www.youtube.com/embed/${youTubeId}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

      if ( this.section.content.includes('###') ) { this.section.content = this.section.content.replace('###',embedCode) } 
      else {
        this.section.content = `${this.section.content} ${embedCode}`
      }

      this.section.content.replace('###','')
      this.fixImageTag()
      this.updatePropertyInfoContent()
      this.closeDialog()
    },
    closeDialog: function(){
      this.$emit("closeDialog")
    },
    fixImageTag: function() {
      console.log('fixImageTag')
      let text = this.section.content
      text = text.replace("&lt;img","<img") 
      text = text.replace("&gt;",">") 
      this.section.content = text
    },
    updatePropertyInfoContent: function(){
      console.log("updating")
      this.$emit("insert", this.section.content)
      this.section = {}
      this.autoSaved = true
      this.imageObjChanged = false
      // this.$store.dispatch("updatePropertyInfoContent", this.section)
      // .then( () => {
      //   this.autoSaved = true
      //   this.imageObjChanged = false
      //  })
    },
    closeDialog: function(){
      this.$emit('closeDialog')
    },
  }
}
</script>

<style scoped>
div {
  width: 800px;
  margin: auto;
}
</style>