<template>
<ehc-page>  
  <ehc-card>
    <ehc-card-content>
      <ehc-card-toolbar @edit="showEdit=!showEdit">

        <ehc-button-small @submit="imagePopup=true" icon="mdi-image-outline" text="Image"></ehc-button-small>
        <ehc-button-small @submit="youTubePopup = true" icon="mdi-youtube" text="YouTube" class="ml-2"></ehc-button-small>
        
        <template v-slot:right>
            <ehc-button-small @submit="updatePropertyInfoContent"  v-bind="saveButton"></ehc-button-small>
            <ehc-button-small @submit="deletePrompt.show = !deletePrompt.show" icon="mdi-delete" text="delete" color="darkRed" class="ml-2"></ehc-button-small>
        </template>

      </ehc-card-toolbar>


      <ehc-editor v-model="content" @change="saved=false"></ehc-editor>

    </ehc-card-content>
  </ehc-card>
</ehc-page>      
</template>

<script>
import EhcEditor from '../components/ehc-editor.vue'
import EhcCardContent from '../components/support/ehc-card-content.vue'
import EhcCard from '../components/support/ehc-card.vue'
import EhcEditSectionPage from '../components/support/ehc-edit-section-page.vue'
import EhcCardToolbar from '../components/support/ehc-card-toolbar.vue'
import ehcPage from '../components/support/ehc-page.vue'

export default {
  components: { ehcPage, EhcCard, EhcCardContent, EhcEditSectionPage, EhcEditor, EhcCardToolbar },
  data() {
    return {
      pageTitle: 'Support',
      data: '',
      saved: true,
      content: ""
    }
  },  
}
</script>