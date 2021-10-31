<template>
  <v-container>
     <v-switch
      v-if="userIsAdmin"
      @click="toggleShowAll()"
      :label="`ShowAll: ${showAll.toString()}`"
    ></v-switch>
    <v-data-table
      :headers="headers"
      :items="properties"
      :items-per-page=-1
      :search="searchString"
      class="pointer"
    >      
      <template v-slot:top>
          <span @click = "clearSearchString" style="float:right">Clear Search</span>
          <v-text-field
            v-model="searchString"
            label="Search"
            class="mx-4"
          ></v-text-field>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          @click="openDialogDelete(item)"
        >
          mdi-delete
        </v-icon>
        <v-icon
          small
          @click="goToRoute('PropertyInfoDialog')"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="goToEverhostProperty(item.propertyId)"
        >
          mdi-eye-arrow-right
        </v-icon>
      </template>
    </v-data-table>

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
      searchString: "",
      properties: [],
      dialogDelete: false,
      propertyToDelete: {},
      showAll: false,
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
    }
  },
  methods: {
    goToEverhostProperty: function (code) {
      let newUrl = this.everhostUrl + code
      window.open(newUrl)
    },
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
    if ( this.$route.params.showAll === true ) { this.showAll = true }
  }

}
</script>