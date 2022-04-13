<template>
<ehc-page class="d-5-md" >  
  <ehc-card :width=width style="margin: 0 auto">
      <v-card-text class="text-h4 text-center">Support</v-card-text>
      <v-icon v-if ="userIsAdmin" @click="showEditor = !showEditor">mdi-pencil</v-icon>  
    <ehc-card-content v-if="!showEditor" v-html="content"></ehc-card-content>  

    <div v-if="showEditor"> <!---not sure why wrapper div is needed--->
    <ehc-card-content >
      <ehc-card-toolbar @edit="showEdit=!showEdit">

        <ehc-button-small @submit="imagePopup=true" icon="mdi-image-outline" text="Image"></ehc-button-small>
        <ehc-button-small @submit="youTubePopup = true" icon="mdi-youtube" text="YouTube" class="ml-2"></ehc-button-small>
        
        <template v-slot:right>
            <ehc-button-small @submit="save"  v-bind="saveButton"></ehc-button-small>
        </template>

      </ehc-card-toolbar>

      <ehc-editor v-model="content" @change="saved=false"></ehc-editor>

    </ehc-card-content>
    </div>

  </ehc-card>
   <ehc-image-upload 
      v-model="imagePopup" 
      title="Upload Image" 
      :uploadPath="'/supportPictures/'+Date.now()"  
      instructions="Your image will appear at the end of the section OR you can type ### where you want the video to appear and it will be embeded at that spot!"
      @upload="addImageToSectionContent($event)" 
      :size="{
          width: 450,
          height: 450
      }"/>
    <ehc-dialog v-model=youTubePopup title="embed a youtube video" close>
      <component-info-youtube @closeDialog="youTubePopup=false" :section=draft @insert="content=$event">
      </component-info-youtube>
    </ehc-dialog>
</ehc-page>      
</template>

<script>
import EhcEditor from '../components/ehc-editor.vue'
import EhcCardContent from '../components/support/ehc-card-content.vue'
import EhcCard from '../components/support/ehc-card.vue'
import EhcEditSectionPage from '../components/support/ehc-edit-section-page.vue'
import EhcCardToolbar from '../components/support/ehc-card-toolbar.vue'
import ehcPage from '../components/support/ehc-page.vue'
import auth from '@/mixins/auth'
import EhcImageUpload from '../components/ehc-image-upload.vue'
import ComponentInfoYoutube from '../components/support/component-info-youtube.vue'

export default {
  components: { ehcPage, EhcCard, EhcCardContent, EhcEditSectionPage, EhcEditor, EhcCardToolbar, EhcImageUpload, ComponentInfoYoutube },
  mixins: [auth],
  data() {
    return {
      pageTitle: 'Support',
      data: '',
      saved: true,
      content: "",
      draft: {},
      imagePopup: false,
      youTubePopup: false,
      draft: {
        section: '',
        content: ''
      },
      saveButton: {
        text: 'Save',
        icon: 'mdi-content-save',
        color: 'green',
        disabled: false
      },
      showEditor: false,
    }
  }, 
  computed: {
    width: function() {
      if ( window.innerWidth < 800 ) { return '700' }
      if ( window.innerWidth < 1200 ) { return '1000' }
        return '1400'
      }
  },  //end of computed
  methods: {
    save() {
      this.$store.dispatch('saveSupportPage', this.content)
      this.showEditor = false
    },
    getImageTag: function(imageUrl){
      return `<img style='display:block;margin: 0 auto;max-width:100%' class='contentImage' src='${imageUrl}' />`
    },        
    addImageToSectionContent: function(imageUrl){
      let urlLink = this.getImageTag(imageUrl)
      if ( this.content.includes('###') ) { this.content = this.content.replace('###',urlLink) } 
      else { this.content = this.content + urlLink }
    },
  },
  mounted() {
    this.$store.dispatch('getSupportPage')
    .then( () => {
      this.content = this.$store.getters.supportPage
      this.draft = {
        section: 'support',
        content: this.content
      } 
    })
  }
}
</script>

<style scoped>
.support {
  margin: 0 auto;
}
.youtubedialog{
  width: 800px;
  margin: 0 auto;
}
</style>