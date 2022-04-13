<template>
  <div>
    <v-scroll-y-reverse-transition  hide-on-leave>   
    <ehc-card v-if="!popup">
      <ehc-card-toolbar :title="pageTitle"></ehc-card-toolbar>
      <ehc-menu v-model = subsections  @click="showSection($event)"></ehc-menu>
      
      <slot></slot>
    </ehc-card>
    </v-scroll-y-reverse-transition>
    <v-scroll-y-reverse-transition hide-on-leave>   
    <ehc-card v-if="popup"  >
      <ehc-card-toolbar close edit @edit="editClicked()" @close="close" :title="section.pageTitle" justify="left"></ehc-card-toolbar>
      <ehc-card-content v-if="!showEdit" class="text-left">
        <v-card-text v-html="section.content">
        </v-card-text>
      </ehc-card-content>

      <ehc-card-content v-if="showEdit">
        <ehc-edit-section-page v-model="section" @saved="editSaved= $event" :sectionIndex="sectionIndex" :type="type"/>
        <ehc-dialog v-model="showWarning" title="Unsaved Changes" max-width = "300px">
          you have unsaved changes, are you sure you want to leave?
          <template v-slot:actions>
            <v-spacer />
            <ehc-btn color="error" @click="showEdit=false; showWarning=false">Yes</ehc-btn>
            <ehc-btn @click="showWarning=false">no</ehc-btn>
          </template>
        </ehc-dialog>
      </ehc-card-content>
    </ehc-card>
    </v-scroll-y-reverse-transition>

  </div>
   
</template>

<script>
import mixins from "@/mixins"
import componentInfoImage from './component-info-image.vue'
import componentInfoYoutube from './component-info-youtube.vue'
import EhcDialog from './ehc-dialog.vue'
import EhcCardContent from "./ehc-card-content.vue"
import EhcEditor from './ehc-editor.vue'
import EhcImageUpload from './ehc-image-upload.vue'
import EhcEditSectionPage from '@/components/ehc-edit-section-page.vue'


export default {
  name: "component-info-menu",
  components: { EhcEditSectionPage, componentInfoImage, componentInfoYoutube, EhcDialog, EhcCardContent, EhcEditor, EhcImageUpload  },
  mixins: [mixins],
  props: ['subsections','pageTitle', 'type'],
  data() {
    return {
      sectionIndex: {},

      defaultIcon: "property-info.svg",
      section: {},
      showEdit: false,
      showWarning: false,
      changed: false,
      editSaved: true,
    }
  },
  watch: {
    showEdit() {
      this.showSection(this.sectionIndex)
    }
  },
  computed: {
    property: function(){
      return this.$store.getters.property
    },
    imageObj: function(){
      return this.$store.getters.imageObj
    },

    //trash...
    fileIsReadyX: function(){
      this.$store.getters.fileIsReady
    },
    cardItemsX: function() {
      return this.$store.getters.cardItems
    },
    showDialogFullScreenX: function(){
      if ( window.outerWidth < 800 ) {
        return true
      } else {
        return false
      }
    },
    popup: {
      get(){
      return this.$store.getters.popup
      },
      set(value){
        this.$store.commit('setPopup',value)
      }
    },
  },  
  methods: {
    editClicked() {
      console.log("editSaved", this.editSaved)
      if (!this.showEdit) {
        this.showEdit = true
      } else if (this.editSaved){ 
        this.showEdit = false
      } else {
        this.showWarning=true
      }
    }, 
    close: function(){
      this.showEdit = false
      this.popup = !this.popup
    },
    addImageToSectionContent: function(imageUrl){
      let urlLink = this.getImageTag(imageUrl)
      this.section.content = this.section.content + urlLink
    },
    popupImage: function(){
        this.imagePopup = true
    },
    change: function(){
      this.changed = true
    },
    updatePropertyInfoContent: function(){
      console.log("updating")
      this.$store.dispatch("updatePropertyInfoContent", this.section)
      .then( () => {
        this.autoSaved = true
        this.imageObjChanged = false
        this.showEdit = false
       })
    },
    showSection: function(item){
      console.log(item)
      this.sectionIndex = item
      this.section.pageTitle = item.pageTitle
      this.section.content = this.property[item.docId]
      this.section.docId = item.docId
      this.popup = true
    },
    closeImageDialog: function(){
      this.imagePopup = false
    },
    closeYoutubeDialog: function(){
      this.youTubePopup = false
    },
    getImageTag: function(imageUrl){
      return `<img style='display:block;margin: 0 auto;max-width:100%' class='contentImage' src='${imageUrl}' />`
    },
    insertAtEnd: function(type="image"){
      let imageLink = this.getImageTag()
      this.section.content = `${this.section.content} ${imageLink}`
      this.fixImageTag()
      return true
    },
    //corrects characters escaped by wysiwyg
    fixImageTag: function() {
      console.log('fixImageTag')
      let text = this.section.content
      text = text.replace("&lt;img","<img") 
      text = text.replace("&gt;",">") 
      this.section.content = text
    },
    //Extracts youTube ID # from youtube url
    youTubeGetID: function (url){
      var ID = '';
      url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
      if(url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
      }
      else {
        ID = url;
      }
        return ID;
    },
    insertYoutube: function(youTubeId = this.youTubeId){
      youTubeId = this.youTubeGetID(youTubeId)
      const embedCode = `<div style="display:block;text-align:center"><iframe width="560" height="315" src="https://www.youtube.com/embed/${youTubeId}?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><div>`
      this.section.content = `${this.section.content} ${embedCode}`
      this.fixImageTag()
      this.updatePropertyInfoContent()
      this.youTubePopup = false
    },
    //InsertAtCursor is not working yet
    insertAtCursor: function() {
      let insertText = this.getImageTag()
  		const range = window.getSelection().getRangeAt(0)
      console.log("insertAtCursor: ", range.endOffset)
      range.deleteContents()
      range.insertNode(document.createTextNode(insertText))
      this.fixImageTag()
      return true   
    },
  },
  // watch: {
  //   imageObj: function(){
  //     this.imageObjChanged = true
  //     this.insertAtEnd()
  //     this.$store.dispatch("isFileReady",this.imageObj.fileUrl)
  //     setTimeout(this.updatePropertyInfoContent(),10000)
  //   }
  // }
}
</script>

<style scoped>


/* div.outside {
  padding-bottom: 15px;
}
  div.inside {
  padding-bottom: 15px;
} */
.invisible {
  visibility: hidden;
}

.editable {
  background-color: rgb(224, 224, 224);
}

.pageTitle, .dialogTitle {
  background-color: black;
  color: white;
  text-align: center !important;
  border-radius: 15px;
}

.dialogTitle {
  width: 100%;
}

.listItem {
  border: 0;
  border-radius: 12px;
  margin-bottom: 1rem;
  background-color: white;
  padding: .4rem 0.9rem;
}
.listItem:last-child {margin-bottom:0!important;}
.listItem .v-list-item__title{
  font-size:1.2rem;
}
.listItem .v-list-item__action {
  margin-bottom:0;
}
.listItem .details{
	background-color: #1B98FF14;
	padding: 10px 16px;
	color: #1B98FF;
	border-radius: 19px;
	font-size: 0.9em;
}
.listItem .main-menu-icon{
  border-radius:0;
  height: 54px!important;
  min-width: 54px!important;
  width: 54px!important;
}
.details {
  background-color: #EDF4F6;
  padding: 5px 10px;
  color: rgb(60, 99, 99);
  border-radius: 10px;
  font-size: .8em;
}
.fade3-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade3-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.v-list-item--link:hover::before {
	border-radius:12px;
  opacity:.02;
}
</style>