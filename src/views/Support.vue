<template>
<ehc-page>  
  <ehc-card>
    <ehc-card-content>
      <ehc-card-toolbar @edit="showEdit=!showEdit">

        <ehc-button-small @submit="imagePopup=true" icon="mdi-image-outline" text="Image"></ehc-button-small>
        <ehc-button-small @submit="youTubePopup = true" icon="mdi-youtube" text="YouTube" class="ml-2"></ehc-button-small>
        
        <template v-slot:right>
            <ehc-button-small @submit="updatePropertyInfoContent"  v-bind="saveButton"></ehc-button-small>
        </template>

      </ehc-card-toolbar>


      <ehc-editor v-model="content" @change="saved=false"></ehc-editor>

    </ehc-card-content>
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
      saveButton: {
              text: 'saved',
              loading: false,
              icon: "mdi-check-bold",
              color: 'success'
      },
      imagePopup: false,
      youTubePopup: false,
      draft: {
        section: '',
        content: ''
      }
    }
  },
  methods: {
    updatePropertyInfoContent() {
      this.saved = true
      alert('saved')
      // this.$emit('update', this.content)
    },
      addImageToSectionContent: function(imageUrl){
      let urlLink = this.getImageTag(imageUrl)
      if ( this.draft.content.includes('###') ) { this.draft.content = this.draft.content.replace('###',urlLink) } 
      else { this.draft.content = this.draft.content + urlLink }
    },

  },
}
</script>