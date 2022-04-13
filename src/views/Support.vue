<template>
<ehc-page>  
  <ehc-card>
      <v-card-title class="text-h4">Support</v-card-title>
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
      {{content}}

    </ehc-card-content>
    </div>

  </ehc-card>
   <ehc-image-upload 
      v-model="imagePopup" 
      title="Upload Image" 
      :uploadPath="'/supportPictures/'+'-'+Date.now()"  
      instructions="Your image will appear at the end of the section OR you can type ### where you want the video to appear and it will be embeded at that spot!"
      @upload="addImageToSectionContent($event)" 
      :size="{
          width: 450,
          height: 450
      }"/>
    <ehc-dialog v-model=youTubePopup title="embed a youtube video" close>
      <component-info-youtube @closeDialog="youTubePopup=false" :section=draft @insert="draft=$event">
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

export default {
  components: { ehcPage, EhcCard, EhcCardContent, EhcEditSectionPage, EhcEditor, EhcCardToolbar, EhcImageUpload },
  mixins: [auth],
  data() {
    return {
      pageTitle: 'Support',
      data: '',
      saved: true,
      content: "",
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
  },  //end of computed
  methods: {
    save() {
      this.$store.dispatch('saveSupportPage', this.content)
    },
      addImageToSectionContent: function(imageUrl){
      let urlLink = this.getImageTag(imageUrl)
      if ( this.draft.content.includes('###') ) { this.draft.content = this.draft.content.replace('###',urlLink) } 
      else { this.draft.content = this.draft.content + urlLink }
    },
  },
  mounted() {
    this.$store.dispatch('getSupportPage')
    .then( () => {
      this.content = this.$store.getters.supportPage
    })
  }
}
</script>