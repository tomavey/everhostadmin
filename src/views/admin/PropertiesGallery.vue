<template>
  <v-container>
    <v-row>
      <v-col cols="12">
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        class="mx-auto"
      >
        <v-text-field
          v-model="searchString"
          label="search"
          outlined
          clearable
        ></v-text-field>
      </v-col>
    </v-row>

    <div class="gridContainer">
        <v-card 
          class="gridItem mx-auto" 
          v-for="(item, index) in myPropertiesFilteredSorted" 
          :key="index"
          elevation="24"
          width="200"
          >
          <v-card-text 
            class="text-center text-h5 pointer" 
            @click="goToEverhostProperty(item.propertyId)"
            >
            {{item.name}}
          </v-card-text> 

          <v-card-subtitle 
            class="text-center pointer"
            @click="goToEverhostProperty(item.propertyId)"
            >
              {{item.propertyId}}
          </v-card-subtitle>
          <v-card-actions v-if="item.homeImage" >
            <v-avatar
              size="100px"
              rounded
              class="mx-auto pointer"
              @click="goToImageGallery(item.propertyId)"
            >
              <v-img
                :src=item.homeImage
                position="center"
              ></v-img>
            </v-avatar>
          </v-card-actions>
          <v-card-text v-else v-html="noHomeImageText"></v-card-text>
          <v-card-actions>
            <v-avatar
              size="100px"
              rounded
              class="mx-auto pointer"
              @click="goToEverhostProperty(item.propertyId)"
            >
              <v-img
                v-if="item.backgroundColor === 'pink'"
                src="../../assets/img/app-bg-pink.png"
                position="center"
              ></v-img>
              <v-img
                v-if="item.backgroundColor === 'purple'"
                src="../../assets/img/app-bg-purple.png"
                position="center"
              ></v-img>
              <v-img
                v-if="item.backgroundColor === 'blue'"
                src="../../assets/img/app-bg-blue.png"
                position="center"
              ></v-img>
              <v-img
                v-if="item.backgroundColor === 'teal'"
                src="../../assets/img/app-bg-teal.png"
                position="center"
              ></v-img>
            </v-avatar>
          </v-card-actions>
          <v-card-actions>  
            <p class="mx-auto">

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }"> 
                  <v-icon
                    @click="openDialogDelete(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-delete
                  </v-icon>
                </template>
                <span>Delete Property</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }"> 
                  <v-icon
                    @click="goToPropertyInfoDialog(item.propertyId)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-pencil
                  </v-icon>
                </template>
                <span>Edit property</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }"> 
                  <v-icon
                    @click="goToEverhostProperty(item.propertyId)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-eye-arrow-right
                  </v-icon>         
                </template>
                <span>Go to public property page</span>
              </v-tooltip>


              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }"> 
                  <v-icon
                    @click="openDialogCopy(item.propertyId)"
                      v-bind="attrs"
                      v-on="on"
                  >
                    mdi-content-copy
                  </v-icon>         
                </template>
                <span>Duplicate Property</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }"> 
                <v-icon
                  @click="goToImageGallery(item.propertyId)"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-image-multiple-outline
                </v-icon>         
                </template>
                <span>View property images</span>
              </v-tooltip>

            </p>
          </v-card-actions>
        </v-card>
    </div>

      <component-delete-confirm 
        @close="closeDialogDelete" 
        @confirmedAction="deleteProperty"
        :dialogDelete = dialogDelete
        >
        Are you sure you want to delete this property? Code: {{this.propertyToDelete.propertyId}}
      </component-delete-confirm>

      <component-copy-confirm
        @close="closeDialogCopy" 
        @confirmedAction="copyProperty()"
        :dialogCopy = dialogCopy
        >
        <template v-slot:header>
          We need a code for your new property.
        </template>
        <template v-slot:default>
          <v-text-field
            v-model="newPropertyId"
            label="Property Code for the new property"
            full-width
          ></v-text-field>
        </template>
        <template v-slot:footer>
        <p v-if="!isPropertyIdValid">
          Property code must be more than 7 digits
        </p>
        <p v-if="isPropertyIdValid && !isPropertyIdUnique">
          Property code must be Unique
        </p>
        <p v-if="!isPropertyIdNoSpace">
          Property code cannot contain spaces
        </p>
          <v-checkbox
            v-model="copyImages"
            :label="`Copy Images also? ${copyImages.toString()}`"
          ></v-checkbox>        
        </template>

      </component-copy-confirm>

  </v-container>
</template>

<script>
import mixins from "@/mixins"
import validations from '@/mixins/validations'
import ComponentDeleteConfirm from '../../components/admin/component-delete-confirm.vue'
import ComponentCopyConfirm from '../../components/admin/component-copy-confirm.vue'

export default {
  components: { ComponentDeleteConfirm, ComponentCopyConfirm },
  mixins: [mixins,validations],
  data(){
    return {
      searchString: null,
      dialogDelete: false,
      dialogCopy: false,
      propertyIds: [],
      propertyToDelete: {},
      propertyToCopy: {},
      copyImages: false,
      newPropertyId: '',
      noHomeImageText: "<p class='text-center'>No home page<br/>image is set</p>",
    }
  },
  computed: {
    isPropertyIdValid: function(){
      if ( this.newPropertyId.length > 6 ) {
        return true
      } else {
        return false
      }   
    },
    isPropertyIdUnique: function(){
      let propertyId = this.newPropertyId
      return !this.propertyIds.includes( propertyId )
    },
    isPropertyIdNoSpace:function(){
      return !this.newPropertyId.includes(' ')
    },
    everhostUrl: function(){
      return this.$store.getters.everhostUrl
    },
    myPropertiesFiltered: function(){
      if ( !this.searchString ) { return this.myProperties }
      return this.myProperties.filter(  (el) => el.searchAble.toLowerCase().includes(this.searchString.toLowerCase()) )
    },
    myPropertiesFilteredSorted: function(){
      return this.myPropertiesFiltered.sort( (a,b) => b.createdAt - a.createdAt )
    },
    myProperties: function(){
      return this.$store.getters.myProperties
    },
    backgrounds: function(){
      return this.$store.getters.backgrounds
    }
  },
  methods: {
    goToImageGallery(propertyId) {
      this.$store.commit("setPropertyId",propertyId)  
      this.goToRoute("ImageGallery")
    },
    openDialogCopy(property){
      this.propertyToCopy = property
      this.dialogCopy = true
    },
    copyProperty: function(){
      let payload = {
        propertyId: this.propertyToCopy,
        newPropertyId: this.newPropertyId
      }
      this.$store.dispatch("copyProperty",payload)
      .then( () => {
        if ( this.copyImages ) {
          this.$store.dispatch("copyPropertyImages",payload)
          .then( () => console.log("images copied") )
          .catch( (err) => console.log(err) )
        }
      })
      .then( () => {
        this.dialogCopy = false
      } )
    },
    getImage: function(item) {
      if ( item.homeImage ) { return item.homeImage }
      else {return "../assets/img/placeholder.png"}
    },
    goToEverhostProperty: function (code) {
      let newUrl = `${this.everhostUrl}${code}`
      window.open(newUrl)
    },
    goToPropertyInfoDialog: function(propertyId){
      this.$store.commit("setPropertyId",propertyId)  
      this.$router.push({name: "PropertyInfoDialog"})
    },
    closeDialogDelete(){
      this.dialogDelete = false
    },
    closeDialogCopy(){
      this.dialogCopy = false
    },
    getBackgroundImage: function(color){
        return "../../assets/img/app-bg-pink.png"  
      if ( !color ) { return null }
      else {
        return "../../assets/img/app-bg-pink.png"  
      }
    },
    openDialogDelete(property){
      this.propertyToDelete = property
      this.dialogDelete = true
    },
    deleteProperty: function(){
      let propertyId = this.propertyToDelete.propertyId
      this.$store.dispatch("deleteProperty",propertyId)
      .then( () => {
        this.dialogDelete = false
        this.$store.dispatch("getMyProperties")
        }
      )  
    },
    clearSearchString() {
      this.searchString = ""
    },
    buildPropertyIdArray: function(){
      let propertyIdsArray = []
      let propertiesArray = this.$store.getters.properties
      propertiesArray.forEach( (el) => {
        propertyIdsArray.push(el.propertyId)
      })
      this.propertyIds = propertyIdsArray
    },
    initView(){
      this.$store.dispatch("getMyProperties")
      .then( () => this.buildPropertyIdArray() )
    }
  },
  created(){
    if ( !this.user.data ) { setTimeout(this.initView,100) }
    else { this.initView() }
  }
}
</script>

<style>
.gridContainer {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 10px;
    grid-auto-rows: minmax(200px, auto);
    align-content: stretch;
    margin: 20px 40px;
}

.gridItem {
  background-color: #1976D2;
  padding:10px 5px;
  color: white;
  border: 1px;
  border-radius: 10px;
  box-shadow: 3px 3px 5px grey;
}

.image {
  height:200px;
}

.pointer {
  cursor: pointer;
}
</style>