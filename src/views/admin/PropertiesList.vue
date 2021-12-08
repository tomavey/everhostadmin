<template>
  <v-container>
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
      dialogDelete: false,
      propertyToDelete: {},
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
    properties: function(){
      return this.$store.getters.properties
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
    deleteProperty: function(){
      let propertyId = this.propertyToDelete.propertyId
      this.$store.dispatch("deleteProperty",propertyId)
      .then( () => {
        this.dialogDelete = false
        this.$store.dispatch("getProperties") 
      })
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
  },
  created(){
  }

}
</script>