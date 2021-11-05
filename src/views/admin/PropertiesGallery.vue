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
          v-for="(item, index) in propertiesFiltered" 
          :key="index"
          elevation="24"
          width="200"
          >
          <v-card-text class="text-center text-h5">{{item.name}}</v-card-text> 
          <v-card-subtitle class="text-center">{{item.propertyId}}</v-card-subtitle>
          <v-card-subtitle class="text-center">{{getBackgroundImage(item.backgroundColor)}}</v-card-subtitle>
          <v-card-actions v-if="item.homeImage" >
            <v-avatar
              size="100px"
              rounded
              class="mx-auto"
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
              class="mx-auto"
            >
              <v-img
                :src="getBackgroundImage(item.backgroundColor)"
                position="center"
              ></v-img>
            </v-avatar>
          </v-card-actions>
          <v-card-actions>  
            <p class="mx-auto">
                <v-icon
                  small
                  @click="openDialogDelete(item)"
                >
                  mdi-delete
                </v-icon>
                <v-icon
                  small
                  @click="goToPropertyInfoDialog(item.propertyId)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="goToEverhostProperty(item.propertyId)"
                >
                  mdi-eye-arrow-right
                </v-icon>         
            </p>
          </v-card-actions>
        </v-card>
    </div>

      <component-delete-confirm 
        @close="closeDialog" 
        @confirmedAction="deleteProperty"
        :dialogDelete = dialogDelete
        >
        Are you sure you want to delete this property? Code: {{this.propertyToDelete.propertyId}}
      </component-delete-confirm>

  </v-container>
</template>

<script>
import firebase from "firebase"
import mixins from "@/mixins"
import componentDeleteConfirm from '../../components/admin/component-delete-confirm.vue'

export default {
  components: { componentDeleteConfirm },
  mixins: [mixins],
  data(){
    return {
      searchString: null,
      dialogDelete: false,
      propertyToDelete: {},
      noHomeImageText: "<p class='text-center'>No home page<br/>image is set</p>",
    }
  },
  computed: {
    everhostUrl: function(){
      return this.$store.getters.everhostUrl
    },
    propertiesFiltered: function(){
      if ( !this.searchString ) { return this.myProperties }
      return this.myProperties.filter(  (el) => el.searchAble.toLowerCase().includes(this.searchString.toLowerCase()) )
    },
    myProperties: function(){
      return this.$store.getters.myProperties
    },
    backgrounds: function(){
      return this.$store.getters.backgrounds
    }
  },
  methods: {
    getImage: function(item) {
      if ( item.homeImage ) { return item.homeImage }
      else {return "../assets/img/placeholder.png"}
    },
    goToEverhostProperty: function (code) {
      let newUrl = this.everhostUrl + code
      window.open(newUrl)
    },
    goToPropertyInfoDialog: function(propertyId){
      this.$store.commit("setPropertyId",propertyId)  
      this.$router.push({name: "PropertyInfoDialog"})
    },
    closeDialog(){
      this.dialogDelete = false
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
  },
  created(){
    this.$store.dispatch("getMyProperties")
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