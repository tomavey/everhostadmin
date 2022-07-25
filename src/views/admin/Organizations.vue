<template>
  <!-- <v-container>
  <p style="text-align: center; font-weight: bold; font-size: 1.3em">{{pageTitle}}</p>
  Count: {{orgs.length}}
  <div>
    <v-data-table
      :headers="headers"
      :items="orgs"
      item-key="orgId"
      class="elevation-1 row-pointer"
      @click:row="rowClick"
      :loading = "loadingOrgs"
      :search="searchString"
      :footer-props="{
        showFirstLastPage: true,
        itemsPerPageOptions: [50,100,150.-1]
      }"
    >
      <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="$router.push(`/organization/${item.orgId}`)"
      >
        mdi-file-find
      </v-icon>
    </template>
    </v-data-table>
  </div>
</v-container>   -->
  <ehc-page>
    <ehc-header text="Organizations"></ehc-header>
    <ehc-sheet>
      <ehc-table 
        :headers="headers" 
        :items="orgs" 
        :selectable="true" 
        @click:row="rowClick" 
        :search="searchString"
        pagination="auto"
        :itemsPerPage="15"
        :loading="loading"
        >

      </ehc-table>
    </ehc-sheet>
  </ehc-page>
</template>

<script>
import mixins from '@/mixins'
import auth from '@/mixins/auth'

export default {
  mixins: [mixins,auth],
  data: function() {
    return {
      pageTitle: "Organizations",
      expanded: [],
      singleExpand: true,
      whiteLabel: "",
      loading: false,
    }
  },
  methods: {
    updateLabel: function(item) {
      console.log("updateLabel",item.companyLabel, item.orgId)
      this.$store.dispatch('addWhiteLabel',{orgId: item.orgId, label: item.companyLabel})
    },
    showThisUidProperties: function(memberId){
      console.log("showThisUidProperties",memberId)
      this.$router.push({name: "Properties", query: {search: memberId, showAll: true}})  
    },
    rowClick: function(item) {
      console.log("rowClick",item)
      this.$router.push(`/organization/${item.orgId}`)  
    },
  },
  computed: {
    orgs: function(){
      return this.$store.getters.orgs
      .map(org => {
        org.membersList = org.members[0]
        return org
      })
      .sort( (a,b) => {
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
      })
    },
    loadingOrgs: function(){
      return this.orgs.length == 0
    },
    headers: function(){
      return [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
            class: 'pointer'
          },
          {
            text: 'Organization Id',
            sortable: true,
            value: 'orgId',
            class: 'pointer'
          },
          {
            text: 'Created By',
            sortable: true,
            value: 'creator',
            class: 'pointer'
          },
          { text: 'Property Limit', value: 'propertyLimit', sortable: true},
          // { text: 'View', value: 'actions', sortable: false },
          
        ]
    },
    searchString: function(){
      return this.$store.getters.searchString
    },  
  },
  created() {
    // TODO: MOVE THIS FROM STORE TO LOCAL COMPONENT
    this.loading= true
    this.$store.dispatch('getOrgs').then((resp) => {
      this.loading=false
    })

  }
}
</script>

<style scoped>
.row-pointer:hover {
  cursor: pointer;
}
</style>

