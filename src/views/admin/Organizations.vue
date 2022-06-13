<template>
<v-container>
  <p style="text-align: center; font-weight: bold; font-size: 1.3em">{{pageTitle}}</p>
  Count: {{orgs.length}}
  <div>
    <v-data-table
      :headers="headers"
      :items="orgs"
      item-key="creator"
      class="elevation-1"
      :search="searchString"
      :single-expand="singleExpand"
      show-expand
      :expanded.sync="expanded"
      :footer-props="{
        showFirstLastPage: true,
        itemsPerPageOptions: [50,100,150.-1]
      }"
    >
      <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="alert('?')"
      >
        mdi-file-find
      </v-icon>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        <v-card>
          <v-card-text>
            Members of {{ item.membersList }}
            <v-icon
              small
              class="mr-2"
              @click="showThisUidProperties(item)"
            >
              mdi-file-find
            </v-icon>

          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            Add a company white label (displays above footer):<v-text-field v-model="item.companyLabel" @change="updateLabel(item)"></v-text-field>
          </v-card-text>
        </v-card>
      </td>
    </template>
    </v-data-table>
  </div>
</v-container>  
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
    }
  },
  methods: {
    updateLabel: function(item) {
      console.log("updateLabel",item.companyLabel, item.orgId)
      this.$store.dispatch('addWhiteLabel',{orgId: item.orgId, label: item.companyLabel})
    },
    showThisUidProperties: function(item){
      console.log("showThisUidProperties",item)
      this.$router.push({name: "Properties", query: {search: item.membersList, showAll: true}})  
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
    headers: function(){
      return [
          {
            text: 'Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          {
            text: 'Organization Id',
            sortable: true,
            value: 'orgId',
          },
          {
            text: 'Created By',
            sortable: true,
            value: 'creator',
          },
          { text: '', value: 'data-table-expand' },
        ]
    },
    searchString: function(){
      return this.$store.getters.searchString
    },  
  },
  created(){
    this.$store.dispatch('getOrgs')
  }
}
</script>

