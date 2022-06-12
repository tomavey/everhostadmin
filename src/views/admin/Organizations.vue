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
          </v-card-text>
        </v-card>
        <v-card>
          <v-card-text>
            Add a company white label:<v-text-field v-model="whiteLabel" @change="updateLabel(item.orgId)"></v-text-field>
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
      singleExpand: false,
      whiteLabel: "",
    }
  },
  methods: {
    updateLabel: function(orgId) {
      console.log("updateLabel",this.whiteLabel, orgId)
      this.$store.dispatch('addWhiteLabel',{orgId: orgId, label: this.whiteLabel})
    }
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

