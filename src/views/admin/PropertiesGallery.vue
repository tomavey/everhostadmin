<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn
          to="PropertiesList"
        >

          View as a list
        </v-btn>

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
            <p class="mx-auto">
                <v-icon
                  small
                  @click="openDialogDelete(item)"
                >
                  mdi-delete
                </v-icon>
                <v-icon
                  small
<<<<<<< HEAD
                  @click="goToPropertyInfoDialog(item.propertyId)"
=======
                  @click="goToRoute('PropertyInfoDialog')"
>>>>>>> newauthguard
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
      pageTitle: "Properties List",
      searchString: null,
      dialogDelete: false,
      propertyToDelete: {},
      showAll: false,
      noHomeImageText: "<p class='text-center'>No home page<br/>image is set</p>",
      properties: [],
      headers: [
        {text: "Code", value: "propertyId"},
        {text: "Name", value: "name"},
        {text: "Address", value: "address"},
        {text: "Created", value: "dateString"},
        {text: 'Actions', value: 'actions', sortable: false },      
      ]
    }
  },
  computed: {
    everhostUrl: function(){
      return this.$store.getters.everhostUrl
    },
    // properties: function(){
    //   return this.$store.getters.properties.map( (el) => {
    //     el.searchAble = el.propertyId + el.name
    //     return el
    //   })
    // },
    propertiesFiltered: function(){
      if ( !this.searchString ) { return this.properties }
      return this.properties.filter(  (el) => el.searchAble.toLowerCase().includes(this.searchString.toLowerCase()) )
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
<<<<<<< HEAD
    goToPropertyInfoDialog: function(propertyId){
      this.$store.commit("setPropertyId",propertyId)  
      this.$router.push({name: "PropertyInfoDialog"})
    },
=======
>>>>>>> newauthguard
    closeDialog(){
      this.dialogDelete = false
    },
    openDialogDelete(property){
      this.propertyToDelete = property
      this.dialogDelete = true
    },
    toggleShowAll: function(){
      this.showAll = !this.showAll
      this.subscribeToProperties()
    },
    getProperties: function(){
      this.properties = this.$store.getters.properties
    },
    deleteProperty: function(){
      let propertyId = this.propertyToDelete.propertyId
      this.$store.dispatch("deleteProperty",propertyId)
      .then( this.dialogDelete = false )
    },
    showAllString: function(){
      return this.showAll ? "TRUE" : "FALSE"
    },
    loadProperty: function(){
      alert("load property")
    },
    clearSearchString() {
      this.searchString = ""
    },
    clearProperties(){
      this.properties = []
    },
    subscribeToProperties(){
      let propertiesRef = firebase.firestore().collection('properties')
      if ( !this.showAll ) { propertiesRef = propertiesRef.where("uid","==", this.user.data.uid) }
      propertiesRef.onSnapshot( (docs) => {
        let propertiesArray = []
        docs.forEach( (doc) => {
          let obj = doc.data()
          obj.searchAble = obj.name+obj.propertyId+obj.email
          if ( obj.createdAt ) {
            obj.dateString = this.dateFormat(obj.createdAt, "dateOnly")
          }
          propertiesArray.push(obj)  
        })
        this.properties = propertiesArray
      })
    },
  },
  created(){
    this.subscribeToProperties()
<<<<<<< HEAD
    this.$store.dispatch("subscribeToProperties")
=======
>>>>>>> newauthguard
    if ( this.$route.params.showAll === true ) { this.showAll = true }
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