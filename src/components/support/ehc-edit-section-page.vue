<template>
    <div>
        <template v-if="draft.set">
            <ehc-card-toolbar @edit="showEdit=!showEdit">

            <ehc-button-small @submit="imagePopup=true" icon="mdi-image-outline" text="Image"></ehc-button-small>
            <ehc-button-small @submit="youTubePopup = true" icon="mdi-youtube" text="YouTube" class="ml-2"></ehc-button-small>
            
            <template v-slot:right>
                <ehc-button-small @submit="updatePropertyInfoContent"  v-bind="saveButton"></ehc-button-small>
                <ehc-button-small @submit="deletePrompt.show = !deletePrompt.show" icon="mdi-delete" text="delete" color="darkRed" class="ml-2"></ehc-button-small>
            </template>

            </ehc-card-toolbar>
        
            <ehc-editor v-model="draft.content" @change="saved=false"></ehc-editor> 
        </template>



<!-- DELETE DIALOG -->
        <ehc-dialog v-model="deletePrompt.show" title="Delete Page?" max-width="250px">
          are you sure you want to delete this page?
          <template v-slot:actions>
            <v-spacer></v-spacer>
            <ehc-btn  color="darkRed" @click="setDelete()" :loading="deletePrompt.loading">
              yes
            </ehc-btn>
            <ehc-btn @click="deletePrompt = !deletePrompt">cancel</ehc-btn>
          </template>
        </ehc-dialog>
<!-- DIALOGS THAT POPUP TO ADD IMAGES OR YOUTUBE VIDEOS -->
        <ehc-image-upload 
                v-model="imagePopup" 
                title="Upload Image" 
                :uploadPath="'/propertyPictures/'+property.propertyId+'-'+Date.now()"  
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
    </div>
</template>

<script>

import EhcEditor from '@/components/support/ehc-editor.vue'
import componentInfoImage from '@/components/support/component-info-image.vue'
import componentInfoYoutube from '@/components/support/component-info-youtube.vue'
import EhcImageUpload from '@/components/support/ehc-image-upload.vue'


export default {
    name:"ehc-edit-section-page", 
    components: {EhcEditor, EhcImageUpload,  componentInfoImage, componentInfoYoutube}, 
    props: ["value", 'sectionIndex', 'type'], 
    data() {
        return {
            saved: true,
            youTubePopup:false,
            imagePopup: false,
            deletePrompt: {
                show: false,
                loading: false,
            },
            saveButton: {
                    text: 'saved',
                    loading: false,
                    icon: "mdi-check-bold",
                    color: 'success'
            },
            draft: {}
        }
    }, 
    computed: {
      property: function(){
        return this.$store.getters.property
      },
    },
    created() {
        this.setDraft(this.value)
    },
    watch: {
        saved (val) {
            this.$emit('saved', this.saved)
            console.log("saved", val)
            if (!val) {
                this.saveButton = {
                    text: 'save',
                    loading: false,
                    icon: "mdi-content-save",
                }
            }
            
        },
        value(val) {
            this.setDraft(val)
        }, 
    },
    methods: {
        setDelete() {
            console.log("delete page")
            let payload = {
                type: this.type,
                docId: this.draft.docId,
                field: "deletedAt"
            }
            console.log("deteting", payload)
            this.deletePrompt.loading = true
            
            this.$store.dispatch("markCustomSectionDeletedAtOrHiddenAt", payload).then(()=> {
                this.$router.push('/')
            })
        },
        // async changeTitle() {
        //     console.log("change title")
        //     let payload = {
        //         type: this.type,
        //         docId: this.draft.docId,
        //         name: this.draft.pageTitle
        //     }
        //     return await this.$store.dispatch("renameSubsection", payload).then(()=> {
        //         return true
        //     })
        // },
        savedAnimation() {
        var that = this
        setTimeout( function() {
            that.saveButton = {
                text: 'saved',
                loading: false,
                icon: "mdi-check-bold",
                color: 'success'
            }
            // setTimeout(function() {
            //     that.saveButton = {
            //     text: 'save',
            //     loading: false,
            //     icon: "mdi-content-save",
            // }
            // }, 2000);
            }, 500);
        },
        // setDraft(val) {
        //     console.log("setDraft")
        //     console.log("val", val)
        //     this.draft = {
        //         set: true,
        //         pageTitle: val.pageTitle,
        //         content: val.content,
        //         docId: val.docId
        //     }

        //     console.log("draft set", this.draft)
        // }, 
        addImageToSectionContent: function(imageUrl){
            let urlLink = this.getImageTag(imageUrl)
            if ( this.draft.content.includes('###') ) { this.draft.content = this.draft.content.replace('###',urlLink) } 
            else { this.draft.content = this.draft.content + urlLink }
        },
        getImageTag: function(imageUrl){
            return `<img style='display:block;margin: 0 auto;max-width:100%' class='contentImage' src='${imageUrl}' />`
        },        
        updatePropertyInfoContent: function(){
            console.log("updating")
            this.saveButton = {
                loading: true,
                text: "save"
            }
            let that = this
            this.$store.dispatch("updatePropertyInfoContent", this.draft)
            .then( () => {
                this.changeTitle().then(()=>{
                    this.$store.dispatch('getProperty')
                    this.saved = true
                    this.imageObjChanged = false
                    this.savedAnimation()
                })

            })
        },
    }
}

</script>